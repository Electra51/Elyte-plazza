// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthProvider';


// const Login = () => {
//     const { register, formState: { errors }, handleSubmit } = useForm();
//     const [userEmail, setUserEmail] = useState('')
//     const [loginError, setLoginError] = useState('');
//   const { signin, loading, setLoading, signInWithGoogle, resetPassword } =
//     useContext(AuthContext)
//   const navigate = useNavigate()
//   const location = useLocation()
//     const from = location.state?.from?.pathname || '/'
    
//     const handleLogin = data => {
//         console.log(data);
//         setLoginError('');
//         signin(data.email, data.password)
//           .then(result => {
//             toast.success('Login Successful.....!')
//             // Get Token
//             setLoading(false)
//             // setAuthToken(result.user)
//             navigate(from, { replace: true })
//           })
//           .catch(err => {
//             toast.error(err.message)
//             console.log(err)
//             setLoading(false)
//           })
//       }
    
//       const handleGoogleSignin = () => {
//         signInWithGoogle().then(result => {
//           console.log(result.user)
//         //   setAuthToken(result.user)
//           setLoading(false)
//           navigate(from, { replace: true })
//         })
//       }
    
//       // Pass reset
//       const handleReset = () => {
//         resetPassword(userEmail)
//           .then(() => {
//             toast.success('Please check your email for reset link')
//           })
//           .catch(err => {
//             toast.error(err.message)
//             console.log(err)
//             setLoading(false)
//           })
//       }
   
   
//     // const location = useLocation();
//     // const navigate = useNavigate();

//     // const from = location.state?.from?.pathname || '/';

    
       

//     // const handleLogin = data => {
//     //     console.log(data);
//         // setLoginError('');
//         // signin(data.email, data.password)
//         //     .then(result => {
//         //         const user = result.user;
//         //         console.log(user);
                
                
//         //     })
            
//         //     .catch(error => {
//         //         console.log(error.message)
//         //         setLoginError(error.message);
//         //     });
//     // }

//     return (
//         <div className='h-[800px] flex justify-center items-center'>
//             <div className='w-96 p-7'>
//                 <h2 className='text-xl text-center'>Login</h2>
//                 <form onSubmit={handleSubmit(handleLogin)}>
//                     <div className="form-control w-full max-w-xs">
//                         <label className="label"> <span className="label-text">Email</span></label>
//                         <input onBlur={event => setUserEmail(event.target.value)} type="text"
//                             {...register("email", {
//                                 required: "Email Address is required"
//                             })}
//                             className="input input-bordered w-full max-w-xs" />
//                         {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
//                     </div>
//                     <div className="form-control w-full max-w-xs">
//                         <label className="label"> <span className="label-text">Password</span></label>
//                         <input type="password"
//                             {...register("password", {
//                                 required: "Password is required",
//                                 minLength: { value: 6, message: 'Password must be 6 characters or longer' }
//                             })}
//                             className="input input-bordered w-full max-w-xs" />
//                         <label onClick={ handleReset} className="label"> <span className="label-text">Forget Password?</span></label>
//                         {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
//                     </div>
//                     <input className='btn btn-accent w-full' value="Login" type="submit" />
//                     <div>
//                         {loginError && <p className='text-red-600'>{loginError}</p>}
//                     </div>
//                 </form>
//                 <p>New to Doctors Portal <Link className='text-secondary' to="/signup">Create new Account</Link></p>
//                 <div className="divider">OR</div>
//                 <button onClick={handleGoogleSignin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
//             </div>
//         </div>
//     );
// };

// export default Login;