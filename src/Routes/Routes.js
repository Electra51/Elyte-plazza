import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Blogs from "../Pages/Blogs/Blogs";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        
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
  