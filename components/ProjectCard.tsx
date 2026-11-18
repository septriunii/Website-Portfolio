import React, { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  data: Project;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, featured = false }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const destination = data.link || data.githubLink;
  const preview = data.image && !imageFailed && (
    <img
      src={data.image}
      alt=""
      loading={featured ? 'eager' : 'lazy'}
      fetchPriority={featured ? 'high' : 'auto'}
      referrerPolicy="no-referrer"
      onError={() => setImageFailed(true)}
    />
  );

  return (
    <article className={featured ? 'project project-feature' : 'project project-row'} aria-labelledby={data.id}>
      <div className="project-heading">
        {featured && <p className="feature-label">Featured project</p>}
        <h3 id={data.id}>
          {destination ? <a href={destination} target="_blank" rel="noopener noreferrer">{data.title}</a> : data.title}
        </h3>
        {!featured && <p className="project-summary">{data.description}</p>}
      </div>
      {preview && (
        destination ? (
          <a className="project-preview" href={destination} target="_blank" rel="noopener noreferrer" aria-label={`Open ${data.title}`}>
            {preview}
          </a>
        ) : <div className="project-preview">{preview}</div>
      )}
      <div className="project-details">
        {featured && <p className="project-summary">{data.description}</p>}
        {data.contribution && <p className="project-contribution">{data.contribution}</p>}
        <ul className="project-tools" aria-label="Technologies">
          {data.technologies.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
        <div className="project-links">
          {data.link && <a href={data.link} target="_blank" rel="noopener noreferrer" aria-label={`${data.title} live demo`}>Live demo <ArrowUpRight size={15} aria-hidden="true" /></a>}
          {data.githubLink && <a href={data.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`${data.title} source code`}><Github size={15} aria-hidden="true" /> Source code</a>}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
