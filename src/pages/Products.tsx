import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Grid2,
} from '@mui/material'
import { Product } from '../types'
import { getProducts } from '../services/api'
import { useCart } from '../context/CartContext'

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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

  return (
    <Box>
      <Typography variant='h4' component='h1' gutterBottom>
        Our Bubble Products
      </Typography>
      <Grid2 container spacing={4}>
        {products.map((product) => (
          <Grid2 size={4} key={product.id}>
            <Card
              sx={{
                height: '100%',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component='img'
                height='200'
                image={product.image}
                alt={product.name}
                classes={{ root: 'product-image' }}
              />
              <CardContent
                sx={{
                  height: '100%',
                  flexGrow: 1,
                  flexDirection: 'column',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {product.name}
                  </Typography>
                  <Typography color='text.secondary' paragraph>
                    {product.description}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant='h6'
                    color='primary'
                    mt={'auto'}
                    gutterBottom
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => addItem(product, 1)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      component={RouterLink}
                      to={`/bubbles/${product.id}`}
                      variant='outlined'
                      color='primary'
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default Products
