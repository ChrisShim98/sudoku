import React from "react";

const Button = ({ text, clickFunction }) => {
  return (
    <div className="flex place-content-center">
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white cursor-pointer w-20 text-center"
        onClick={() => clickFunction()}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
