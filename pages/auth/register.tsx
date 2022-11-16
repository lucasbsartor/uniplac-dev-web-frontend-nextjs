import {
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Stack,
} from '@mantine/core'
import Link from 'next/link'
import { NextPage } from 'next'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useForm } from '@mantine/form'

const RegisterPage: NextPage = () => {
  const { signUp } = useContext(AuthContext)

  const form = useForm({
    initialValues: {
      email: '',
      cpf: '',
      name: '',
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

  const handleSubmit = () => {
    const signUpData = {
      email: form.values.email,
      cpf: form.values.cpf,
      name: form.values.name,
      password: form.values.password,
      phone: form.values.phone,
    }
    signUp(signUpData)
  }

  return (
    <div>
      <Container size={420} my={40}>
        <Title
          align='center'
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Crie a sua conta
        </Title>
        <Text color='dimmed' size='sm' align='center' mt={5}>
          Já possui uma conta?{' '}
          <Link href='/auth/login' passHref>
            <Anchor component='a' size='sm'>
              Login
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow='md' p='md' mt={30} radius='md'>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label='Email'
                placeholder='seu@email.com'
                required
                {...form.getInputProps('email')}
              />
              <TextInput
                label='CPF'
                placeholder='1234567890'
                required
                {...form.getInputProps('cpf')}
              />
              <TextInput
                label='Nome'
                placeholder='Seu nome'
                required
                {...form.getInputProps('name')}
              />
              <TextInput
                label='Telefone'
                placeholder='(xx) xxxxxxxxx'
                required
                {...form.getInputProps('phone')}
              />
              <PasswordInput
                label='Senha'
                placeholder='Sua senha'
                required
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label='Confirme sua senha'
                placeholder='Repita a sua senha'
                required
                {...form.getInputProps('confirmPassword')}
              />
              <Button fullWidth type='submit'>
                Criar
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default RegisterPage
