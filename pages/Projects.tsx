import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const filteredProjects = PROJECTS;

  return (
    <div className="space-y-10 pb-16">
      <header className="border-b border-[#ddd8cf] pb-7 pt-2 md:pt-4">
        <h1 className="text-4xl md:text-6xl tracking-tight">Projects</h1>
      </header>

      <div className="space-y-8">
        {filteredProjects.map((project) => (
          <article key={project.id} className="border-b border-[#e5e1d9] pb-8">
            <div className="space-y-4 flex flex-col items-start">
              <h2 className="text-3xl md:text-4xl tracking-tight leading-tight">
                <Link to={`/projects/${project.id}`} className="text-blue-700 underline underline-offset-4 hover:text-blue-800 transition-colors">
                  {project.title}
                </Link>
              </h2>
              <p className="text-neutral-600 leading-relaxed max-w-2xl">{project.description}</p>
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
