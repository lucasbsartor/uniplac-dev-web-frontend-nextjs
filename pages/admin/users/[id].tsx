import { Title, Paper, Divider, Button, Group } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useContext, useState } from 'react'
import { useStore } from 'zustand'
import CreateEmployeeModal from '../../../components/UserForms/CreateEmployeeModal'
import CustomerForm from '../../../components/UserForms/CustomerForm'
import EmployeeForm from '../../../components/UserForms/EmployeeForm'
import UserForm from '../../../components/UserForms/UserForm'
import { AuthContext } from '../../../contexts/AuthContext'
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
    const userResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
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
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      const { ['uniplacdevweb.token']: token } = parseCookies()
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL_FRONT}/users/${data.user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setLoading(false)
      showNotification({
        title: 'Usuario removido',
        message: `Usuario ${data.user.name} removido com sucesso`,
      })
      router.push('/admin/users')
    } catch (error: any) {
      setLoading(false)
      showNotification({ title: 'Deu ruim', message: error.message })
    }
  }
  return (
    <div>
      <Group position='apart'>
        <Title>{data.user.name}</Title>
        {user?.id === data.user.id ? undefined : (
          <Button color='red' loading={loading} onClick={handleDelete}>
            Deletar
          </Button>
        )}
      </Group>
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
