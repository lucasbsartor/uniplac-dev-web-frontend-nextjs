import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React from 'react'

const CustomersPage = () => {
  return <div>CustomersPage</div>
}

export default CustomersPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['uniplacdevweb.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: { destination: '/auth/login', permanent: false },
    }
  }

  return {
    props: {},
  }
}
