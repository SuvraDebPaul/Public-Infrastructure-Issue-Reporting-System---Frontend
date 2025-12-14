import React from "react";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";

const StaffLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1  md:ml-64">
        <div className="">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
