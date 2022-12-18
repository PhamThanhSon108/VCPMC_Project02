import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../../shared/hooks";
import { getRoles } from "../../../modules/setting/RoleManagement/respository";

export const RoleManagementPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRoles());
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};
