import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { EXPERIENCES, PUBLICATIONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-7 pb-6">
      {/* Profile Section */}
      <section className="pt-1 border-b border-[#ddd8cf] pb-5">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 mb-2">Profile</p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight font-normal text-neutral-900">
          PhD Researcher in Robotics &amp; AI
        </h1>
        <div className="mt-3.5 space-y-2 text-neutral-700 leading-relaxed text-sm md:text-base max-w-4xl">
          <p>
            I am Jordan Speight, a PhD researcher with the RAINZ CDT at the University of Manchester.
            My doctoral research investigates the techno-economic optimisation of robotic inspection for circular offshore energy assets.
          </p>
          <p>
            Previously, my research focused on speech and language AI, investigating ASR debiasing, regional dialect adaptation, and model evaluation for public services.
          </p>
        </div>
      </section>

      {/* 3-Column Wide Grid: Education | Experience | Publications */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 border-b border-[#ddd8cf] pb-6">
        {/* Education */}
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 mb-3 pb-1.5 border-b border-[#e5e1d9]">
            Education
          </p>
          <div className="space-y-3">
            <article className="border-b border-[#e5e1d9] pb-3 pl-3 -ml-3 border-l-2 border-l-transparent hover:border-l-neutral-900 transition-colors">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base font-medium tracking-tight text-neutral-900">PhD Robotics &amp; AI</h3>
                <span className="font-mono text-[11px] text-neutral-500 shrink-0">Sept 2025–Pres</span>
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">University of Manchester</p>
            </article>

            <article className="border-b border-[#e5e1d9] pb-3 pl-3 -ml-3 border-l-2 border-l-transparent hover:border-l-neutral-900 transition-colors">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base font-medium tracking-tight text-neutral-900">MSc. AI</h3>
                <span className="font-mono text-[11px] text-neutral-500 shrink-0">Jan 2025–Pres</span>
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">University Of Essex</p>
            </article>

            <article className="border-b border-[#e5e1d9] pb-3 pl-3 -ml-3 border-l-2 border-l-transparent hover:border-l-neutral-900 transition-colors">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base font-medium tracking-tight text-neutral-900">B.A. Modern Languages</h3>
                <span className="font-mono text-[11px] text-neutral-500 shrink-0">2016–2020</span>
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">University of Birmingham</p>
            </article>
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 mb-3 pb-1.5 border-b border-[#e5e1d9]">
            Experience
          </p>
          <div className="space-y-3">
            {EXPERIENCES.map((exp, idx) => (
              <article key={idx} className="border-b border-[#e5e1d9] pb-3 pl-3 -ml-3 border-l-2 border-l-transparent hover:border-l-neutral-900 transition-colors">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-medium tracking-tight text-neutral-900">{exp.role}</h3>
                  <span className="font-mono text-[11px] text-neutral-500 shrink-0">{exp.period}</span>
                </div>
                <p className="text-xs text-neutral-600 mt-0.5">{exp.company}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-neutral-500 mb-3 pb-1.5 border-b border-[#e5e1d9]">
            Publications
          </p>
          <div className="space-y-3">
            {PUBLICATIONS.map((pub, idx) => (
              <article key={idx} className="border-b border-[#e5e1d9] pb-3 pl-3 -ml-3 border-l-2 border-l-transparent hover:border-l-neutral-900 transition-colors">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-[11px] text-neutral-500 font-medium">{pub.venue}</span>
                  <span className="font-mono text-[11px] text-neutral-500 shrink-0">{pub.year}</span>
                </div>
                <h3 className="text-sm font-medium tracking-tight leading-snug text-neutral-900 mt-0.5">
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline underline-offset-4 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                    >
                      <span>{pub.title}</span>
                      <ExternalLink size={12} className="shrink-0 opacity-70" />
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="flex items-center justify-between pt-1">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Explore</p>
        <div className="flex items-center gap-6 text-base md:text-lg">
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
