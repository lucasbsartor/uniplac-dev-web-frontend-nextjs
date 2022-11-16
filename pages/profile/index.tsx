import { Paper, Text, TextInput, Title } from '@mantine/core'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React, { useContext } from 'react'
import UserForm from '../../components/UserForms/UserForm'
import { AuthContext } from '../../contexts/AuthContext'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['uniplacdevweb.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}

const ProfilePage = () => {
  const { refreshUserInfo, user } = useContext(AuthContext)
  return (
    <div>
      <Title>Meu Perfil</Title>
      <Paper withBorder shadow='md' p='md' mt='md' radius='md'>
        <Title order={3}>Informações Gerais</Title>
        {user && (
          <UserForm
            id={user.id}
            name={user.name}
            email={user.email}
            cpf={user.cpf}
            phone={user.phone}
          />
        )}
      </Paper>
    </div>
  )
}

export default ProfilePage
