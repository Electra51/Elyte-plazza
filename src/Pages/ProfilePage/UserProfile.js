import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import useSeller from "../../hooks/useSeller";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const [isSeller] = useSeller(user?.email);
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
      </div>
    </div>
  );
};

export default UserProfile;
