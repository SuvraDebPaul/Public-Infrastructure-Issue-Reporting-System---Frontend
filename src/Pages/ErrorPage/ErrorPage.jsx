import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <img
        src="https://i.ibb.co.com/2Yc5j2kV/404.jpg"
        alt=""
        className="max-w-full h-[80vh]"
      />
      <Link to="/" className="btn btn-primary">
        Go To Home Page
      </Link>
    </div>
  );
};

export default ErrorPage;
