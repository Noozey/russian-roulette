import HomepageUi from "./homepage";

import { createBrowserRouter, RouterProvider } from "react-router";
import Gamepage from "./gamepage";
import { PlayerProvider } from "./context/PlayerContext";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomepageUi /> },
    { path: "/gamepage", element: <Gamepage /> },
  ]);

  return (
    <PlayerProvider>
      <RouterProvider router={router} />
    </PlayerProvider>
  );
}

export default App;
