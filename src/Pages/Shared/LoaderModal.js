import React from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { Link } from "react-router-dom";

const LoaderModal = () => {
    return (
        <>
            <input type="checkbox" id="loader-modal" className="modal-toggle" />
            <div className="modal rounded-[4px]">
                <div className="modal-box relative">
                    <label
                        htmlFor="loader-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <div className="text-lg font-bold flex justify-center items-center p-5 gap-2"> <TbAlertTriangle className="text-red-500" /><h3>Please Login for booking products</h3></div>
                    <div className="flex justify-center items-center mb-5"> <Link to="/login"><button className="px-3 py-1.5 bg-[#166CDA] rounded-[4px] text-white">Login</button></Link></div>
                </div>
            </div>
        </>
    );
};

export default LoaderModal;
