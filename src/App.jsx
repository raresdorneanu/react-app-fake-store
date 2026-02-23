import './App.css'
import Header from './global-components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Footer from './global-components/Footer'
import Login from './global-components/Login'
import UserPage from './pages/UserPage'
import Cart from './pages/Cart'
import Register from './pages/Register'
import ProductPage from './pages/ProductPage'
import ThankYou from './pages/ThankYou'
import { ProductsProvider } from './context/ProductsContext'
import { AuthProvider } from './context/AuthProvider'
import { Provider } from 'react-redux'
import store from './redux/shopStore'
import ScrollToTop from './global-components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedRouteLogged from './components/ProtectedRouteLogged'
function App() {
  const environment = import.meta.env.MODE
  return (
    <Provider store={store} >
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <div>
          {environment === 'development' && <p>Development</p>}
          {environment === 'production' && <p>Production</p>}
        </div>
        <ProductsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<ProtectedRouteLogged>
              <Login />
            </ProtectedRouteLogged>} />
            <Route path="/register" element={<ProtectedRouteLogged>
              <Register />
            </ProtectedRouteLogged>} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/product/:productId" element={<ProductPage />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </ProductsProvider>
        <Footer />
      </AuthProvider>
    </Provider>
  )
}

export default App
