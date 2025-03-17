import React from 'react'
import { Box, Typography, Container, Grid, Paper, Divider } from '@mui/material'

const About: React.FC = () => {
  return (
    <Box>
      <Container maxWidth='md'>
        <Typography variant='h4' component='h1' gutterBottom align='center'>
          About Bubblify
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant='body1' paragraph>
            Bubblify emerged from a unique opportunity in the bubble industry.
            When a major manufacturer's bankruptcy left the market in disarray,
            we saw a chance to bring joy back to children everywhere with our
            high-quality bubble products.
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant='h5' gutterBottom>
                Our Mission
              </Typography>
              <Typography variant='body1' paragraph>
                At Bubblify, we're dedicated to creating the most magical bubble
                experience for children and families. Our products are carefully
                crafted to ensure long-lasting fun and unforgettable moments.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant='h5' gutterBottom>
                Our Values
              </Typography>
              <Typography variant='body1' paragraph>
                We believe in quality, innovation, and customer satisfaction.
                Every bubble solution we create is tested to meet our high
                standards of performance and safety.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant='h5' gutterBottom>
            Our Story
          </Typography>
          <Typography variant='body1' paragraph>
            Founded in 2024, Bubblify quickly became a leader in the bubble
            industry by focusing on what matters most: creating magical moments
            for children and families. Our journey began when we noticed a gap
            in the market and decided to fill it with our innovative bubble
            solutions.
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant='h6' gutterBottom>
                Quality Products
              </Typography>
              <Typography variant='body2'>
                We use only the finest ingredients to create our bubble
                solutions.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant='h6' gutterBottom>
                Fast Delivery
              </Typography>
              <Typography variant='body2'>
                Get your bubbles delivered right to your doorstep or pick them
                up in store.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant='h6' gutterBottom>
                Customer Support
              </Typography>
              <Typography variant='body2'>
                Our team is always here to help you with any questions or
                concerns.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default About
