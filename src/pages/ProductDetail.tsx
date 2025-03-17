import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material'
import { Product } from '../types'
import { getProduct } from '../services/api'
import { useCart } from '../context/CartContext'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProduct(parseInt(id))
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='60vh'
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!product) {
    return (
      <Box>
        <Typography variant='h5' color='error'>
          Product not found
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            component='img'
            src={product.image}
            alt={product.name}
            sx={{
              backgroundColor: '#eee',
              width: '100%',
              height: 'auto',
              maxHeight: 500,
              objectFit: 'cover',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant='h4' component='h1' gutterBottom>
              {product.name}
            </Typography>
            <Typography variant='h5' color='primary' gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant='body1' paragraph>
              {product.description}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={() => addItem(product, 1)}
              sx={{ mt: 2 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductDetail
