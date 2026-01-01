import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import ClickSpeed from "../games/click-speed/ClickSpeed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "game/click-speed",
        element: <ClickSpeed />,
      },
    ],
  },
]);

export default router;
