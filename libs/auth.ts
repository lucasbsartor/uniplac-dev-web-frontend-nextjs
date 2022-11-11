import axios from 'axios'
import { Customer, Employee, User } from './types'

export type SignInRequestDataType = {
  email: string
  password: string
}

export type SignInRequestResponseType = {
  token: string
  user: User & { customer: Customer; employee: Employee }
}

export type SignUpRequestDataType = {
  email: string
  cpf: string
  name: string
  password: string
  phone: string
}

export type SignUpRequestResponseType = {
  token: string
  user: User & { customer: Customer; employee: Employee }
}

export const signInRequest = async ({
  email,
  password,
}: SignInRequestDataType): Promise<SignInRequestResponseType> => {
  const tokenResponse = await axios.post('http://localhost:5000/auth/signin', {
    email,
    password,
  })
  const token = tokenResponse.data.access_token
  console.log(token)

  const user = await getUserInfo(token)
  return { token, user }
}

export const signUpRequest = async (
  signUpData: SignUpRequestDataType
): Promise<SignUpRequestResponseType> => {
  const tokenResponse = await axios.post('http://localhost:5000/auth/signup', {
    ...signUpData,
  })
  const token = tokenResponse.data.access_token
  console.log(token)

  let user
  user = await getUserInfo(token)
  await await axios.post(
    'http://localhost:5000/customers',
    {
      userId: user.id,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  user = await getUserInfo(token)
  return { token, user }
}

export const getUserInfo = async (
  token: string
): Promise<User & { customer: Customer; employee: Employee }> => {
  const userResponse = await axios.get('http://localhost:5000/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  const user = userResponse.data
  return user
}
