import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  TextField,
  Divider,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useCart } from '../context/CartContext'

const Cart: React.FC = () => {
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity, totalAmount } = useCart()

  const handleQuantityChange = (productId: number, newQuantity: string) => {
    const quantity = parseInt(newQuantity)
    if (quantity > 0) {
      updateQuantity(productId, quantity)
    }
  }

  if (items.length === 0) {
    return (
      <Box textAlign='center' py={4}>
        <Typography variant='h5' gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/bubbles')}
        >
          Continue Shopping
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.product.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={12} sm={3}>
                    <Box
                      component='img'
                      src={item.product.image}
                      alt={item.product.name}
                      sx={{ width: '80px', height: 'auto' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant='h6'>{item.product.name}</Typography>
                    <Typography color='text.secondary'>
                      ${item.product.price.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        type='number'
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.product.id, e.target.value)
                        }
                        inputProps={{ min: 1 }}
                        size='small'
                        sx={{ width: 80 }}
                      />
                      <IconButton
                        color='error'
                        onClick={() => removeItem(item.product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Grid container justifyContent='space-between' mb={1}>
                  <Grid item>
                    <Typography>Subtotal</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>${totalAmount.toFixed(2)}</Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />
                <Grid container justifyContent='space-between' mb={1}>
                  <Grid item>
                    <Typography variant='h6'>Total</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='h6'>
                      ${totalAmount.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Cart
