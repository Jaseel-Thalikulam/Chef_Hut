import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "../redux/store";
interface IPublicRouteProps {
  children: React.ReactNode;
}
function PublicRoutes({ children }: IPublicRouteProps) {
  const { isAuth } = useSelector((state: rootState) => state.user);

  if (!isAuth) return children;

  return <Navigate to={"/profile"} />;
}

export default PublicRoutes;
