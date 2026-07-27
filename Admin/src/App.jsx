import AddItems from "./Components/AddItems"
import List from "./Components/List"
import Navbar from "./Components/Navbar"
import {Routes,Route} from 'react-router-dom'
import Order from "./Components/Order"
const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<AddItems/>}></Route>
    <Route path="/list" element={<List/>}/>
    <Route path="/orders" element={<Order/>}/>
    </Routes>
    </>
  )
}

export default App