import { Route, Routes } from 'react-router-dom'
import LoginAndSignup from '../pages/LoginAndSignup'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StreamsPage from '../pages/StreamsPage'
import SubjectsPage from '../pages/SubjectsPage'
import MarksPage from '../pages/MarksPage'
import StudentListPage from '../pages/StudentListPage'
import StudentDashboard from '../pages/StudentDashboard'
import AdminDashBoard from '../pages/AdminDashBoard'

const AllRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginAndSignup/>}/>
        <Route path='/streams' element={<StreamsPage/>}/>
        <Route path='/subjects' element={<SubjectsPage/>}/>
        <Route path='/marks' element={<MarksPage/>}/>
        <Route path='/student-list' element={<StudentListPage/>}/>
        <Route path='/studentdashboard' element={<StudentDashboard/>}/>
        <Route path='/admindashboard' element={<AdminDashBoard/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default AllRoutes
