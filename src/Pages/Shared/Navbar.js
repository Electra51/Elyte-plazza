import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import logo from '../../shopping-cart-icon.json';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaUser } from 'react-icons/fa';





const Navbar = () => {

    //authcontext theke user k nilm
    const { user, logOut } = useContext(AuthContext);

    //redirect
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: logo,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
            navigate(from, { replace: true })
}


    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        {
            user?.uid ?
                <>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <button className='btn btn-outline mr-2'>  <Link className='ml-2 pr-3' to="/profile">
                            {user?.photoURL ?
                                <img title={user.displayName} style={{ height: '35px' }} alt=''
                                    roundedCircle
                                    src={user?.photoURL}>
                                </img>
                                : <FaUser></FaUser>
                            }
                        </Link>{user?.displayName}</button>
                <li><button onClick={handleLogOut} className='btn btn-warning btn-outline'>LogOut</button></li>
                </>
                :
                <li><Link to="/login" className='btn btn-warning'>Login</Link></li>
        }
        
        
    </React.Fragment>

    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                <Lottie options={defaultOptions}
              height={60}
              width={60}
               />
                    IceBox</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;