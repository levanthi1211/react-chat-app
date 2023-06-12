import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./RoutersConfig";

export const Routers: FC = () => {
  return <RouterProvider router={router} />;
};
