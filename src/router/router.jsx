import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from '../pages/Authentication/SignUp';
import SignIn from '../pages/Authentication/Signin';
import ErrorPage from "../pages/ErrorPage";


export const router = createBrowserRouter([
   {
    path:'/',
    Component:RootLayout,
    errorElement:<ErrorPage/>,
    children:[
       
        
    ]
   },
   {
      path:'/',
      Component:AuthLayout,
      children:[
         {
            path:'signup',
            Component:SignUp
         },
         {
            path:'signin',
            Component:SignIn
         }
      ]
   }
])