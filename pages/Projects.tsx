import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const filteredProjects = PROJECTS;

  return (
    <div className="space-y-10 pb-16">
      <header className="border-b border-[#ddd8cf] pb-7 pt-2 md:pt-4">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Projects</p>
        <h1 className="mt-3 text-4xl md:text-6xl tracking-tight">Selected Work</h1>
        <p className="mt-4 text-neutral-600 max-w-2xl leading-relaxed">
          A concise set of projects focused on practical language AI, evaluation, and production reliability.
        </p>

      </header>

      <div className="space-y-8">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="grid grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] gap-5 md:gap-10 border-b border-[#e5e1d9] pb-8"
          >
            <div className="space-y-3 pt-1">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">Project</p>
            </div>

            <div className="space-y-4 flex flex-col items-start">
              <h2 className="text-3xl md:text-4xl tracking-tight leading-tight">
                <Link to={`/projects/${project.id}`} className="hover:opacity-70 transition-opacity">
                  {project.title}
                </Link>
              </h2>
              <p className="text-neutral-600 leading-relaxed max-w-2xl">{project.description}</p>
              <Link
                to={`/projects/${project.id}`}
                className="font-mono text-xs uppercase tracking-wide underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                View Case Study
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="border border-dashed border-[#d4cfc6] p-10 text-center">
          <p className="text-neutral-600">No projects found.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
