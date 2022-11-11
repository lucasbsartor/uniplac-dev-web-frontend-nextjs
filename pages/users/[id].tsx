import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
import { Customer, User } from '../../libs/types'

type Data = {
  customer: Customer & { user: User }
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

  const { id } = ctx.query

  const customerResponse = await axios.get(
    `http://localhost:5000/customers/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  const customer: Customer & { user: User } = customerResponse.data

  console.log(customer)

  return {
    props: {
      data: {
        customer,
      },
    },
  }
}

const CustomerPage = () => {
  const router = useRouter()
  const { id } = router.query
  return <div>{id}</div>
}

export default CustomerPage
