import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center text-center mt-32">
      <div>
        <div className="flex justify-center items-center">
          {" "}
          <img src={user?.photoURL} alt="" />
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
