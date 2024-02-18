import { Link } from "react-router-dom";
import { ProjectInterface, ProjectStatus } from "../pages/ProjectDetails/lib/type";
import PercentageHolder from "./PercentageHolder";
import stylePrice from "./calculations/stylePrice";
import RaisedBar from "./RaisedBar";
import classNames from "classnames";

export default function ProjectItem({
  project,
  status = ProjectStatus.Active
}: {
  project: ProjectInterface;
  status?: ProjectStatus;
}) {
  const {
    name,
    raised,
    goal,
    // creator_address,
    // end_date
  } = project;


  const renderItem = () => {
    const reached = Math.floor((Number(raised) / Number(goal)) * 100);
    const isReached = reached === 100;
    return (
      <div
        className={
          classNames(
            "bg-secondary-background p-6 flex flex-col gap-2 h-full rounded-2xl", {
            "!bg-dark": isReached
          })
        }
      >
        <div className="flex justify-between">
          <span className="text-2xl">
            {name}
          </span>
          {
            status === ProjectStatus.PaidOut ? (
              <PercentageHolder text="Paid Out" />
            ) : (
              <PercentageHolder text={`${isReached ? "Target Reached!" : reached + "%"}`} />
            )
          }
        </div>
        <div className="flex items-center gap-2">
          <img src="/assets/eth-token.png" alt="eth token icon" width={32} />
          <span className="text-info text-3xl font-bold">
            {Number(raised)}
          </span>
        </div>
        <span className="text-primary text-sm">
          Target: {stylePrice(Number(goal), false, true)} ({Number(goal)} Ξ)
        </span>
        <RaisedBar raised={Number(raised)} goal={Number(goal)} noInfo />
      </div>
    )
  }

  return (
    <Link to={`/projects/${project.campaignId}`}>
      {renderItem()}
    </Link>
  )
}