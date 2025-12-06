import { NavLink } from "react-router";

const MyLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `${isActive ? "text-primary font-bold" : ""}`;
      }}
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
