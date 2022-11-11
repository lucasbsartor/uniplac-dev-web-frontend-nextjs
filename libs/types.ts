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
