import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Blogs from "../Pages/Blogs/Blogs";
import ErrorPage from "../Pages/Shared/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        errorElement:<ErrorPage></ErrorPage>,
        
        children: [
            // {
            //     path: '/',
            //     element: <Home></Home>
            // },
            // {
            //     path: '/login',
            //     element: <Login></Login>
            // },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            // {
            //     path: '/signup',
            //     element: <SignUp></SignUp>
            // },
            
        ]
    },
]);
export default router;
  