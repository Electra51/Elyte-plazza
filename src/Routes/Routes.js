import { createBrowserRouter } from "react-router-dom";
import DashboardLayOut from "../Layout/DashboardLayOut";
import Main from "../Layout/Main";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Blogs from "../Pages/Blogs/Blogs";
import AddAProduct from "../Pages/DashBoard/AddAProduct";
import AllBuyers from "../Pages/DashBoard/AllBuyers";
import AllSellers from "../Pages/DashBoard/AllSellers";
import DashBoard from "../Pages/DashBoard/DashBoard";

import MyOrders from "../Pages/DashBoard/MyOrders";
import MyProducts from "../Pages/DashBoard/MyProducts";
import Payment from "../Pages/DashBoard/Payment/Payment";
import ReportItem from "../Pages/DashBoard/ReportItem";
import Available from "../Pages/Home/Available";
import Home from "../Pages/Home/Home/Home";
import ProductCategory from "../Pages/Home/ProductCategory/ProductCategory";
import Login from "../Pages/Login/Login";

import ErrorPage from "../Pages/Shared/ErrorPage";
import Signup from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoutes";
import SellerRoute from "./SellerRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        errorElement:<ErrorPage></ErrorPage>,
        
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/category/',
                element: <ProductCategory></ProductCategory>,
               
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute>,
                // loader: () => fetch('https://icebox-server.vercel.app/products')
                loader:({params})=>fetch(`https://icebox-server.vercel.app/products/${params.id}`)

             },
            {
                path: '/Available',
                element: <Available></Available>
               
             },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/signup',
                element:<Signup></Signup>
            },
            
        ]
    },
    {
        path: '/dashboard',
        element:<DashboardLayOut></DashboardLayOut>,
    
    // {
    //     path: '/dashboard',
    //     element: <PrivateRoute><DashboardLayOut></DashboardLayOut></PrivateRoute>,
    //     errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element:<DashBoard></DashBoard>
            },
            {
                path: '/dashboard/MyOrders',
                element:<MyOrders></MyOrders>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader:({params})=>fetch(`https://icebox-server.vercel.app/bookings/${params.id}`)
            },
           
            

            {
                path: '/dashboard/myProducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/addAProduct',
                element:<SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },

           {
               path: '/dashboard/allBuyers',
               element:<AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/reportItem',
                element:<AdminRoute><ReportItem></ReportItem></AdminRoute>
             },
            {
                path: '/dashboard/allSellers',
                element:<AdminRoute><AllSellers></AllSellers></AdminRoute>
            }

        ]
    }
]);
export default router;
  