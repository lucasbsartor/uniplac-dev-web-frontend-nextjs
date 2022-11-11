import { Paper, Table, Title } from '@mantine/core'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { parseCookies } from 'nookies'
import React from 'react'
import { Customer, User } from '../../libs/types'

type Data = {
  customers: [Customer & { user: User }]
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

  const customerResponse = await axios.get('http://localhost:5000/customers', {
    headers: { Authorization: `Bearer ${token}` },
  })

  const customers: [Customer & { user: User }] = customerResponse.data

  return {
    props: {
      data: {
        customers,
      },
    },
  }
}

const UsersPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const rows = data.customers.map((customer) => (
    <tr
      key={customer.id}
      onClick={(e) => console.log('clicked ', customer.user.name)}
      style={{ cursor: 'pointer' }}
    >
      <td>{customer.user.id}</td>
      <td>{customer.user.email}</td>
      <td>{customer.user.name}</td>
      <td>{customer.user.cpf}</td>
      <td>{customer.user.phone}</td>
      <td>{customer.id}</td>
      <td>{customer.buysOnCredit}</td>
      <td>{customer.creditPayDate}</td>
    </tr>
  ))

  return (
    <div>
      <Title>Users</Title>
      <Paper withBorder shadow='md' p='md' mt='md' radius='md'>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>userID</th>
              <th>email</th>
              <th>name</th>
              <th>cpf</th>
              <th>phone</th>
              <th>customerId</th>
              <th>buysOnCredit</th>
              <th>creditPayDate</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </div>
  )
}

export default UsersPage
