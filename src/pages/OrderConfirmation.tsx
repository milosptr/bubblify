import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Button, Paper } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const OrderConfirmation: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
        />
        <Typography variant='h4' component='h1' gutterBottom>
          Thank You for Your Order!
        </Typography>
        <Typography variant='body1' paragraph>
          Your order has been successfully placed. We'll send you a confirmation
          email with your order details shortly.
        </Typography>
        <Button
          component={RouterLink}
          to='/bubbles'
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Paper>
    </Box>
  )
}

export default OrderConfirmation
