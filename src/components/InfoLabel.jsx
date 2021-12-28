import React from "react";

const InfoLabel = ({ text, icon }) => {
  return (
    <p>
      {icon} <span className="fw-bold">{text}</span>{" "}
    </p>
  );
};

export default InfoLabel;
