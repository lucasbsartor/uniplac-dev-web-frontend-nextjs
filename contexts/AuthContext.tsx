import React, { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { showNotification } from '@mantine/notifications'
import {
  getUserInfo,
  signInRequest,
  SignInRequestDataType,
  signUpRequest,
  SignUpRequestDataType,
} from '../libs/auth'
import { useRouter } from 'next/router'
import { User, Customer, Employee } from '../libs/types'

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {
  isAuthenticated: boolean
  user: (User & { customer: Customer; employee: Employee }) | null
  signIn: (data: SignInRequestDataType) => Promise<void>
  signUp: (data: SignUpRequestDataType) => Promise<void>
  signOut: () => void
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

  async function signIn({ email, password }: SignInRequestDataType) {
    try {
      const { token, user } = await signInRequest({ email, password })
      setCookie(undefined, 'uniplacdevweb.token', token, {
        maxAge: 60 * 60 * 24,
        sameSite: true,
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

  async function signUp(signUpData: SignUpRequestDataType) {
    try {
      console.log(signUpData)
      const { token, user } = await signUpRequest(signUpData)
      setCookie(undefined, 'uniplacdevweb.token', token, {
        maxAge: 60 * 60 * 24,
        sameSite: true,
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

  function signOut() {
    try {
      destroyCookie(undefined, 'uniplacdevweb.token', { sameSite: true })
      setUser(null)
      router.push('/auth/login')
    } catch (error: any) {
      showNotification({ title: 'Opa deu ruim', message: error?.message })
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
