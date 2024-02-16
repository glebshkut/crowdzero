import ProjectTableRow from "../shared/ProjectTableRow";
import { projects } from "./ProjectDetails/lib/projects";

export default function FundedProjects() {

  return (
    <div className="h-full flex flex-col gap-9 text-info py-16 px-40">
      <h3 className="text-3xl font-bold">
        All Funded Projects
      </h3>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-secondary text-lg text-bold bg-dark">
            <th>Receiver</th>
            <th>Your Activity</th>
            <th>Latest Activity</th>
            <th>Funded Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            projects.map(project => (
              <ProjectTableRow project={project} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}