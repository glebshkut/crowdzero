import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import NavBar from "@/components/widgets/NavBar";
import Landing from "@/components/pages/Landing";
import App from "@/components/pages/App";

export default function Index() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/app",
      element: <App />
    },
  ]);

  return (
    <div className="min-h-screen w-full bg-background">
      <NavBar />
      <RouterProvider router={router} />
    </div>
  )
}
