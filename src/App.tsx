import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";

import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ]
  }

]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;

