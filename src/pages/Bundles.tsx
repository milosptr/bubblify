import React, { useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Bundle, Product } from '../types'
import { getBundles, getProducts } from '../services/api'
import { useCart } from '../context/CartContext'

const Bundles: React.FC = () => {
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bundlesData, productsData] = await Promise.all([
          getBundles(),
          getProducts(),
        ])
        setBundles(bundlesData)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getBundleProducts = (bundle: Bundle): Product[] => {
    return bundle.items
      .map((productId) => products.find((p) => p.id === productId))
      .filter((p): p is Product => p !== undefined)
  }

  const getBundleTotalPrice = (bundle: Bundle): number => {
    return getBundleProducts(bundle).reduce(
      (total, product) => total + product.price,
      0
    )
  }

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
        Special Bundle Deals
      </Typography>
      <Grid container spacing={4}>
        {bundles.map((bundle) => {
          const bundleProducts = getBundleProducts(bundle)
          const totalPrice = getBundleTotalPrice(bundle)

          return (
            <Grid item key={bundle.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component='img'
                  height='200'
                  classes={{ root: 'product-image' }}
                  image={bundleProducts[0]?.image || '/placeholder.jpg'}
                  alt={bundle.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {bundle.name}
                  </Typography>
                  <Typography variant='h6' color='primary' gutterBottom>
                    ${totalPrice.toFixed(2)}
                  </Typography>
                  <Typography variant='subtitle1' gutterBottom>
                    Includes:
                  </Typography>
                  <List dense>
                    {bundleProducts.map((product) => (
                      <ListItem key={product.id}>
                        <ListItemText
                          primary={product.name}
                          secondary={`$${product.price.toFixed(2)}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() =>
                      bundleProducts.forEach((product) => addItem(product, 1))
                    }
                    sx={{ mt: 2 }}
                  >
                    Add Bundle to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Bundles
