import { Link } from "react-router";
import MyLink from "./MyNavLinks/MyLink";
import ThemeController from "./ThemeController";
import BoxContainer from "../../../Util/BoxContainer";
import { FcOnlineSupport } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import useRole from "../../../Hooks/useRole";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const userRole = role?.role;
  console.log(userRole);
  const allLinks = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/all-issues",
      name: "All Issues",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/contact",
      name: "Contact-Us",
    },
  ];

  if (isRoleLoading || loading) return <LoadingSpinner />;
  return (
    <section className="bg-base-100 shadow-sm">
      <BoxContainer>
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {allLinks.map((Link, i) => (
                  <li key={i}>
                    <MyLink to={Link.path}>{Link.name}</MyLink>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/"
              className="btn btn-ghost text-xl tooltip tooltip-right"
              data-tip="Public Infrastructure Issue
              Reporting System"
            >
              <FcOnlineSupport size={30} /> PIIRS
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 uppercase font-semibold">
              {allLinks.map((Link, i) => (
                <li key={i}>
                  <MyLink to={Link.path}>{Link.name}</MyLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-end">
            <ThemeController />
            <div className="dropdown dropdown-end ml-6">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user ? (
                    <img
                      alt={user?.displayName}
                      src={user?.photoURL}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <img
                      alt="Sample Profile Photo"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>User: {user ? user.displayName : "User Not Avaiable"}</a>
                </li>
                {userRole === "citizen" && (
                  <li>
                    <Link to="/dashboard" className="justify-between">
                      Dashboard
                    </Link>
                  </li>
                )}
                {userRole === "staff" && (
                  <li>
                    <Link to="/dashboard/staff" className="justify-between">
                      Dashboard
                    </Link>
                  </li>
                )}
                {userRole === "admin" && (
                  <li>
                    <Link to="/dashboard/admin" className="justify-between">
                      Dashboard
                    </Link>
                  </li>
                )}
                {user ? (
                  <li>
                    <a onClick={logOut}>Logout</a>
                  </li>
                ) : (
                  <li>
                    <Link to="/auth/login">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </BoxContainer>
    </section>
  );
};

export default Navbar;
