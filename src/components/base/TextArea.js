import React from "react";
import "../../styles/base/TextArea.css";

const TextInput = ({
  width,
  height,
  placeholder = "default input",
  icon,
  type,
}) => {
  return (
    <div className="search-wrapper-area">
      <div
        className="search-container-area"
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
        <textarea id="search-area" placeholder={placeholder} type={type} />
        {icon}
      </div>
    </div>
  );
};

export default TextInput;
