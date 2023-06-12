import { createBrowserRouter } from "react-router-dom";

import { Home, LoginPage, SignupPage } from "@/pages";

export const paths = {
  home: "/",
  login: "/login",
  signup: "/signup",
};

export const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />,
  },
  {
    path: paths.login,
    element: <LoginPage />,
  },
  {
    path: paths.signup,
    element: <SignupPage />,
  },
]);
