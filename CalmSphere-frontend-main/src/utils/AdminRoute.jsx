import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Unauthorized from "../StatusCodes/Unauthorized";

const AdminRoute = () => {
  // console.log("Admin routing here ...");
  let { user } = useContext(AuthContext);
  if (user) {
    return user.is_superuser ? <Outlet /> : <Unauthorized />;
  } else {
    return <Navigate to="/login" />;
  }
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
