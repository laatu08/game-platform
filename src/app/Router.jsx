import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import ClickSpeed from "../games/click-speed/ClickSpeed";
import ReactionTime from "../games/reaction-time/ReactionTime";
import Snake from "../games/snake/Snake";
import WhackAMole from "../games/whack-a-mole/WhackAMole";

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
      {
        path: "game/reaction-time",
        element: <ReactionTime />,
      },
      {
        path: "game/snake",
        element: <Snake />,
      },
      {
        path: "game/whack-a-mole",
        element: <WhackAMole />,
      },
    ],
  },
]);

export default router;
