import create from 'zustand'
import { Customer, Employee, User } from '../libs/types'

type AuthStore = {
  isAuthenticated: boolean
  user: (User & { customer: Customer; employee: Employee }) | null
  signIn: () => Promise<void>
  signUp: () => Promise<void>
  signOut: () => void
}

const useStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: async () => console.log('hi'),
  signUp: async () => console.log('hi'),
  signOut: () => console.log('hi'),
}))
