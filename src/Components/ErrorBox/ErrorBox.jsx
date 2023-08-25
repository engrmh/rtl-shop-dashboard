import React from "react";

export default function ErrorBox({ msg }) {
  return (
    <div className="bg-danger my-1 p-2 d-flex justify-content-center align-items-center">
      <h2 className="text-white mt-2">{msg}</h2>
    </div>
  );
}
