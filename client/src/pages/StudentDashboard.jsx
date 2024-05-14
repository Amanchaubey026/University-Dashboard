// import React from 'react'

import MyPerformancePage from "../components/MyPerformancePage"
import MyProfilePage from "../components/MyProfilePage"

const StudentDashboard = () => {
  return (
    <div className="h-screen">
      <MyProfilePage/>
      <MyPerformancePage/>
    </div>
  )
}

export default StudentDashboard
