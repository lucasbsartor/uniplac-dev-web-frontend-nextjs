import { Title, Paper, Divider } from '@mantine/core'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { parseCookies } from 'nookies'
import React from 'react'
import CreateEmployeeModal from '../../../components/UserForms/CreateEmployeeModal'
import CustomerForm from '../../../components/UserForms/CustomerForm'
import EmployeeForm from '../../../components/UserForms/EmployeeForm'
import UserForm from '../../../components/UserForms/UserForm'
import { Customer, Employee, User } from '../../../libs/types'

type Data = {
  user: User & { customer: Customer; employee: Employee }
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

  try {
    const userResponse = await axios.get(`http://localhost:5000/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const user: User & { customer: Customer; employee: Employee } =
      userResponse.data
    console.log(user)
    return {
      props: {
        data: {
          user,
        },
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
}

const CustomerPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Title>{data.user.name}</Title>
      <Paper withBorder shadow='md' p='md' mt='md' radius='md'>
        <Title order={3} mb='md'>
          Informações do Usuário
        </Title>
        <UserForm
          id={data.user.id}
          name={data.user.name}
          cpf={data.user.cpf}
          email={data.user.email}
          phone={data.user.phone}
        />
        <Divider my='md' />
        <Title order={3} mb='md'>
          Informações do Cliente
        </Title>
        <CustomerForm
          customerId={data.user.customer.id}
          buysOnCredit={data.user.customer.buysOnCredit}
          creditPayDate={data.user.customer.creditPayDate}
        />
        <Divider my='md' />
        <Title order={3} mb='md'>
          Informações de Funcionário
        </Title>
        {data.user.employee ? (
          <EmployeeForm
            userId={data.user.id}
            employeeId={data.user.employee.id}
            registration={data.user.employee.registration}
            group={data.user.employee.group}
          />
        ) : (
          <CreateEmployeeModal id={data.user.id} />
        )}
      </Paper>
    </div>
  )
}

export default CustomerPage
