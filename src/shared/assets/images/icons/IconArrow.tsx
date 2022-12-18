import React, { StyleHTMLAttributes } from "react";
import CSS from "csstype";
export default React.memo(function IconArrow({
  styles,
}: {
  styles: CSS.Properties;
}) {
  return (
    <svg
      style={styles}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 9L12 15L18 9" fill="currentcolor" />
      <path
        d="M6 9L12 15L18 9H6Z"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
