import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from '../pages/Authentication/SignUp';
import SignIn from '../pages/Authentication/SignIn';
import ErrorPage from "../pages/error pages/ErrorPage";
import DashboardLayouts from "../layouts/DashboardLayouts";
import Home from "../pages/Home";

import AdminRoute from "./AdminRoute";
import AddCategory from "../components/dashboard/adminDashboard/category/AddCategory";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../components/dashboard/adminDashboard/AdminDashboard";

import Categories from "../components/dashboard/adminDashboard/category/Categories";
import SellerRoute from "./SellerRoute";
import AddProduct from "../components/dashboard/sellerdashboard/AddProduct";
import SellerDashboard from "../components/dashboard/sellerdashboard/SellerDashboard";
import AllProducts from "../components/dashboard/adminDashboard/products/AllProducts";
import MyProducts from "../components/dashboard/sellerdashboard/MyProducts";
import AllUsers from "../components/dashboard/adminDashboard/users/AllUsers";
import BecomeSeller from "../pages/becomeSeller/BecomeSeller";
import ManageSellerRequests from "../components/dashboard/adminDashboard/sellerRequests/ManageSellerRequests";
import Profile from "../pages/profile/Profile";
import UserCategory from "../pages/category section/UserCategory";
import ProductDetails from "../pages/products/ProductDetails";
import Checkout from "../pages/checkout/Checkout";




export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        Component: Home
      },
      {
        path: 'becomeseller',
        element: (
          <PrivateRoute>
            <BecomeSeller />
          </PrivateRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: 'category/:categoryName',
        element: (
          <PrivateRoute>
            <UserCategory />
          </PrivateRoute>
        )
      },
      {
        path: 'product/:id',
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        )
      },
      {
        path: 'checkout/:id',
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        )
      },
      

    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'signup',
        Component: SignUp
      },
      {
        path: 'signin',
        Component: SignIn
      }
    ]
  },
  {
    path: 'admin-dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayouts />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: AdminDashboard
      },
      {
        path: 'categories',
        element: (
          <AdminRoute>
            <Categories />
          </AdminRoute>
        ),

      },
      {
        path: 'add-category',
        element: (
          <AdminRoute>
            <AddCategory />
          </AdminRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'seller-requests',
        element: (
          <AdminRoute>
            <ManageSellerRequests />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: 'seller-dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayouts />
      </PrivateRoute>
    ),
    children: [
      {
        index:'overview',
        Component: SellerDashboard
      },
      {
        path: 'add-product',
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        )
      },
      {
        path: 'myproducts',
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        )
      }
    ]
  }


])