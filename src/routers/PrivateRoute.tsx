import { FC, ReactComponentElement } from "react";

import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAppSelector } from "../shared/hooks";

interface PropType {
  component: React.FC | any;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  if (true) return Component;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
