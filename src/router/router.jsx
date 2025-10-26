import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from '../pages/Authentication/SignUp';
import SignIn from '../pages/Authentication/SignIn';
import ErrorPage from "../pages/error pages/ErrorPage";
import DashboardLayouts from "../layouts/DashboardLayouts";
import Home from "../pages/Home";
import AddProduct from "../components/dashboard/sellerdashboard/AddProduct";
import AdminRoute from "./AdminRoute";
import AddCategory from "../components/dashboard/adminDashboard/AddCategory";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../components/dashboard/adminDashboard/AdminDashboard";




export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        Component: Home
      }

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
        index:true,
        Component:AdminDashboard
      },
      {
        path: 'add-category',
        element: (
          <AdminRoute>
            <AddCategory />
          </AdminRoute>
        ),
      },
    ],
  }


])