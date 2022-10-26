import axios from 'axios'

type SignInRequestDataType = {
  email: string
  password: string
}

export type User = {
  id: number
  email: string
  cpf: string
  name: string
  password: string
  phone: string | null
  createdAt: Date
  updatedAt: Date
}

export type Employee = {
  id: number
  registration: string
  group: number
  userId: number
  createdAt: Date
  updatedAt: Date
}

export type Customer = {
  id: number
  buysOnCredit: boolean
  creditPayDate: number
  userId: number
  createdAt: Date
  updatedAt: Date
}

type SignInRequestResponseType = {
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

export const getUserInfo = async (
  token: string
): Promise<User & { customer: Customer; employee: Employee }> => {
  const userResponse = await axios.get('http://localhost:5000/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  const user = userResponse.data
  return user
}
