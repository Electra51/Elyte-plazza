import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [show, setShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  //get by authContext
  const { resetPassword, signIn, signInWithGoogle } = useContext(AuthContext);

  //redirect
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //for error
  const [loginError, setLoginError] = useState("");

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    setLoginError("");
    //login
    signIn(data.email, data.password, data.seller, data.admin)
      .then((result) => {
        const user = result.user;
        setLoginUserEmail(data.email);
        toast.success("login successfully");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  //google log in
  const handleGoogleSignIn = () => {
    signInWithGoogle().then((result) => {
      navigate(from, { replace: true });

      fetch(
        "https://icebox-server-9upx1roo2-electra51.vercel.app/googleUsers",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(result.user),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
        });
    });
  };

  //password reset
  const handleReset = () => {
    resetPassword(userEmail)
      .then(() => {
        toast.success("Please check your email for reset link");
      })
      .catch((err) => {
        toast.error(err.message);
        // console.log(err);
      });
  };

  return (
    <div className="h-[100vh] flex justify-start gap-72 items-center">
      <div
        className="bg-[#146CDA] h-[100vh] w-[35%] flex justify-center items-center"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}>
        <div className="h-28 w-96 rounded-md bg-[#c7d7eb] bg-opacity-30 flex justify-center items-center">
          <div className="relative">
            <Link
              to="/"
              className="normal-case text-3xl text-white font-bold flex justify-center items-center">
              <img
                src="https://i.ibb.co/Q8vpRcM/Capture-removebg-preview.png"
                alt="Capture-removebg-preview"
                width={50}
              />
              <div>
                <p className="ml-2"> Elyte Plazza</p>
                <p className="text-[12px] ml-2 text-[#264f8b] absolute bottom-[-13px] left-[50px] font-semibold tracking-[.01rem] mt-0.5">
                  Worldwide Electronics Store
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-96 mt-3">
        <div className="text-3xl font-bold text-center">
          LOGIN
          <p className="text-4xl font-black text-[#146CDA] tracking-[.05rem]">
            Elyte Plazza
          </p>
          <p className="text-[14px] text-gray-600 font-medium">
            {" "}
            Worldwide Electronics Store
          </p>
        </div>

        <div className="text-sm breadcrumbs text-center flex justify-center items-center">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>Login</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control mt-4">
            <label className="label p-0">
              <span className="label-text">Email</span>
            </label>
            <input
              onBlur={(event) => setUserEmail(event.target.value)}
              type="email"
              {...register("email", { required: "Email Address is required" })}
              placeholder="saf@gmail.com"
              className="input input-bordered rounded-[4px] border-[#146CDA] mb-4"
            />
            {errors.email && (
              <p className="text-red-600 text-left" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label p-0">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={`${show ? "text" : "password"}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password must be 6 characters",
                  },
                })}
                placeholder="......"
                className="input input-bordered rounded-[4px] w-full border-[#146CDA]"
              />
              {show ? (
                <AiOutlineEye
                  className="absolute top-4 right-3 text-xl cursor-pointer text-[#146CDA]"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute top-4 text-xl right-3 text-gray-400 cursor-pointer"
                  onClick={() => setShow(!show)}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-600 text-left" role="alert">
                {errors.password?.message}
              </p>
            )}
          </div>

          <label className="label p-0 mt-0.5">
            <span
              onClick={handleReset}
              className="label-text underline text-[#146CDA] cursor-pointer">
              Forget Password?
            </span>
          </label>
          <input
            className="bg-[#146CDA] hover:bg-[#285994] py-2.5 text-white w-full mt-5 rounded-[4px]"
            type="submit"
            value="Log In"
          />
          <div>
            {loginError && (
              <p className="text-red-600">
                {loginError} Please create account first.
              </p>
            )}
          </div>
          <p className="text-center text-[14px] mt-2">
            New to Elyte Plazza?{" "}
            <Link
              to="/signup"
              className="text-[#146CDA] font-semibold underline">
              Sign Up
            </Link>{" "}
          </p>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="py-2.5 border border-[#146CDA] text-[#146CDA] flex justify-center items-center gap-2 w-full rounded-[4px] hover:bg-[#146CDA] hover:text-white">
            Continue with Google <FcGoogle className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
