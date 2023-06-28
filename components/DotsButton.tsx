"use client";

import { BiDotsVerticalRounded } from "react-icons/bi";

const DotsButton = () => {
  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
    >
      <BiDotsVerticalRounded size={25} />
    </button>
  );
};

export default DotsButton;
