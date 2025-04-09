import React from 'react'
import Sidebar from '../../components/dashboardcomponents/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminDashBoard = () => {
  return (
    <div className='flex font-quicksand '>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default AdminDashBoard
