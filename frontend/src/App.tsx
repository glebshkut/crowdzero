import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "@/components/widgets/NavBar";
import Landing from "@/components/pages/Landing";
import Projects from "@/components/pages/Projects";
import { Routes } from "@/constants/routes";
import { ProjectDetails } from "@/components/pages/ProjectDetails";
import FundedProjects from "./components/pages/FundedProjects";
import CreateProject from "./components/pages/CreateProject";

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
          path: `${Routes.PROJECTS}/:projectId`,
          element: <ProjectDetails />
        },
        {
          path: Routes.CREATE_PROJECT,
          element: <CreateProject />
        },
        {
          path: Routes.MY_PROJECTS,
          element: <FundedProjects />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

function Layout() {
  return (
    <div className="min-h-screen w-full bg-background text-info !overflow-x-hidden">
      <NavBar />
      <Outlet />
    </div>
  )
}