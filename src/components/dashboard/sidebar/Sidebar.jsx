import { useState } from 'react'

import { AiOutlineBars } from 'react-icons/ai'
import { NavLink } from 'react-router'
import useUserRole from '../../../hooks/useUserRole'





const Sidebar = () => {

  const { role } = useUserRole();
  console.log(role);
  
  const [isActive, setActive] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }



  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <a href="/" className="text-2xl text-orange-500 font-bold cursor-pointer">
            tradBazar
          </a>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>

          <a href="/" className="text-2xl text-orange-500 font-bold cursor-pointer hidden md:flex">
            tradBazar
          </a>
          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav className='flex flex-col'>
              {/*Links */}
              {
                role === 'admin' && <>
                  <NavLink to='/admin-dashboard/users'>User Managment</NavLink>
                  <NavLink to='/admin-dashboard/categories'>Categories Managment</NavLink>
                  <NavLink to='/admin-dashboard/products'>Products Managment</NavLink>
                  <NavLink to='/admin-dashboard/Orders'>Order Managment</NavLink>
                  <NavLink to='/admin-dashboard/featured'>Featured Managment</NavLink>
                  <NavLink to='/admin-dashboard/seller-requests'>Seller Requests</NavLink>

                </>
              }
              {
                role === 'seller' && <>
                  <NavLink to='/seller-dashboard/add-product'>Add Products</NavLink>
                  <NavLink to='/seller-dashboard/myproducts'>My Products</NavLink>

                  <NavLink to='/seller-dashboard/orders'>Orders</NavLink>
                  <NavLink to='/seller-dashboard/earnings'> Earnings</NavLink>
                  <NavLink to='/seller-dashboard/profile'> Profile</NavLink>
                </>
              }



            </nav>
          </div>
        </div>


      </div>
    </>
  )
}

export default Sidebar
