import React from "react";
import "../../styles/base/TextInput.css";

const TextInput = ({
  width,
  height,
  placeholder = "default input",
  icon,
  type,
}) => {
  return (
    <div className="search-wrapper">
      <div
        className="search-container"
        style={{
          width: `${width}`,
          height: `${height}`,
          background: `radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.05) 0%,
                    rgba(48,118,234,0.2) 0%,
                    rgba(255, 255, 255, 0.05) 70%
                )`,
        }}
      >
        <input id="search" placeholder={placeholder} type={type} />
        {icon}
      </div>
    </div>
  );
};

export default TextInput;
