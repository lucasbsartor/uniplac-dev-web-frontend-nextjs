import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Rating,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { Product } from '../../libs/types'

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`} passHref>
      <Card shadow='sm' p='lg' radius='md' withBorder component='a'>
        <Card.Section>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL_FRONT}/images/${product.picture}`}
            height={160}
            alt='Foto do produto'
          />
        </Card.Section>
        <Stack mt='md'>
          <div>
            <Text weight={500}>{product.name}</Text>
            <Rating readOnly value={Math.floor(Math.random() * 5)} />
          </div>

          {/* <Text size='sm' color='dimmed'>
          {product.description}
        </Text> */}
          <Title order={3}>R${product.price}</Title>
        </Stack>
      </Card>
    </Link>
  )
}

export default ProductCard
