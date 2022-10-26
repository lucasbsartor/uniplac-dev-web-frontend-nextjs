import {
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Text,
} from '@mantine/core'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const LoginPage: NextPage = () => {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    signIn({ email, password })
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
          Bem vindo de volta!
        </Title>
        <Text color='dimmed' size='sm' align='center' mt={5}>
          Ainda não tem um conta?{' '}
          <Link href='/auth/register' passHref>
            <Anchor component='a' size='sm'>
              Criar conta
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <TextInput
            label='Email'
            placeholder='seu@email.com'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label='Senha'
            placeholder='Sua senha'
            required
            mt='md'
            onChange={(e) => setPassword(e.target.value)}
          />
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
          <Button fullWidth mt='xl' onClick={handleLogin}>
            Login
          </Button>
        </Paper>
      </Container>
    </div>
  )
}

export default LoginPage
