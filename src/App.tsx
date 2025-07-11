import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";

import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import TakeQuiz from "./pages/TakeQuiz";
import { useEffect, useMemo } from "react";
import SocketService from "./services/socket";
import { FingerprintProvider } from "./contexts/FingerprintContext";
import { Pricing } from "./pages/Pricing";
import Checkout from "./pages/Checkout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/quiz",
        element: <TakeQuiz />
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ]
  }

]);

function App() {

  const socket = useMemo(() => SocketService.getInstance(), [])
  useEffect(() => {
    const prevConnected = socket.isConnected()
    socket.connect(localStorage.getItem("jwt_token") || "kiddo")
    return () => {
      if (!prevConnected && socket.isConnected()) {
        socket.disconnect()
      }
    }
  }, [socket])



  return (
    <FingerprintProvider>
      <RouterProvider router={router} />
    </FingerprintProvider>

  )
}

export default App;

