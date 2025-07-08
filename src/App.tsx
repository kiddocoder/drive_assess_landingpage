import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";

import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import TakeQuiz from "./pages/TakeQuiz";
import { useEffect, useMemo } from "react";
import SocketService from "./services/socket";
import { FingerprintProvider } from "./contexts/FingerprintContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/quiz",
        element: <TakeQuiz />
      }
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

