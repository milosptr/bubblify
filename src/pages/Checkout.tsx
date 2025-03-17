import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
  CardContent,
  Divider,
} from '@mui/material'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/api'
import { DeliveryInfo, PickupInfo, Order } from '../types'

const deliverySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  telephone: yup.string().required('Phone number is required'),
  postalCode: yup.string().required('Postal code is required'),
})

const pickupSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  telephone: yup.string().required('Phone number is required'),
})

const steps = ['Delivery Method', 'Contact Information', 'Review Order']

const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { items, totalAmount, clearCart } = useCart()
  const [activeStep, setActiveStep] = useState(0)
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>(
    'delivery'
  )
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null)
  const [pickupInfo, setPickupInfo] = useState<PickupInfo | null>(null)

  const {
    register: registerDelivery,
    handleSubmit: handleDeliverySubmit,
    formState: { errors: deliveryErrors },
  } = useForm<DeliveryInfo>({
    resolver: yupResolver(deliverySchema),
  })

  const {
    register: registerPickup,
    handleSubmit: handlePickupSubmit,
    formState: { errors: pickupErrors },
  } = useForm<PickupInfo>({
    resolver: yupResolver(pickupSchema),
  })

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const onDeliverySubmit = (data: DeliveryInfo) => {
    setDeliveryInfo(data)
    handleNext()
  }

  const onPickupSubmit = (data: PickupInfo) => {
    setPickupInfo(data)
    handleNext()
  }

  const handleOrderSubmit = async () => {
    try {
      const order: Order = {
        items,
        totalAmount,
        deliveryType,
        ...(deliveryType === 'delivery' && deliveryInfo
          ? { deliveryInfo }
          : {}),
        ...(deliveryType === 'pickup' && pickupInfo ? { pickupInfo } : {}),
      }

      await createOrder(order)
      clearCart()
      navigate('/order-confirmation')
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <FormControl component='fieldset'>
              <RadioGroup
                value={deliveryType}
                onChange={(e) =>
                  setDeliveryType(e.target.value as 'delivery' | 'pickup')
                }
              >
                <FormControlLabel
                  value='delivery'
                  control={<Radio />}
                  label='Home Delivery'
                />
                <FormControlLabel
                  value='pickup'
                  control={<Radio />}
                  label='Store Pickup'
                />
              </RadioGroup>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Button variant='contained' color='primary' onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        )

      case 1:
        return deliveryType === 'delivery' ? (
          <Box
            component='form'
            onSubmit={handleDeliverySubmit(onDeliverySubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Name'
                  {...registerDelivery('name')}
                  error={!!deliveryErrors.name}
                  helperText={deliveryErrors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Address'
                  {...registerDelivery('address')}
                  error={!!deliveryErrors.address}
                  helperText={deliveryErrors.address?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='City'
                  {...registerDelivery('city')}
                  error={!!deliveryErrors.city}
                  helperText={deliveryErrors.city?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Postal Code'
                  {...registerDelivery('postalCode')}
                  error={!!deliveryErrors.postalCode}
                  helperText={deliveryErrors.postalCode?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Phone Number'
                  {...registerDelivery('telephone')}
                  error={!!deliveryErrors.telephone}
                  helperText={deliveryErrors.telephone?.message}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button onClick={handleBack}>Back</Button>
              <Button type='submit' variant='contained' color='primary'>
                Next
              </Button>
            </Box>
          </Box>
        ) : (
          <Box component='form' onSubmit={handlePickupSubmit(onPickupSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Name'
                  {...registerPickup('name')}
                  error={!!pickupErrors.name}
                  helperText={pickupErrors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Phone Number'
                  {...registerPickup('telephone')}
                  error={!!pickupErrors.telephone}
                  helperText={pickupErrors.telephone?.message}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button onClick={handleBack}>Back</Button>
              <Button type='submit' variant='contained' color='primary'>
                Next
              </Button>
            </Box>
          </Box>
        )

      case 2:
        return (
          <Box>
            <Typography variant='h6' gutterBottom>
              Order Summary
            </Typography>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                {items.map((item) => (
                  <Box key={item.product.id} sx={{ mb: 1 }}>
                    <Grid container justifyContent='space-between'>
                      <Grid item>
                        <Typography>
                          {item.product.name} x {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Grid container justifyContent='space-between'>
                  <Grid item>
                    <Typography variant='h6'>Total</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='h6'>
                      ${totalAmount.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Typography variant='h6' gutterBottom>
              {deliveryType === 'delivery'
                ? 'Delivery Information'
                : 'Pickup Information'}
            </Typography>
            <Card>
              <CardContent>
                {deliveryType === 'delivery' && deliveryInfo ? (
                  <>
                    <Typography>Name: {deliveryInfo.name}</Typography>
                    <Typography>Address: {deliveryInfo.address}</Typography>
                    <Typography>City: {deliveryInfo.city}</Typography>
                    <Typography>
                      Postal Code: {deliveryInfo.postalCode}
                    </Typography>
                    <Typography>Phone: {deliveryInfo.telephone}</Typography>
                  </>
                ) : (
                  pickupInfo && (
                    <>
                      <Typography>Name: {pickupInfo.name}</Typography>
                      <Typography>Phone: {pickupInfo.telephone}</Typography>
                    </>
                  )
                )}
              </CardContent>
            </Card>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleOrderSubmit}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
    </Box>
  )
}

export default Checkout
