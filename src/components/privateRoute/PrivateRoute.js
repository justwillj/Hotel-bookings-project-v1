import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  return sessionStorage.getItem("token") != "" ? children : <Navigate to="/" />;
};
export default PrivateRoute;
