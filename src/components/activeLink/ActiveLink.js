import { NavLink, useResolvedPath } from 'react-router-dom';
import React from 'react';

function ActiveLink({ to, children }) {
  // Link that helped me with this
  // https://www.youtube.com/watch?v=SLfhMt5OUPI
  const path = useResolvedPath(to);
  return (
    <li className={path === to ? 'active' : null}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}

export default ActiveLink;
