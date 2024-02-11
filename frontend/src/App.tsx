import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "@/components/widgets/NavBar";
import Landing from "@/components/pages/Landing";
import Projects from "@/components/pages/Projects";
import { Routes } from "./constants/routes";

export default function Index() {

  const router = createBrowserRouter([
    {
      element: (
        <Layout />
      ),
      children: [
        {
          path: Routes.HOME,
          element: <Landing />,
        },
        {
          path: Routes.PROJECTS,
          element: <Projects />
        },
        {
          path: Routes.CREATE_PROJECT,
          element: <div>Create Project</div>
        }]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

function Layout() {
  return (
    <div className="min-h-screen w-full bg-background text-info">
      <NavBar />
      <Outlet />
    </div>
  )
}