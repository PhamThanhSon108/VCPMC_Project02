import React from "react";

export default React.memo(function IconDelete() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="52" height="52" rx="26" fill="#727288" fill-opacity="0.5" />
      <path
        d="M34 18L18 34"
        stroke="currentcolor"
        stroke-width="2.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 18L34 34"
        stroke="currentcolor"
        stroke-width="2.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});
