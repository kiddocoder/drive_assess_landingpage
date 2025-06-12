import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";

import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import TakeQuiz from "./pages/TakeQuiz";

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
  return (
    <RouterProvider router={router} />
  )
}

export default App;

