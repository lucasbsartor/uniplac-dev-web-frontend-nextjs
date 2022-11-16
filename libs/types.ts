export type User = {
  id: number
  email: string
  cpf: string
  name: string
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

export type Product = {
  id: number
  name: string
  description: string
  picture: string
  price: number
  createdAt: Date
  updatedAt: Date
}

export type ImageUploadResponse = {
  fieldname: string
  originalname: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}
