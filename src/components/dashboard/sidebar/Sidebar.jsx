import { useState } from 'react'

import { AiOutlineBars } from 'react-icons/ai'
import { NavLink } from 'react-router'
import useUserRole from '../../../hooks/useUserRole'





const Sidebar = () => {

  const { role } = useUserRole();

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
          <a className="text-2xl text-orange-500 font-bold cursor-pointer">
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

          <a className="text-2xl text-orange-500 font-bold cursor-pointer hidden md:flex">
            tradBazar
          </a>
          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav className='flex flex-col'>
              {/*Links */}
              {
                role === 'admin' && <>
                <NavLink to='/admin-dashboard/categories'>Categories</NavLink>
               
                </>
              }
              {
                role === 'seller' && <>
                  <NavLink to='/seller-dashboard/add-product'>Add Products</NavLink>
                  <NavLink to='/seller-dashboard/my-product'>My Products</NavLink>
                </>
              }
             
           

          </nav>
        </div>
      </div>


    </div >
    </>
  )
}

export default Sidebar
