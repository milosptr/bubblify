import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import { Order } from '../types'
import { getOrdersByPhone } from '../services/api'

const OrderHistory: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = await getOrdersByPhone(phoneNumber)
      setOrders(data)
    } catch (err) {
      setError('Failed to fetch orders. Please try again.')
      console.error('Error fetching orders:', err)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Order History
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            margin='normal'
            required
            placeholder='Enter your phone number'
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'View Orders'}
          </Button>
        </form>
      </Paper>

      {error && (
        <Typography color='error' gutterBottom>
          {error}
        </Typography>
      )}

      {orders.length > 0
        ? orders.map((order, index) => (
            <Paper key={index} sx={{ p: 3, mb: 2 }}>
              <Typography variant='h6' gutterBottom>
                Order #{index + 1}
              </Typography>
              <List>
                {order.items.map((item, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    <ListItem>
                      <ListItemText
                        primary={item.product.name}
                        secondary={`Quantity: ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`}
                      />
                    </ListItem>
                    {itemIndex < order.items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Typography variant='h6' color='primary' sx={{ mt: 2 }}>
                Total: ${order.totalAmount.toFixed(2)}
              </Typography>
              <Typography variant='subtitle1' sx={{ mt: 1 }}>
                Delivery Type:{' '}
                {order.deliveryType === 'pickup' ? 'Pickup' : 'Delivery'}
              </Typography>
              {order.deliveryType === 'pickup' && order.pickupInfo && (
                <Typography variant='body2' sx={{ mt: 1 }}>
                  Pickup Name: {order.pickupInfo.name}
                </Typography>
              )}
              {order.deliveryType === 'delivery' && order.deliveryInfo && (
                <>
                  <Typography variant='body2' sx={{ mt: 1 }}>
                    Delivery Name: {order.deliveryInfo.name}
                  </Typography>
                  <Typography variant='body2'>
                    Address: {order.deliveryInfo.address},{' '}
                    {order.deliveryInfo.city} {order.deliveryInfo.postalCode}
                  </Typography>
                </>
              )}
            </Paper>
          ))
        : !loading && (
            <Typography variant='body1' color='text.secondary'>
              No orders found. Please enter your phone number to view your
              orders.
            </Typography>
          )}
    </Box>
  )
}

export default OrderHistory
