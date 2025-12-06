import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import All_Issues from "../Pages/All-Issues/All_Issues";
import IssueDetails from "../Pages/All-Issues/IssueDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LoadingSpinner from "../Util/LoadingSpinner";

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
      },
      {
        path: "/all-issues",
        element: <All_Issues />,
      },
      {
        path: "/issue/:id",
        element: <IssueDetails />,
      },
    ],
  },
]);
