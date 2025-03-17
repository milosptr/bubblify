import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import MenuIcon from '@mui/icons-material/Menu'
import { useCart } from '../context/CartContext'

const Navbar: React.FC = () => {
  const { totalItems } = useCart()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const menuItems = [
    { title: 'Products', path: '/bubbles' },
    { title: 'Bundles', path: '/bundles' },
    { title: 'About us', path: '/about' },
    {
      title: 'Cart',
      path: '/cart',
      icon: (
        <Badge badgeContent={totalItems} color='secondary'>
          <ShoppingCartIcon />
        </Badge>
      ),
    },
    {
      title: 'Orders',
      path: '/order-history',
      icon: <LocalShippingIcon />,
    },
  ]

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          component={RouterLink}
          to='/'
          sx={{
            flexGrow: { xs: 1, md: 0 },
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component='img'
            src='/logo.png'
            alt='Bubblify Logo'
            sx={{ height: 40, mr: 2 }}
          />
          Bubblify
        </Typography>

        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            size='large'
            aria-label='navigation menu'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.title}
                component={RouterLink}
                to={item.path}
                onClick={handleCloseNavMenu}
                sx={{ minWidth: 200, justifyContent: 'center' }}
              >
                <Typography textAlign='center'>
                  {item.icon ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.icon} {item.title}
                    </Box>
                  ) : (
                    item.title
                  )}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 'auto' }}>
          {menuItems.map((item) => (
            <Button
              key={item.title}
              color='inherit'
              component={RouterLink}
              to={item.path}
              sx={{ marginLeft: 2 }}
            >
              {item.icon ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item.icon} {item.title}
                </Box>
              ) : (
                item.title
              )}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
