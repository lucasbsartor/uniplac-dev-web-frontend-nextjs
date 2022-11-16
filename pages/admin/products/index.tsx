import { Button, Group, Paper, ScrollArea, Table, Title } from '@mantine/core'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { Product } from '../../../libs/types'

type Data = {
  products: [Product]
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  ctx
) => {
  const { ['uniplacdevweb.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: { destination: '/auth/login', permanent: false },
    }
  }
  const productsResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  const products: [Product] = productsResponse.data

  return {
    props: {
      data: {
        products,
      },
    },
  }
}

const AdminProductsPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const rows = data.products.map((product) => (
    <tr
      key={product.id}
      onClick={() => router.push(`/admin/products/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.picture}</td>
      <td>{product.price}</td>
    </tr>
  ))
  return (
    <div>
      <Group position='apart'>
        <Title>Produtos</Title>
        <Link href='/admin/products/create' passHref>
          <Button component='a'>Criar Produto</Button>
        </Link>
      </Group>
      <Paper withBorder shadow='md' p='md' mt='md' radius='md'>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descricao</th>
              <th>Foto</th>
              <th>Preco</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </div>
  )
}

export default AdminProductsPage
