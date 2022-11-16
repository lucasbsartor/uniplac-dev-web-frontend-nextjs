import {
  Title,
  Paper,
  TextInput,
  PasswordInput,
  Stack,
  Button,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { Customer, Employee, User } from '../../../libs/types'

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

const CreateCustomerPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      confirmPassword: (value, values) =>
        value.trim() === values.password.trim()
          ? null
          : 'Senhas devem ser iguais',
    },
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const payload = {
        name: form.values.name,
        cpf: form.values.cpf,
        email: form.values.email,
        phone: form.values.phone,
        password: form.values.password.trim(),
      }
      const registerResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_FRONT}/auth/signup`,
        payload
      )
      const token: string = registerResponse.data.access_token
      let user: User
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL_FRONT}/users/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      user = userResponse.data
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL_FRONT}/customers`,
        {
          userId: user.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setLoading(false)
      showNotification({
        title: 'Usuario cadastrado',
        message: `Usuario ${user.name} cadastrado`,
      })
      router.push(`/admin/users/${user.id}`)
    } catch (error: any) {
      setLoading(false)
      showNotification({ title: 'Opa deu ruim', message: error.message })
    }
  }

  return (
    <div>
      <Title>Criar Usuário</Title>
      <Paper withBorder shadow='md' p='md' mt='md' radius='md'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Title order={3}>Informações do Usuário</Title>
            <TextInput label='Nome' {...form.getInputProps('name')} />
            <TextInput label='CPF' {...form.getInputProps('cpf')} />
            <TextInput label='Email' {...form.getInputProps('email')} />
            <TextInput label='Telefone' {...form.getInputProps('phone')} />
            <PasswordInput label='Senha' {...form.getInputProps('password')} />
            <PasswordInput
              label='Confirme a senha'
              {...form.getInputProps('confirmPassword')}
            />
            <Button type='submit' loading={loading}>
              Criar
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  )
}

export default CreateCustomerPage
