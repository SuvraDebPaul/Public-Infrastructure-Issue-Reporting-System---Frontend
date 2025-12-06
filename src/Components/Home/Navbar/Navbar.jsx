import { Link } from "react-router";
import MyLink from "../../Components/Home/Navbar/MyNavLinks/MyLink";
import ThemeController from "../../Components/Home/Navbar/ThemeController";
import BoxContainer from "../../Util/BoxContainer";
import { FcOnlineSupport } from "react-icons/fc";

const Navbar = () => {
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

  const DashboardLinks = [];

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
                  {" "}
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
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">Dashboard</a>
                </li>
                <li>
                  <a>Login</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </BoxContainer>
    </section>
  );
};

export default Navbar;
