import { Route, Routes } from 'react-router-dom'
import LoginAndSignup from '../pages/LoginAndSignup'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AllRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginAndSignup/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default AllRoutes
