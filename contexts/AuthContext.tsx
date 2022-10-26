import React, { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import { showNotification } from '@mantine/notifications'
import {
  Customer,
  Employee,
  getUserInfo,
  signInRequest,
  User,
} from '../libs/auth'
import { useRouter } from 'next/router'

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  isAuthenticated: boolean
  user: (User & { customer: Customer; employee: Employee }) | null
  signIn: (data: SignInData) => Promise<void>
}

type SignInData = {
  email: string
  password: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<
    (User & { employee: Employee; customer: Customer }) | null
  >(null)
  const isAuthenticated = !!user
  const router = useRouter()

  useEffect(() => {
    const { 'uniplacdevweb.token': token } = parseCookies()
    if (token) {
      getUserInfo(token).then((response) => setUser(response))
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    try {
      const { token, user } = await signInRequest({ email, password })
      setCookie(undefined, 'uniplacdevweb.token', token, {
        maxAge: 60 * 60 * 24,
      })
      setUser(user)
      showNotification({
        title: 'Logado',
        message: JSON.stringify(user, null, 4),
      })
      router.push('/')
    } catch (error: any) {
      console.error(error)
      showNotification({ title: 'Opa deu ruim', message: error?.message })
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
