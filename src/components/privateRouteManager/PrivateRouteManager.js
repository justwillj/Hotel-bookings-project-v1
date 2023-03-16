import { Navigate } from "react-router";

const PrivateRouteManager = ({ children }) => {
  return sessionStorage.getItem("token") != "" &&
    sessionStorage.getItem("role") == "manager" ? (
    children
  ) : (
    <Navigate to="/reservations" />
  );
};
export default PrivateRouteManager;
