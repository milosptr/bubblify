import React from 'react'
import { Container, Box } from '@mui/material'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component='main' sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
      <Box
        component='footer'
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth='sm'>
          <Box sx={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} Bubblify. All rights reserved.
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
