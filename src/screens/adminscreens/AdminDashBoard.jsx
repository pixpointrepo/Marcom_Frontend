import React from 'react'
import Sidebar from '../../components/dashboardcomponents/SideBar'
import { Outlet } from 'react-router-dom'

const AdminDashBoard = () => {
  return (
    <div className='flex  '>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default AdminDashBoard
