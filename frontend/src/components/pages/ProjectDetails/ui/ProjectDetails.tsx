import { useParams } from 'react-router-dom';
import { ProjectInterface } from "../lib/type";
import { useEffect, useState } from "react";
import CommunityInfo from "@/components/shared/CommunityInfo";
import RaisedBar from "@/components/shared/RaisedBar";
import stylePrice from "@/components/shared/calculations/stylePrice";

export default function ProjectDetails() {
  const [project, setProject] = useState<ProjectInterface | null>(null);
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    setProject({
      id: projectId as string,
      name: "Project Name",
      description: "Project description Project description Project description, because Project description, because Project description Project description Project description Project description, because Project description, because Project description",
      image_url: "https://via.placeholder.com/300",
      raised: 750,
      goal: 1000,
      creator_address: "0x123",
      end_date: new Date()
    });
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }


  const {
    name,
    description,
    image_url,
    raised,
    goal,
    // creator_address,
    // end_date
  } = project;

  return (
    <div className="h-full">
      <div className="mt-16 ml-40">
        <h1 className="font-bold text-3xl">
          Fund Project
        </h1>
        <div className="flex gap-12 mt-7">
          <div className="flex flex-col gap-5 w-1/3 max-w-[300px]">
            <img src={image_url} alt="Fundraiser Image" />
            <CommunityInfo />
          </div>
          <div className="flex flex-col gap-6 w-1/3">
            <div>
              <span className="text-md font-bold text-action">Target</span>
              <h3 className="text-5xl bg-primary-gradient-reverted text-transparent bg-clip-text font-black">
                {goal} ETH
              </h3>
              <span className="text-primary text-lg">
                {/* move logic to model folder */}
                {stylePrice(goal)} USD
              </span>
            </div>
            <div>
              <h4 className="text-2xl">
                {name}
              </h4>
              <span className="text-md">
                {description}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button className="btn btn-primary">
                Verify and Join!
              </button>
              <span className="text-primary text-sm">
                Join this community quick and easy and anonymously!
              </span>
            </div>
            <div className="bg-secondary-background rounded-2xl p-4 gap-2 flex flex-col">
              <span className="font-bold">Fundrasiing Status</span>
              <RaisedBar raised={raised} goal={goal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}