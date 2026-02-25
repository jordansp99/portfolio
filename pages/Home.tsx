import React from 'react';
import { Link } from 'react-router-dom';
import { EXPERIENCES, PUBLICATIONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-14 pb-16">
      <section className="pt-2 md:pt-4 border-b border-[#ddd8cf] pb-10">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Profile</p>
        <h1 className="mt-3 text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
          Welcome to my corner of the internet.
        </h1>
        <p className="mt-5 text-lg text-neutral-600 max-w-2xl leading-relaxed">
          I am Jordan Speight, a data scientist focused on machine learning and AI systems.
          I enjoy working on hard problems with great people, and I occasionally write about ideas that interest me.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] gap-6 md:gap-10">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 pt-1">Education</p>
        <div className="space-y-5">
          <article className="border-b border-[#e5e1d9] pb-5">
            <h3 className="text-2xl tracking-tight">MSc. Artificial Intelligence</h3>
            <p className="mt-1 text-neutral-600">University Of Essex</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-neutral-500">Jan 2025 to Present</p>
          </article>
          <article className="border-b border-[#e5e1d9] pb-5">
            <h3 className="text-2xl tracking-tight">B.A. Modern Languages</h3>
            <p className="mt-1 text-neutral-600">University of Birmingham</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-neutral-500">Sept 2016 to Sept 2020</p>
          </article>
        </div>
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
              {pub.link ? (
                <h3 className="text-xl tracking-tight leading-snug">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline underline-offset-4 hover:text-blue-800 transition-colors"
                  >
                    {pub.title}
                  </a>
                </h3>
              ) : (
                <h3 className="text-xl tracking-tight leading-snug">{pub.title}</h3>
              )}
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
