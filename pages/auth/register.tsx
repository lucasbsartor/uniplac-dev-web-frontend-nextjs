import {
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Text,
  Stack,
} from '@mantine/core'
import Link from 'next/link'
import { NextPage } from 'next'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const RegisterPage: NextPage = () => {
  const { signUp } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = () => {
    const signUpData = {
      email,
      cpf,
      name,
      password,
      phone,
    }
    console.log(signUpData)
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

        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <Stack>
            <TextInput
              label='Email'
              placeholder='seu@email.com'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextInput
              label='CPF'
              placeholder='1234567890'
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <TextInput
              label='Nome'
              placeholder='Seu nome'
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextInput
              label='Telefone'
              placeholder='(xx) xxxxxxxxx'
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <PasswordInput
              label='Senha'
              placeholder='Sua senha'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Stack>
          {/* <PasswordInput
            label='Confirme sua senha'
            placeholder='Repita a sua senha'
            required
          /> */}
          <Group position='apart' mt='md'>
            {/* <Checkbox label='Manter conectado' /> */}
            <Anchor<'a'>
              onClick={(event) => event.preventDefault()}
              href='#'
              size='sm'
            >
              Esqueceu sua senha?
            </Anchor>
          </Group>
          <Button fullWidth mt='xl' onClick={handleSubmit}>
            Criar
          </Button>
        </Paper>
      </Container>
    </div>
  )
}

export default RegisterPage
