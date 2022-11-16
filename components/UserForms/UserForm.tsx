import {
  Button,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

type UserFormProps = {
  id: number
  name: string
  cpf: string
  email: string
  phone: string | null
}

type Payload = {
  name: string
  cpf: string
  email: string
  phone: string | null
  password?: string
}

const UserForm = (props: UserFormProps) => {
  const router = useRouter()
  const { refreshUserInfo } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      name: props.name,
      cpf: props.cpf,
      email: props.email,
      password: '',
      confirmPassword: '',
      phone: props.phone,
    },
    validate: {
      name: (value) => (value.length > 0 ? null : 'Não pode ficar vazio'),
      cpf: (value) => (value.length > 0 ? null : 'Não pode ficar vazio'),
      email: (value) => (value.length > 0 ? null : 'Não pode ficar vazio'),
      confirmPassword: (value, values) =>
        value.trim() === values.password.trim()
          ? null
          : 'Valores das senhas não são iguais',
    },
  })

  const handleSubmit = async () => {
    try {
      const payload: Payload = {
        name: form.values.name,
        cpf: form.values.cpf,
        email: form.values.email,
        phone: form.values.phone,
        password: form.values.password.trim(),
      }
      if (form.values.password.trim().length === 0) {
        delete payload.password
      }
      const { ['uniplacdevweb.token']: token } = parseCookies()
      setLoading(true)
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL_FRONT}/users/${props.id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setLoading(false)
      refreshUserInfo()
      showNotification({
        title: 'Dados atualizados',
        message: `Dados de usuário atualizados`,
      })
      router.push(router.asPath)
    } catch (error: any) {
      setLoading(false)
      showNotification({
        title: 'Deu ruim',
        message: error.message,
        color: 'red',
      })
    }
  }

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label='Nome' {...form.getInputProps('name')} />
          <TextInput label='CPF' {...form.getInputProps('cpf')} />
          <TextInput label='Email' {...form.getInputProps('email')} />
          <TextInput label='Telefone' {...form.getInputProps('phone')} />
          <PasswordInput label='Senha' {...form.getInputProps('password')} />
          <PasswordInput
            label='Confirme a senha'
            {...form.getInputProps('confirmPassword')}
          />
          <Button fullWidth type='submit' loading={loading}>
            Atualizar
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default UserForm
