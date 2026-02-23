import React from 'react';
import { Link } from 'react-router-dom';
import { EXPERIENCES, PUBLICATIONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-14 pb-16">
      <section className="pt-2 md:pt-4 border-b border-[#ddd8cf] pb-10">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Profile</p>
        <h1 className="mt-3 text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
          I build practical AI systems that ship and hold up in production.
        </h1>
        <p className="mt-5 text-lg text-neutral-600 max-w-2xl leading-relaxed">
          I focus on NLP, model evaluation, and building resilient pipelines for high-stakes language tasks.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] gap-6 md:gap-10">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 pt-1">Experience</p>
        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <article key={idx} className="border-b border-[#e5e1d9] pb-5">
              <h2 className="text-2xl tracking-tight">{exp.role}</h2>
              <p className="mt-1 text-neutral-600">{exp.company}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-neutral-500">{exp.period}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] gap-6 md:gap-10">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 pt-1">Publications</p>
        <div className="space-y-5">
          {PUBLICATIONS.map((pub, idx) => (
            <article key={idx} className="border-b border-[#e5e1d9] pb-4">
              <h3 className="text-xl tracking-tight leading-snug">{pub.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{pub.authors}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-neutral-500">
                {pub.venue} {pub.year}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] gap-6 md:gap-10">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 pt-1">Explore</p>
        <div className="flex flex-col sm:flex-row gap-6 text-xl">
          <Link to="/projects" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
            Projects
          </Link>
          <Link to="/blog" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
            Blog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
