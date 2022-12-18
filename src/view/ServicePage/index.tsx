import { Row, Typography } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Service from "./components/Service";
import "./Service.scss";
export default function ServicePage() {
  return (
    <>
      <Outlet />
    </>
  );
}
