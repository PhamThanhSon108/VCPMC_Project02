import { Outlet } from "react-router-dom";
import ProvideNewNumber from "./component/ProvideNewNumber";
import "./ProvideNumbersPage.scss";
export default function ProvideNumberPage() {
  return (
    <>
      <Outlet />
    </>
  );
}
