import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import './App.css'

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Bundles from './pages/Bundles'
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderHistory from './pages/OrderHistory'

const theme = createTheme({
  palette: {
    primary: {
      main: '#7f3f97',
    },
    secondary: {
      main: '#57973F',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/bubbles' element={<Products />} />
              <Route path='/bubbles/:id' element={<ProductDetail />} />
              <Route path='/bundles' element={<Bundles />} />
              <Route path='/about' element={<About />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route
                path='/order-confirmation'
                element={<OrderConfirmation />}
              />
              <Route path='/order-history' element={<OrderHistory />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
