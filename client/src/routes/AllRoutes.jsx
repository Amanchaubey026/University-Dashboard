import { Route, Routes } from 'react-router-dom'
import LoginAndSignup from '../pages/LoginAndSignup'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StreamsPage from '../pages/StreamsPage'
import SubjectsPage from '../pages/SubjectsPage'
import MarksPage from '../pages/MarksPage'
import StudentListPage from '../pages/StudentListPage'
import StudentDashboard from '../pages/StudentDashboard'
// import AdminDashBoard from '../pages/AdminDashBoard'
import HomePage from '../pages/HomePage'
import PrivateRoutes from './PrivateRoutes'

const AllRoutes = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/auth' element={<LoginAndSignup/>}/>

        <Route path='/streams' element={<PrivateRoutes Component={<StreamsPage/>}/>}/>
        <Route path='/subjects' element={<PrivateRoutes Component={<SubjectsPage/>}/>}/>
        <Route path='/marks' element={<PrivateRoutes Component={<MarksPage/>}/>}/>
        <Route path='/student-list' element={<PrivateRoutes Component={<StudentListPage/>}/>}/>
        <Route path='/studentdashboard' element={<PrivateRoutes Component={<StudentDashboard/>}/>}/>
        {/* <Route path='/admindashboard' element={<AdminDashBoard/>}/> */}
      </Routes>
      <Footer/>
    </div>
  )
}

export default AllRoutes
