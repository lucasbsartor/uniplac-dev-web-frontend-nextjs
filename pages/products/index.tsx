import { Grid, Title } from '@mantine/core'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { parseCookies } from 'nookies'
import React from 'react'
import ProductCard from '../../components/Products/ProductCard'
import { Product } from '../../libs/types'

type Data = {
  products: [Product]
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  ctx
) => {
  const productsResponse = await axios.get('http://localhost:5000/products')

  const products: [Product] = productsResponse.data

  return {
    props: {
      data: {
        products,
      },
    },
  }
}

const ProductsPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Title>Produtos</Title>
      <Grid mt='md'>
        {data.products.map((product) => (
          <Grid.Col key={product.id} span={4}>
            <ProductCard product={product} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  )
}

export default ProductsPage
