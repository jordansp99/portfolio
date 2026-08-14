import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { EXPERIENCES, PUBLICATIONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Profile Section */}
      <section className="pt-2 border-b border-[#ddd8cf] pb-8">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 mb-2">Profile</p>
        <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal text-neutral-900">
          PhD Researcher in Robotics &amp; AI
        </h1>
        <div className="mt-4 space-y-3 text-neutral-700 leading-relaxed text-base md:text-lg max-w-4xl">
          <p>
            I am Jordan Speight, a PhD researcher with the RAINZ CDT at the University of Manchester.
            My doctoral research investigates the techno-economic optimisation of robotic inspection for circular offshore energy assets.
          </p>
          <p>
            Previously, my research focused on speech and language AI, investigating ASR debiasing, regional dialect adaptation, and model evaluation for public services.
          </p>
        </div>
      </section>

      {/* Education & Experience Side-by-Side (2 Columns) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 border-b border-[#ddd8cf] pb-8">
        {/* Education */}
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 mb-4 pb-2 border-b border-[#e5e1d9]">
            Education
          </p>
          <div className="space-y-4">
            <article className="border-b border-[#e5e1d9] pb-4 pl-4 -ml-4 border-l-2 border-l-transparent hover:border-l-teal-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-lg tracking-tight text-neutral-900">PhD Robotics and AI</h3>
                <span className="font-mono text-xs text-neutral-500 shrink-0">Sept 2025 to Present</span>
              </div>
              <p className="mt-1 text-sm text-neutral-600">University of Manchester</p>
            </article>

            <article className="border-b border-[#e5e1d9] pb-4 pl-4 -ml-4 border-l-2 border-l-transparent hover:border-l-teal-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-lg tracking-tight text-neutral-900">MSc. Artificial Intelligence</h3>
                <span className="font-mono text-xs text-neutral-500 shrink-0">Jan 2025 to Present</span>
              </div>
              <p className="mt-1 text-sm text-neutral-600">University Of Essex</p>
            </article>

            <article className="border-b border-[#e5e1d9] pb-4 pl-4 -ml-4 border-l-2 border-l-transparent hover:border-l-teal-700 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-lg tracking-tight text-neutral-900">B.A. Modern Languages</h3>
                <span className="font-mono text-xs text-neutral-500 shrink-0">Sept 2016 to Sept 2020</span>
              </div>
              <p className="mt-1 text-sm text-neutral-600">University of Birmingham</p>
            </article>
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 mb-4 pb-2 border-b border-[#e5e1d9]">
            Experience
          </p>
          <div className="space-y-4">
            {EXPERIENCES.map((exp, idx) => (
              <article key={idx} className="border-b border-[#e5e1d9] pb-4 pl-4 -ml-4 border-l-2 border-l-transparent hover:border-l-teal-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-lg tracking-tight text-neutral-900">{exp.role}</h3>
                  <span className="font-mono text-xs text-neutral-500 shrink-0">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-600">{exp.company}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Publications (2 Columns Across Width Directly Below) */}
      <section className="border-b border-[#ddd8cf] pb-8">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 mb-4 pb-2 border-b border-[#e5e1d9]">
          Publications
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PUBLICATIONS.map((pub, idx) => (
            <article
              key={idx}
              className="border-b border-[#e5e1d9] pb-4 pl-4 -ml-4 border-l-2 border-l-transparent hover:border-l-teal-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg md:text-xl tracking-tight leading-snug">
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline underline-offset-4 hover:text-blue-800 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{pub.title}</span>
                      <ExternalLink size={14} className="shrink-0 opacity-70" />
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{pub.authors}</p>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-wide text-neutral-500">
                {pub.venue} • {pub.year}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Explore Section */}
      <section className="flex items-center justify-between pt-2">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Explore</p>
        <div className="flex items-center gap-6 text-lg">
          <Link to="/projects" className="text-blue-700 underline underline-offset-4 hover:text-blue-800 transition-colors">
            Projects
          </Link>
          <Link to="/blog" className="text-blue-700 underline underline-offset-4 hover:text-blue-800 transition-colors">
            Blog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
