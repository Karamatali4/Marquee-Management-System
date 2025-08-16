import { Link } from '@remix-run/react'
import React from 'react'
import { BiFoodMenu } from 'react-icons/bi'
import { FaMoneyBillWave } from 'react-icons/fa'
import { MdLocalGroceryStore } from 'react-icons/md'
import { TbBrandBooking } from 'react-icons/tb'

 function AdminSidebar() {
  return (
    <>
    <li className='flex justify-center items-center gap-1 py-5'>
        <li className='flex flex-col justify-center items-center gap-6'>
            <span><TbBrandBooking className="text-amber-900 text-xl hover:text-amber-200"/>
    </span>
    <span><BiFoodMenu className="text-amber-900 text-xl hover:text-amber-200" />
    
    </span>
    <span><MdLocalGroceryStore className="text-amber-900 text-xl hover:text-amber-200" />
    
    </span>
    <span><FaMoneyBillWave className="text-amber-900 text-xl hover:text-amber-200" />
    
    </span>
        </li>
        <li className='flex flex-col justify-center items-center gap-4'>
        <li  > <Link to="/staff/bookings" className="hover:text-amber-200 text-lg ps-2">Bookings</Link></li>
                  <li  > <Link to="/staff/menu" className="hover:text-amber-200 text-lg">Menu</Link></li>
    
                  <li  ><Link to="/staff/grocery" className="hover:text-amber-200 text-lg">Grocery</Link></li>
                  <li  ><Link to="/staff/salary" className="hover:text-amber-200 text-lg">Salary</Link></li>
                  </li>
                  </li>
    </>
  )
}

 export default AdminSidebar