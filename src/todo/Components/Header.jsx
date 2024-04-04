import React from "react";
import todoIcon from "../assets/tasks.png";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
const Header = () => {
  return (
    <div className="text-5xl text-white text- py-3 bg-opacity-70 mb-14 rounded-lg w-[900px] flex flex-row justify-left items-center">
      {/* <img className="h-14 w-14" src={todoIcon} /> */}
      <CheckCircleTwoToneIcon
        className="flex flex-row items-center"
        color="blue"
        fontSize="large"
      />
      <div className="font-satoshi font-bold ml-5">Todo</div>
    </div>
  );
};

export default Header;
