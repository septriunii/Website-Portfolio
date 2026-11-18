import React, { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  data: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const destination = data.link || data.githubLink;
  const preview = data.image && !imageFailed ? (
    <img src={data.image} alt="" loading="lazy" onError={() => setImageFailed(true)} />
  ) : (
    <span aria-hidden="true">{data.title}</span>
  );

  return (
    <article className="project-card" aria-labelledby={data.id}>
      {!expanded && (
        destination ? (
          <a className="project-preview" href={destination} target="_blank" rel="noopener noreferrer" aria-label={`Open ${data.title}`}>
            {preview}
          </a>
        ) : <div className="project-preview">{preview}</div>
      )}

      <div className="project-heading">
        <h3 id={data.id}>
          {destination ? <a href={destination} target="_blank" rel="noopener noreferrer">{data.title}</a> : data.title}
        </h3>
        <div className="project-links">
          {data.githubLink && (
            <a href={data.githubLink} target="_blank" rel="noopener noreferrer" title="Source code" aria-label={`${data.title} source code`}>
              <Github size={16} aria-hidden="true" />
            </a>
          )}
          {data.link && (
            <a href={data.link} target="_blank" rel="noopener noreferrer" title="Live demo" aria-label={`${data.title} live demo`}>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <p className={data.contribution && !expanded ? 'project-summary project-excerpt' : 'project-summary'}>{data.description}</p>
      {data.contribution && (
        <div>
          <p id={`${data.id}-contribution`} className="project-contribution" hidden={!expanded}>{data.contribution}</p>
          <button type="button" aria-expanded={expanded} aria-controls={`${data.id}-contribution`} onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show less' : 'More details'}
          </button>
        </div>
      )}

      <div className="project-stack">
        <p>Tech stack</p>
        <ul aria-label="Technologies">
          {data.technologies.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
