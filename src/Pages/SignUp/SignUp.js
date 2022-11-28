import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const [signUpError, setSignUPError] = useState('');
    const { createUser, signInWithGoogle, updateUser } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const { register, handleSubmit, formState: { errors } } = useForm();

    if (token) {
        navigate(from, { replace: true })
    }

    const handleSignUp = (data) => {
        console.log(data);

//notun kore sign up korle signup error empty
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User created successfully')
                const userInfo = {displayName: data.name}
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.userType);
                    })
                    .catch(err => console.log(err))

            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }




    const handleGoogleSignIn = () => {

        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true })
                fetch('https://icebox-server.vercel.app/googleUsers', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(result.user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            })
    }

    const saveUser = (name, email, userType) => {
        const user = { name, email, userType };
        fetch('https://icebox-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
            })
    }





    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-5 border border-warning rounded-md'>
                <h1 className='text-3xl font-bold text-center'>Sign Up</h1>
                <form onSubmit={handleSubmit((handleSignUp))}>
                    <div className='flex justify-between mt-4'>
                    <label className='text-center'>
                        <div>
                            <input className='mx-1' type="radio"  value="buyer" {...register("userType",{ required: "please select one" })} checked/>
                            Buyer
                        </div>
                    </label>
                    <label className='text-center'>
                        <div>
                            <input className='mx-1' type="radio" value="seller" {...register("userType",{ required: "please select one" })} />
                            Seller
                        </div>
                    </label>
                    {errors.userType && <p className='text-red-600 text-left' role="alert">{errors.userType?.message}</p>}
                </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" {...register("name", { required: "Name is required" })}
                            className="input input-bordered border-warning" />
                        {errors.name && <p className='text-red-600 text-left' role="alert">{errors.name?.message}</p>}
                    </div >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Email Address is required" })} className="input input-bordered border-warning" />
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
                                minLength: { value: 6, message: 'password must be 6 characters long' },
                                pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/, message: 'password must be strong' }
                            },
                        )}
                            className="input input-bordered border-warning" />
                        {errors.password && <p className='text-red-600 text-left' role="alert">{errors.password?.message}</p>}
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </div>
                    <input className='btn btn-warning w-full mt-5' type="submit" value='Sign Up' />

                    <p className='text-center'>Already have an account?  <Link to='/login' className='text-primary font-semibold underline'>please Login</Link> </p>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary w-full text-black '>Continue with Google</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;