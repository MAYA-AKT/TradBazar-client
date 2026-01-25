import { useState } from 'react'
import {
  FaUsers, FaListUl, FaBoxOpen, FaShoppingCart,
  FaStar, FaUserCheck, FaPlusCircle, FaBoxes,
  FaMoneyBillWave, FaUserCircle,FaLeaf
} from "react-icons/fa";
import { MdInventory } from "react-icons/md";

import { AiOutlineHome } from "react-icons/ai";
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
      <div className="bg-gray-100 text-gray-800 flex justify-between items-center md:hidden px-2 py-2">
        {/* Logo */}
        <div className="flex items-center">
           <a href="/" className=" text-2xl mt-3 md:text-3xl mb-3 flex font-bold items-center text-green-400 cursor-pointer">
                          <span><FaLeaf className="text-green-400" />  </span>  Bongo <span className="text-orange-200">Haat </span>  

                        </a>
        </div>

        {/* Hamburger button */}
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-2 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-r from-orange-400 to-orange-600 w-76 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>

          <div className="flex items-center ml-10 ">
            <a href="/" className=" text-2xl mt-3 md:text-3xl mb-3 flex font-bold items-center text-green-400 cursor-pointer">
                          <span><FaLeaf className="text-green-400" />  </span>  Bongo <span className="text-orange-200">Haat </span>  

                        </a>
          </div>

          <hr className='mt-5 text-white' />
          <div className='flex flex-col justify-between flex-1 mt-6 px-10'>
            <nav className='flex flex-col space-y-3'>

              {
                role === 'admin' && <>


                  <NavLink to='/admin-dashboard'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1 "
                      }`
                    }
                  >
                    <AiOutlineHome className="inline mr-2 text-xl" /> Dashboard
                  </NavLink>



                  <NavLink
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1 "
                      }`
                    }
                    to='/admin-dashboard/users'

                  >
                    <FaUsers className="inline mr-2 text-xl" /> User Management
                  </NavLink>

                  <NavLink to='/admin-dashboard/categories'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1"
                      }`
                    }
                  >
                    <FaListUl className="inline mr-2 text-xl" /> Category Management
                  </NavLink>

                  <NavLink to='/admin-dashboard/products'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1"
                      }`
                    }
                  >
                    <FaBoxOpen className="inline mr-2 text-xl" /> Product Management
                  </NavLink>

                  <NavLink to='/admin-dashboard/orders'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1"
                      }`
                    }
                  >
                    <FaShoppingCart className="inline mr-2 text-xl" /> Order Management
                  </NavLink>


                  <NavLink to='/admin-dashboard/seller-requests'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1"
                      }`
                    }
                  >
                    <FaUserCheck className="inline mr-2 text-xl" /> Seller Approvals
                  </NavLink>
                  <NavLink to='/admin-dashboard/coupon'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1 "
                      }`
                    }
                  >
                    <FaUserCheck className="inline mr-2 text-xl" /> Coupon Managment
                  </NavLink>
                </>
              }



              {
                role === 'seller' && <>
                  <NavLink to='/seller-dashboard'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1"
                      }`
                    }
                  >
                    <AiOutlineHome className="inline mr-2 text-xl" />Dashboard
                  </NavLink>

                  <NavLink to='/seller-dashboard/add-product'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1"
                      }`
                    }
                  >
                    <FaPlusCircle className="inline mr-2 text-xl" /> Add New Product
                  </NavLink>

                  <NavLink to='/seller-dashboard/myproducts'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1 "
                      }`
                    }
                  >
                    <MdInventory className="inline mr-2 text-xl" /> My Products
                  </NavLink>

                  <NavLink to='/seller-dashboard/orders'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1 "
                      }`
                    }
                  >
                    <FaShoppingCart className="inline mr-2 text-xl" /> Customer Orders
                  </NavLink>

                  <NavLink to='/seller-dashboard/earnings'
                    className={({ isActive }) =>
                      `block rounded hover:bg-green-100 hover:text-orange-500 transition ${isActive ? "bg-green-100  pl-3 py-1  text-orange-600" : " text-white  pl-3 py-1 "
                      }`
                    }
                  >
                    <FaMoneyBillWave className="inline mr-2 text-xl" /> Earnings Overview
                  </NavLink>

                  
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
