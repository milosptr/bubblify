export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export interface Bundle {
  id: number
  name: string
  items: number[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface DeliveryInfo {
  name: string
  address: string
  city: string
  telephone: string
  postalCode: string
}

export interface PickupInfo {
  name: string
  telephone: string
}

export interface Order {
  items: CartItem[]
  deliveryInfo?: DeliveryInfo
  pickupInfo?: PickupInfo
  totalAmount: number
  deliveryType: 'delivery' | 'pickup'
}
