import {
  Button,
  Divider,
  Grid,
  Group,
  Image,
  NumberInput,
  Rating,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import { Product } from '../../libs/types'

type Data = {
  product: Product
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  ctx
) => {
  const { id } = ctx.query
  const productResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
  )
  const product: Product = productResponse.data

  return {
    props: {
      data: {
        product,
      },
    },
  }
}

const ProductPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [rating, setRating] = useState(0)
  const [numberOfReviews, setNumberOfReviews] = useState(0)

  useEffect(() => {
    setRating(Math.floor(Math.random() * 5))
    setNumberOfReviews(Math.floor(Math.random() * 100))
  }, [])

  const form = useForm({
    initialValues: {
      quantity: 1,
    },
  })
  return (
    <Grid>
      <Grid.Col span={12}>
        <Title>{data.product.name}</Title>
        <Rating mb='xs' readOnly value={rating} />
        <Text>{numberOfReviews} Reviews</Text>
        <Divider />
      </Grid.Col>

      <Grid.Col span={4}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL_FRONT}/images/${data.product.picture}`}
          alt='Product picture'
        />
      </Grid.Col>

      <Grid.Col span={8}>
        <Stack>
          <Title order={3}>R${data.product.price}</Title>
          <Text>{data.product.description}</Text>
          <NumberInput
            label='Quantidade'
            min={1}
            {...form.getInputProps('quantity')}
          />
          <Button>Adicionar ao carrinho</Button>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default ProductPage
