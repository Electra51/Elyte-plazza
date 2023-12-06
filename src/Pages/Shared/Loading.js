import React from "react";
import { ThreeDots } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="flex justify-center items-center my-32">
      <p className="mr-2"> Loading</p>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#0047AF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      {/* <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">...</span>
      </div> */}
    </div>
  );
};

export default Loading;
