import React from "react";

const ConfirmationModal = ({
  title,
  message,
  successButtonName,
  closeModal,
  modalData,
  successAction,
}) => {
  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirmation-modal"
              className="bg-[#0046ac] px-2 py-1 rounded-[4px] text-white"
            >
              {successButtonName}
            </label>
            <button
              onClick={closeModal}
              className="border px-2 py-1 rounded-[4px] border-[#0046ac]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
