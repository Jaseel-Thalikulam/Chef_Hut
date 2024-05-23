import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "../redux/store";
interface IPrivateRouteProps {
  children: React.ReactNode;
}
function PrivateRoutes({ children }: IPrivateRouteProps) {
  const { isAuth } = useSelector((state: rootState) => state.user);

  if (isAuth) return children;

  return <Navigate to={"/"} />;
   
}

export default PrivateRoutes;
