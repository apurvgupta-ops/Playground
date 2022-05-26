import React from "react";
import Avatar from "react-avatar";

const Client = ({ socketId, name }) => {
  return (
    <div className="mb-2 px-2">
      <Avatar name={name} size={40} round={"14px"} />
      <span className="px-2">{name}</span>
    </div>
  );
};

export default Client;
