import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material'

const Home: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container>
          <Typography variant='h2' component='h1' gutterBottom>
            Welcome to Bubblify
          </Typography>
          <Typography variant='h5' gutterBottom>
            Your one-stop shop for all things bubbles!
          </Typography>
          <Button
            component={RouterLink}
            to='/bubbles'
            variant='contained'
            color='secondary'
            size='large'
            sx={{ mt: 2 }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component='img'
                height='200'
                image='/feature-1.jpg'
                alt='Quality Bubbles'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Quality Bubbles
                </Typography>
                <Typography>
                  Our bubbles are made with the finest ingredients to ensure
                  long-lasting fun!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component='img'
                height='200'
                image='/feature-2.jpg'
                alt='Special Bundles'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Special Bundles
                </Typography>
                <Typography>
                  Check out our special bundle deals for the best bubble
                  experience!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component='img'
                height='200'
                image='/feature-3.jpg'
                alt='Fast Delivery'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Fast Delivery
                </Typography>
                <Typography>
                  Get your bubbles delivered right to your doorstep or pick them
                  up in store!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Home
