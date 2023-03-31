import React from "react";

export default function Card({ children, additionalStyle, padding }) {
  return (
    <div className={`${additionalStyle}`}>
      <div className={`${padding} bg-white mx-auto rounded-lg`}>{children}</div>
    </div>
  );
}
