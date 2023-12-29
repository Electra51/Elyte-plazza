import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { MdImage } from "react-icons/md";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [signUpError, setSignUPError] = useState("");
  const {
    createUser,
    signInWithGoogle,
    updateUser,
    handleCreateuser,
    handleUpdateUser,
  } = useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (token) {
    navigate(from, { replace: true });
  }

  const handleSignUp = (data) => {
    //notun kore sign up korle signup error empty
    setSignUPError("");
    const formData = new FormData();
    formData.append("image", data.image[0]);
    setLoading(true);
    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((image) => {
        // const imgUrl = image.data.image.url;
        // console.log("img", image.data.image.url);
        handleCreateuser(data.email, data.password)
          .then((result) => {
            handleUpdateUser(data.name, image.data.image.url)
              .then(() => {
                saveUser(
                  data.name,
                  data.email,
                  data.userType,
                  image.data.image.url
                );
              })
              .catch((err) => console.log(err));
          })

          .catch((error) => {
            // console.log(error);
            setSignUPError(error.message);
          });
      });

    // .then((result) => {
    //   const user = result.user;
    //   // console.log(user);
    //   toast.success("User created successfully");
    //   const userInfo = { displayName: data.name };
    //   updateUser(userInfo)
    //     .then(() => {
    //       saveUser(data.name, data.email, data.userType);
    //     })
    //     .catch((err) => console.log(err));
    // })
    // .catch((error) => {
    //   // console.log(error);
    //   setSignUPError(error.message);
    // });
  };

  // const handleSignUp = (data) => {
  //   setSignUPError("");

  //       handleCreateuser(data.email, data.password)
  //         .then((result) => {
  //           handleUpdateUser(data.name, image.data.url)
  //             .then(() => {
  //               const user = result.user;
  //               const userInfo = {
  //                 name: user.displayName,
  //                 email: user?.email,
  //                 userType: data.userType,
  //               };
  //               axios
  //                 .post("https://icebox-server-9upx1roo2-electra51.vercel.app/jwt", {
  //                   headers: {
  //                     authorization: `bearer ${localStorage.getItem("token")}`,
  //                   },
  //                 })
  //                 .then((res) => {
  //                   localStorage.setItem("token", res.data.token);
  //                 });
  //             })
  //             .catch((err) => console.log(err));
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           toast.error(err.message);
  //         });
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     });
  // };

  const handleGoogleSignIn = () => {
    signInWithGoogle().then((result) => {
      // console.log(result.user);
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

  const saveUser = (name, email, userType) => {
    const user = { name, email, userType };
    console.log("user", user);
    fetch("https://icebox-server-9upx1roo2-electra51.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
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
      <div className="w-96">
        <div className="text-3xl font-bold text-center">
          SIGNIN
          <p className="text-4xl font-black text-[#146CDA] tracking-[.05rem]">
            Elyte Plazza
          </p>
          <p className="text-[14px] text-gray-600 font-medium">
            {" "}
            Worldwide Electronics Store
          </p>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control mt-5">
            <label className="label p-0">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Safayet"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered rounded-[4px] border-[#146CDA] mb-4"
            />
            {errors.name && (
              <p className="text-red-600 text-left" role="alert">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label p-0">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Saf@gmail.com"
              {...register("email", { required: "Email Address is required" })}
              className="input input-bordered rounded-[4px] border-[#146CDA] mb-4"
            />
            {errors.email && (
              <p className="text-red-600 text-left" role="alert">
                {errors.email?.message}
              </p>
            )}
          </div>{" "}
          <div className="flex justify-start items-center gap-12">
            <label className="flex cursor-pointer flex-col w-1/2 h-20 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
              <div className="flex flex-col items-center justify-center pt-4">
                <MdImage className="text-2xl" />
                <p className="pt-1 text-sm tracking-wider text-black group-hover:text-gray-600">
                  Select a photo
                </p>
              </div>
              <input
                required
                type="file"
                {...register("image", { required: "Please select an image" })}
                className="file-input opacity-0 file-input-bordered w-full"
              />
            </label>

            <div className="flex flex-col justify-between mt-4">
              <label className="text-center">
                <div>
                  <input
                    className="mx-1"
                    type="radio"
                    value="buyer"
                    {...register("userType", { required: "please select one" })}
                    checked
                  />
                  Buyer
                </div>
              </label>
              <label className="text-center">
                <div>
                  <input
                    className="mx-1"
                    type="radio"
                    value="seller"
                    {...register("userType", { required: "please select one" })}
                  />
                  Seller
                </div>
              </label>
            </div>
          </div>
          <div className="form-control">
            <label className="label p-0">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={`${show ? "text" : "password"}`}
                placeholder="......"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password must be 6 characters long",
                  },
                  // pattern: {
                  //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/,
                  //   message: "password must be strong",
                  // },
                })}
                className="input input-bordered rounded-[4px] w-full border-[#146CDA] mb-3"
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
            {signUpError && <p className="text-red-600">{signUpError}</p>}
          </div>
          {errors.image && (
            <span className="text-red-600 text-left">
              {errors.image.message}
            </span>
          )}{" "}
          {errors.userType && (
            <p className="text-red-600 text-left" role="alert">
              {errors.userType?.message}
            </p>
          )}
          {/* <input
            className="bg-[#146CDA] hover:bg-[#285994] py-2.5 text-white w-full mt-5 rounded-[4px]"
            type="submit"
            value="Sign Up"
          /> */}
          <div className="form-control mt-1">
            <button
              type="submit"
              className={`bg-[#146CDA] hover:bg-[#285994] py-2.5 text-white w-full mt-5 rounded-[4px] ${
                loading ? "btn-disabled" : ""
              }`}>
              {loading ? (
                <span className="loading loading-spinner text-info"></span>
              ) : (
                "SignUp"
              )}
            </button>
          </div>
          <p className="text-center text-[14px] mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#146CDA] font-semibold underline">
              please Login
            </Link>{" "}
          </p>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="py-2.5 border border-[#146CDA] text-[#146CDA] flex justify-center items-center gap-2 w-full rounded-[4px] hover:bg-[#146CDA] hover:text-white">
            Continue with Google
            <FcGoogle className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
