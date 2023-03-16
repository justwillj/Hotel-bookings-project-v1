import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
const ActiveLink = ({ to, children }) => {
  //Link that helped me with this
  //https://www.youtube.com/watch?v=SLfhMt5OUPI
  const path = useResolvedPath(to);
  const isActive = useMatch({ path: path.pathname });
  return (
    <li className={path === to ? "active" : null}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
};

export default ActiveLink;
