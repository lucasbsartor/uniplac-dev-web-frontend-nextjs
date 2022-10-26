import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'uniplacdevweb.token': token } = parseCookies()

export const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
})

if (token) {
  axiosClient.defaults.headers['Authorization'] = `Bearer ${token}`
}
