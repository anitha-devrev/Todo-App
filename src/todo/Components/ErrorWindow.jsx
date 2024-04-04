import React, { useContext } from "react";
import { DataContext } from "./DataProvider";
import Modal from "react-modal";

const ErrorWindow = () => {
  const { displayAddRowError, setDisplayAddRowError } = useContext(DataContext);
  return (
    <div id="error-window">
      <Modal
        isOpen={displayAddRowError}
        onRequestClose={() => setDisplayAddRowError(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            padding: "20px",
            textAlign: "center",
            background: "linear-gradient(to right,red, brown)",
          },
        }}
      >
        <div className="flex justify-end">
          <button
            className="border-2 border-white-500 rounded-lg p-2 px-3 text-white hover:bg-white hover:text-red-600"
            onClick={() => setDisplayAddRowError(false)}
          >
            X
          </button>
        </div>
        <h2 className="text-white mt-2">
          Please fill in all the fields to add a task!
        </h2>
      </Modal>
    </div>
  );
};

export default ErrorWindow;
