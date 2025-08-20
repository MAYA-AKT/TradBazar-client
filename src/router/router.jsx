import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import CategoryList from "../components/category/CategoryList";
import Category from "../components/category/Category";


export const router = createBrowserRouter([
   {
    path:'/',
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:'category/:id',
            Component:Category,
        }
    ]
   }
])