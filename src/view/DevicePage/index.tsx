import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { getDevices } from "../../modules/device/respository";
import { getServices } from "../../modules/service/respository";
import { serviceStore } from "../../modules/service/serviceStore";

export default function DevicePage() {
  const dispatch = useAppDispatch();

  const services: Array<{ serviceName: string; id: string }> | undefined =
    useAppSelector((state) => {
      return state.service.services;
    });
  useEffect(() => {
    dispatch(getDevices());
    if (services.length == 0) {
      getServices().then((serviceSnap) => {
        dispatch(serviceStore.actions.fetchService({ services: serviceSnap }));
      });
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}
