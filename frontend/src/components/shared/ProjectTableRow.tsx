import { ProjectInterface } from "../pages/ProjectDetails/lib/type";

export default function ProjectTableRow({ project }: { project: ProjectInterface }) {
  const {
    name,
    // description,
    // image_url,
    raised,
    goal,
    // creator_address,
    // end_date
  } = project;

  const reached = Math.floor((raised / goal) * 100);
  return (
    <tr key={project.id} className="text-sm">
      <td>
        <div className="flex flex-col">
          <span className="text-info font-bold">{name}</span>
          <span className="text-action">0x677....R7788</span>
        </div>
      </td>
      <td>
        <div className="flex flex-col">
          <span className="text-primary font-bold">Tx Type</span>
          <span className="text-action">Amount</span>
        </div>
      </td>
      <td>
        <div className="flex flex-col">
          <span className="text-primary font-bold">Tx Type</span>
          <span className="text-action">16/02/2024</span>
        </div>
      </td>
      <td>
        <div className="flex flex-col">
          <span className="text-primary font-bold">{reached}%</span>
          <span className="text-action">16/02/2024</span>
        </div>
      </td>
      <td className="w-fit">
        <button className="btn bg-blue hover:bg-blue/80 text-info">
          In escrow
        </button>
      </td>
    </tr>
  )
}

