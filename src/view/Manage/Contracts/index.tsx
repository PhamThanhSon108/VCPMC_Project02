import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

function Contracts() {
  useEffect(() => {
    document.title = "Quản lý hợp đồng";
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default Contracts;
