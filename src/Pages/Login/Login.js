import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';


const Login = () => {
    const [userEmail, setUserEmail] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const { resetPassword, signIn, signInWithGoogle } = useContext(AuthContext);
    const from = location.state?.from?.pathname || '/';
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');

    const handleLogin = data => {
        console.log(data);
        navigate(from, { replace: true })
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle().then(result => {
          console.log(result.user)
         
          navigate(from, { replace: true })
        })
    }
    
    const handleReset = () => {
        resetPassword(userEmail)
          .then(() => {
            toast.success('Please check your email for reset link')
          })
          .catch(err => {
            toast.error(err.message)
            console.log(err)
            
          })
      }
    
   
      


    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-5 border border-warning rounded-md'>
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <form onSubmit={handleSubmit((handleLogin))}>
                <label>
    <div>
      <input className='mx-1 ' type="radio" value="Seller" {...register("User")} />
      Seller
    </div>
                </label>
                <label>
    <div>
      <input className='mx-1 ' type="radio" value="Normal" {...register("User")}  />
     Normal
    </div>
  </label>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input onBlur={event => setUserEmail(event.target.value)} type="email" {...register("email", { required: "Email Address is required" })} className="input input-bordered border-warning" />
                        {errors.email && <p className='text-red-600 text-left' role="alert">{errors.email?.message}</p>}
                    </div >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register(
                            "password",
                            {
                                required: "Password is required",
                                minLength: { value: 6, message: 'password must be 6 characters' }
                            },
                        )}
                            className="input input-bordered border-warning" />
                        {errors.password && <p className='text-red-600 text-left' role="alert">{errors.password?.message}</p>}
                    </div>

                    <label className="label">
                        <span onClick={handleReset} className="label-text underline">Forget Password?</span>
                    </label>
                    <input className='btn btn-warning w-full mt-5' type="submit" value='Log In' />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                    <p className='text-center'>New to icebox? <Link to='/signup' className='text-primary font-semibold underline'>Sign Up</Link> </p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary w-full'>Continue with Google</button>
                </form>
            </div>
        </div>
    );
};

export default Login;