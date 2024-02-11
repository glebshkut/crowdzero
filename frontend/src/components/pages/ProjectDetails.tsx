import { useParams } from 'react-router-dom';

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div>
      Project ID: {projectId}
    </div>
  );
}