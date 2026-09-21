interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
}

export default function ProjectCard({
  number,
  title,
  description,
}: ProjectCardProps) {
  return (
    <div className="project-card">
      <span className="project-number">
        {number}
      </span>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}