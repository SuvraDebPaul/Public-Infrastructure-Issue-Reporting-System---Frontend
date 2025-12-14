import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import All_Issues from "../Pages/All-Issues/All_Issues";
import IssueDetails from "../Pages/All-Issues/IssueDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LoadingSpinner from "../Util/LoadingSpinner";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashLayout from "../Layouts/DashLayout";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Pages/Dashboard/CitizenDashboard";
import ReportIssue from "../Pages/Report-Issue/ReportIssue";
import MyIssues from "../Pages/My-Issues/MyIssues";
import Profile from "../Pages/Profile/Profile";
import PaymentSucess from "../Pages/PaymentSucess/PaymentSucess";
import StaffDashboard from "../Components/Dashboard/Staff/StaffDashboard";
import AdminDashboard from "../Components/Dashboard/Admin/AdminDashboard";
import AdminAllIssues from "../Components/Dashboard/Admin/AdminAllIssues";
import ManageUsers from "../Components/Dashboard/Admin/ManageUsers";
import ManageStaff from "../Components/Dashboard/Admin/ManageStaff";
import AllPayments from "../Components/Dashboard/Admin/AllPayments";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () =>
          fetch("/public/dummyIssues.json").then((res) => res.json()),
      },
      {
        path: "all-issues",
        element: <All_Issues />,
      },
      {
        path: "issues/:id",
        element: (
          <PrivateRoutes>
            <IssueDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment/success",
        element: <PaymentSucess />,
      },
    ],
  },

  // AUTH ROUTES
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // DASHBOARD
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashLayout />
      </PrivateRoutes>
    ),
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "report-issue",
        element: <ReportIssue />,
      },
      {
        path: "my-issues",
        element: <MyIssues />,
      },
      {
        path: "my-issues/:id",
        element: <IssueDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/all-issues",
        element: <AdminAllIssues />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/manage-staff",
        element: <ManageStaff />,
      },
      {
        path: "/dashboard/all-payments",
        element: <AllPayments />,
      },
    ],
  },
]);
