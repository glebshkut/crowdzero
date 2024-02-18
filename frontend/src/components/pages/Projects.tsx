import { useEffect, useState } from "react"
import { ProjectInterface } from "./ProjectDetails/lib/type"
import ProjectItem from "../shared/ProjectItem";
import { projects as allprojects } from "./ProjectDetails/lib/projects";
import { campaigns } from "@/contracts";

export default function AllProjects() {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  useEffect(() => {
    async function readData() {
      const data = await campaigns.getDeployedCampaigns();
      console.log(data);
    }

    readData();
    setProjects(allprojects);
  }, []);

  return (
    <div className="h-full flex flex-col gap-9 text-info py-16 px-40">
      <h3 className="text-3xl font-bold">
        All Projects
      </h3>
      <div className="grid grid-cols-3 gap-6">
        {
          projects.map(project => (
            <div key={project.id}>
              <ProjectItem project={project} />
            </div>
          ))
        }
      </div>
    </div>
  )
}