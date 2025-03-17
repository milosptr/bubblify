import axios from 'axios'
import { Product, Bundle, Order } from '../types'

const API_BASE_URL = 'http://localhost:3500/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/bubbles')
  return response.data
}

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/bubbles/${id}`)
  return response.data
}

export const getBundles = async (): Promise<Bundle[]> => {
  const response = await api.get('/bundles')
  return response.data
}

export const getBundle = async (id: number): Promise<Bundle> => {
  const response = await api.get(`/bundles/${id}`)
  return response.data
}

export const getOrderByPhone = async (telephone: string): Promise<Order> => {
  const response = await api.get(`/orders/${telephone}`)
  return response.data
}

export const getOrdersByPhone = async (telephone: string): Promise<Order[]> => {
  const response = await axios.get(`${API_BASE_URL}/orders/${telephone}`)
  return response.data
}

export const createOrder = async (order: Order): Promise<Order> => {
  const response = await api.post(
    `/orders/${order.pickupInfo?.telephone}`,
    order
  )
  return response.data
}
