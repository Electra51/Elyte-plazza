import { createBrowserRouter } from "react-router-dom";
import DashboardLayOut from "../Layout/DashboardLayOut";
import Main from "../Layout/Main";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Blogs from "../Pages/Blogs/Blogs";
import AllBuyers from "../Pages/DashBoard/AllBuyers";
import AllUsers from "../Pages/DashBoard/AllUsers";
import MyOrders from "../Pages/DashBoard/MyOrders";
import Payment from "../Pages/DashBoard/Payment/Payment";
import Home from "../Pages/Home/Home/Home";
import ProductCategory from "../Pages/Home/ProductCategory/ProductCategory";
import Login from "../Pages/Login/Login";

import ErrorPage from "../Pages/Shared/ErrorPage";
import Signup from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoutes";


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
                path: '/category',
                element:<ProductCategory></ProductCategory>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute>,
                loader: () => fetch('http://localhost:5000/products'),
                
                
                
            },
            {
                path: '/category/:id',
                element: <AllProducts></AllProducts>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.category_id}`),
                
                
                
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
    //         // {
    //         //     path: '/dashboard',
    //         //     element:<DashBoard></DashBoard>
    //         // },
            {
                path: '/dashboard',
                element:<MyOrders></MyOrders>
            }
    //         // {
    //         //     path: '/dashboard/payment/:id',
    //         //     element: <Payment></Payment>,
    //         //     loader:({params})=>fetch(`http://localhost:5000/bookings/${params.id}`)
    //         // },
    //         // {
    //         //     path: 'dashboard/allBuyers',
    //         //     element: <AllBuyers></AllBuyers>
    //         // },
    //         // {
    //         //     path: 'dashboard/allUsers',
    //         //     element: <AllUsers></AllUsers>
    //         // }

           

        ]
    }
]);
export default router;
  