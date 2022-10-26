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
} from '@mantine/core'
import Link from 'next/link'
import { NextPage } from 'next'
import React from 'react'

const RegisterPage: NextPage = () => {
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
          <TextInput label='Email' placeholder='seu@email.com' required />
          <PasswordInput
            label='Senha'
            placeholder='Sua senha'
            required
            mt='md'
          />
          <PasswordInput
            label='Confirme sua senha'
            placeholder='Repita a sua senha'
            required
            mt='md'
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
          <Button fullWidth mt='xl'>
            Criar
          </Button>
        </Paper>
      </Container>
    </div>
  )
}

export default RegisterPage
