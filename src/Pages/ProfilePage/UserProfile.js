import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import useSeller from "../../hooks/useSeller";
import { GoUnverified, GoVerified } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  // const [usersInfo, setUsersInfo] = useState(null);
  // const [id, setId] = useState();
  // const [userVerifyStatus, setUserVerifyStatus] = useState("");
  // const [userLoading, setUserLoading] = useState(true);
  // const { data: users = [] } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await fetch("https://icebox-server-9upx1roo2-electra51.vercel.app/users");
  //     const data = await res.json();
  //     return data;
  //   },
  // });

  // useEffect(() => {
  //   const filterUser = users.filter((e, i) => e.email === user?.email);
  //   setUsersInfo(filterUser[0]);
  //   setId(filterUser[0]?._id);
  //   setUserVerifyStatus(filterUser[0]?.type);
  // }, [[user?.email, users]]);
  // console.log(usersInfo);
  // const handleVerify = (e) => {
  //   const userStatus = {
  //     type: "Pending",
  //   };
  //   if (userVerifyStatus === "Pending") {
  //     toast.success("Your Request has been Pending");
  //     return;
  //   }
  //   fetch(`https://icebox-server-9upx1roo2-electra51.vercel.app/users/verify/${id}`, {
  //     method: "PUT",
  //     // headers: {
  //     //   "content-type": "application/json",
  //     //   authorisation: `bearer ${localStorage.getItem("merchantry-token")}`,
  //     // },
  //     body: JSON.stringify(userStatus),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         toast.success("Your Request Has Pending, Please Wait");
  //         setUserVerifyStatus("Pending");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const handleSuccessToast = () => {
  //   toast.success("You Are Already Verified");
  // };
  // if (userLoading) {
  //   return <p>Loading</p>;
  // }

  return (
    <div className="flex justify-center text-center mt-32">
      <div>
        <div className="flex justify-center items-center my-4">
          {" "}
          <div className="avatar">
            <div className="w-48 rounded-full">
              <img src={user?.photoURL} alt="" />
            </div>
          </div>
        </div>
        <p className="font-semibold text-xl">
          {" "}
          User Name: <span className="font-normal">{user?.displayName}</span>
        </p>
        <p className="font-semibold text-xl">
          {" "}
          Email Address: <span className="font-normal">{user?.email}</span>
        </p>
        <p className="font-semibold text-xl">
          {" "}
          Mobile Number:{" "}
          <span className="font-normal">
            {user?.phoneNumber ? user?.phoneNumber : "+88001287695"}
          </span>
        </p>

        {/* {isSeller && (
          <div className="card-body items-center text-center">
            <div className="flex justify-start gap-2 items-center">
              {usersInfo?.type == "verified" && (
                <span>
                  <GoVerified className="text-[#3bc258]" />
                </span>
              )}
            </div>

            {!usersInfo?.type ? (
              <span className="flex justify-start gap-2 items-center">
                Verified:
                <GoVerified className="text-primary" />
              </span>
            ) : (
              <span className="flex justify-start gap-2 items-center">
                Verified:
                <GoUnverified className="text-error" />
              </span>
            )}
            <p>{usersInfo?.email}</p>
            <div className="card-actions">
              {usersInfo?.type == "verified" ? (
                <button
                  onClick={handleSuccessToast}
                  className="btn btn-success "
                >
                  Verified
                </button>
              ) : (
                <button
                  onClick={() => handleVerify(usersInfo?._id)}
                  className="btn btn-primary"
                >
                  {userVerifyStatus || "Verify Account"}
                </button>
              )}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UserProfile;
