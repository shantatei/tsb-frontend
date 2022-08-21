import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  const isAuth = useSelector((state) => state.login.isAuth);
  const roles = useSelector((state) => state.user.user.roles);
  const location = useLocation();


  return !isAuth ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : roles.find((role) => allowedRoles.includes(role.role_name)) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
