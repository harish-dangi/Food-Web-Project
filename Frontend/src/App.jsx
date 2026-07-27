import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Contactpage from './pages/Contactpage.jsx'
import Menu from './pages/Menu.jsx'
import Cartpage from './pages/Cartpage.jsx'

import Signup from './components/Signup.jsx'
import AboutKe from './components/AboutKe.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import VerifyPayment from './pages/VerifyPayment.jsx'
import CheckOutPage from './pages/CheckOutPage.jsx'

import MyOrderPage from './pages/MyOrderPage.jsx'
const App = () => {
  return (
    <Routes >
      <Route path='/' element={<Home/>} />
      <Route path='/contact' element={<Contactpage/>} />
      <Route path='/menu' element={<Menu/>} />
      <Route path='/about' element={<AboutKe/>} />
      <Route path='/login' element={<Home/>} />
      <Route path='/signup' element={<Signup/>}/>
      {/* payment verification */}
      <Route path='/myorder/verify' element={<VerifyPayment/>}/>

      <Route path='/checkout' element={<PrivateRoute>
        <CheckOutPage/>
      </PrivateRoute>}/>

      <Route path='/cart' element={
        <PrivateRoute>
          <Cartpage/>
        </PrivateRoute>
        } />

      <Route path='/myorder' element={<MyOrderPage/>}/>
      
    </Routes>
  )
}

export default App