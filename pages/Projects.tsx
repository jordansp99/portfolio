import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get('tag');
  const [query, setQuery] = React.useState('');

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q.length === 0 ||
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchesTag && matchesQuery;
  });

  return (
    <div className="space-y-10 pb-16">
      <header className="border-b border-[#ddd8cf] pb-7 pt-2 md:pt-4">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Projects</p>
        <h1 className="mt-3 text-4xl md:text-6xl tracking-tight">Selected Work</h1>
        <p className="mt-4 text-neutral-600 max-w-2xl leading-relaxed">
          A concise set of projects focused on practical language AI, evaluation, and production reliability.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wide text-neutral-500">Filter</span>
          {selectedTag ? (
            <>
              <span className="font-mono text-xs uppercase tracking-wide px-2 py-1 border border-neutral-900">{selectedTag}</span>
              <button
                onClick={() => setSearchParams({})}
                className="font-mono text-xs uppercase tracking-wide underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                Clear
              </button>
            </>
          ) : (
            <span className="text-sm text-neutral-500">No active filters</span>
          )}
        </div>

        <div className="mt-5">
          <label htmlFor="project-search" className="font-mono text-xs uppercase tracking-wide text-neutral-500">
            Search
          </label>
          <input
            id="project-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by title, description, or tag"
            className="mt-2 w-full max-w-xl border border-[#d8d3cb] bg-[#fbfaf7] px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_260px] gap-10 xl:gap-12">
        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="grid grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] gap-5 md:gap-10 border-b border-[#e5e1d9] pb-8"
            >
              <div className="space-y-3 pt-1">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                  <span className="text-neutral-700">{String(index + 1).padStart(2, '0')}</span> Project
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchParams(selectedTag === tag ? {} : { tag })}
                      className={`font-mono text-[11px] uppercase tracking-wide px-2 py-1 border transition-colors ${
                        selectedTag === tag
                          ? 'border-neutral-900 bg-neutral-900 text-[#f6f5f2]'
                          : 'border-[#d9d5cd] text-neutral-600 hover:border-neutral-900 hover:text-neutral-900'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
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

        <aside className="hidden xl:block">
          <div className="sticky top-10 border-l border-[#ddd8cf] pl-6">
            <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Project Headings</p>
            <ol className="mt-4 space-y-3">
              {filteredProjects.map((project, index) => (
                <li key={project.id} className="flex gap-3 leading-snug">
                  <span className="font-mono text-xs text-neutral-500 pt-1">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-neutral-800">{project.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      {filteredProjects.length === 0 && (
        <div className="border border-dashed border-[#d4cfc6] p-10 text-center">
          <p className="text-neutral-600">
            No projects found{selectedTag ? ` for tag "${selectedTag}"` : ''}.
          </p>
          {query.trim() && <p className="mt-2 text-neutral-500">Search: "{query.trim()}"</p>}
          <button
            onClick={() => setSearchParams({})}
            className="mt-4 font-mono text-xs uppercase tracking-wide underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
