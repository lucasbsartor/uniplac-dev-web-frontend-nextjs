import { Button, Group, Paper, Table, Title } from '@mantine/core'
import { IconCircleCheck, IconCircleX } from '@tabler/icons'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { Customer, Employee, User } from '../../../libs/types'

type Data = {
  users: [User & { customer: Customer; employee: Employee }]
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

  const usersResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  const users: [User & { customer: Customer; employee: Employee }] =
    usersResponse.data

  return {
    props: {
      data: {
        users,
      },
    },
  }
}

const UsersPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const rows = data.users.map((user) => (
    <tr
      key={user.id}
      onClick={() => router.push(`/admin/users/${user.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.name}</td>
      <td>{user.cpf}</td>
      <td>{user.phone}</td>
      <td>{user.customer.id}</td>
      <td>
        {user.customer.buysOnCredit ? (
          <IconCircleCheck color='green' />
        ) : (
          <IconCircleX color='red' />
        )}
      </td>
      <td>{user.customer.creditPayDate}</td>
    </tr>
  ))

  return (
    <div>
      <Group position='apart'>
        <Title>Usuarios</Title>
        <Link href='/admin/users/create' passHref>
          <Button component='a'>Criar Usuario</Button>
        </Link>
      </Group>
      <Paper withBorder shadow='md' p='md' mt='md' radius='md'>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>userId</th>
              <th>Email</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>customerId</th>
              <th>Fiado</th>
              <th>Dia de Pagamento</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </div>
  )
}

export default UsersPage
