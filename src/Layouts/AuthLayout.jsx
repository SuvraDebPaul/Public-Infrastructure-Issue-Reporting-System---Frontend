import React from "react";
import Navbar from "../Components/Home/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Home/Footer/Footer";

const AuthLayout = () => {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default AuthLayout;
