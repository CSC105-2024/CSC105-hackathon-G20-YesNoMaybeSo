import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Homepage from "./page/Homepage";
import AddNewCategory from "./page/AddNewCategory";
import CategoryItem from "./page/CategoryItem";
import EnterMember from "./page/EnterMember";
import Login from "./page/Login";
import Register from "./page/Register";
import Match from "./page/Match";
import Participants from "./page/Participants";
import Profile from "./page/Profile";
import Swipe from "./page/Swipe";
import Waiting from "./page/Waiting";
import WaitngResult from "./page/WaitingResult";
import Category from "./page/Category";
import ProtectedLanding from "./page/ProtectedLanding";
import ProtectedRoute from "./components/ProtectedRoute";
import WaitingRoom from "./page/WaitingRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLanding />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Homepage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addnewcategory",
    element: (
      <ProtectedRoute>
        <AddNewCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/categoryitem/:id",
    element: (
      <ProtectedRoute>
        <CategoryItem />
      </ProtectedRoute>
    ),
  },
  {
    path: "/entermember/:groupId",
    element: (
      <ProtectedRoute>
        <EnterMember />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/match/:roundId",
    element: (
      <ProtectedRoute>
        <Match />
      </ProtectedRoute>
    ),
  },
  {
    path: "/participants/:roundId",
    element: (
      <ProtectedRoute>
        <Participants />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/swipe/:roundId",
    element: (
      <ProtectedRoute>
        <Swipe />
      </ProtectedRoute>
    ),
  },
  {
    path: "/waiting",
    element: (
      <ProtectedRoute>
        <Waiting />
      </ProtectedRoute>
    ),
  },
  {
    path: "/waitingresult/:roundId",
    element: (
      <ProtectedRoute>
        <WaitngResult />
      </ProtectedRoute>
    ),
  },
  {
    path: "/category",
    element: (
      <ProtectedRoute>
        <Category />
      </ProtectedRoute>
    ),
  },
  {
    path: "/waitingroom",
    element: (
      <ProtectedRoute>
        <WaitingRoom />
      </ProtectedRoute>
    ),
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
