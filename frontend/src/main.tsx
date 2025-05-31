import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Homepage from "./page/Homepage";
import AddNewCategory from "./page/AddNewCategory";
import CategoryItem from "./page/CategoryItem";
import DirectSwipe from "./page/DirectSwipe";
import EnterMember from "./page/EnterMember";
import Login from "./page/Login";
import Register from "./page/Register";
import Match from "./page/Match";
import Participants from "./page/Participants";
import Profile from "./page/Profile";
import Swipe from "./page/Swipe";
import Waiting from "./page/Waiting";
import WaitngResult from "./page/waitingresult";

const router = createBrowserRouter([
  {
    path: "/",
    element: < Homepage />,
  },
  {
    path: "/home",
    element: < Homepage />,
  },
  {
    path: "/addnewcategory",
    element: < AddNewCategory />,
  },
  {
    path: "/categoryitem",
    element: < CategoryItem />,
  },
  {
    path: "/directswipe",
    element: < DirectSwipe />,
  },
  {
    path: "/entermember",
    element: < EnterMember />,
  },
  {
    path: "/login",
    element: < Login />,
  },
  {
    path: "/register",
    element: < Register />,
  },
  {
    path: "/match",
    element: < Match />,
  },
  {
    path: "/participants",
    element: < Participants />,
  },
  {
    path: "/profile",
    element: < Profile />,
  },
  {
    path: "/swipe",
    element: < Swipe />,
  },
  {
    path: "/waiting",
    element: < Waiting />,
  },
  {
    path: "/waitingresult",
    element: < WaitngResult />,
  },
  
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
