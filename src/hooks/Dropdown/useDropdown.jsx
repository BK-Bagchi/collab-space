import React from "react";

const Dropdown = ({ open, render }) => {
  return (
    <div className="relative inline-block text-left mt-10">
      {/* Dropdown */}
      {open && render}
    </div>
  );
};

export default Dropdown;
