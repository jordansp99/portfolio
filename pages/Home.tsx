import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowUpRight, GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import { EXPERIENCES, PUBLICATIONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* Profile Section */}
      <section className="pt-2 md:pt-4 border-b border-[#ddd8cf] pb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-neutral-500 mb-3">
          <span>Profile</span>
          <span>•</span>
          <span className="text-neutral-700 font-medium">University of Manchester</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight max-w-3xl font-normal text-neutral-900">
          PhD Researcher in Robotics &amp; AI
        </h1>
        <div className="mt-5 space-y-3 max-w-3xl text-neutral-700 leading-relaxed text-base md:text-lg">
          <p>
            I am Jordan Speight, a PhD researcher with the RAINZ CDT at the University of Manchester.
            My doctoral research investigates the techno-economic optimisation of robotic inspection for circular offshore energy assets.
          </p>
          <p className="text-neutral-600 text-sm md:text-base">
            Previously, my research focused on speech and language AI, investigating ASR debiasing, regional dialect adaptation, and model evaluation for public services.
          </p>
        </div>
      </section>

      {/* Publications Section (High Priority - Elevated Right Below Profile) */}
      <section className="grid grid-cols-1 md:grid-cols-[160px_minmax(0,1fr)] gap-6 md:gap-8 border-b border-[#ddd8cf] pb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-neutral-500 pt-1">
            <BookOpen size={14} className="text-neutral-700" />
            <span>Publications</span>
          </div>
          <p className="font-mono text-xs text-neutral-400 mt-1 hidden md:block">
            Peer-reviewed papers
          </p>
        </div>

        <div className="space-y-4">
          {PUBLICATIONS.map((pub, idx) => (
            <article
              key={idx}
              className="group border border-[#ddd8cf] bg-[#f9f8f5] hover:bg-white p-5 border-l-4 border-l-neutral-900 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.04)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.07)]"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-block font-mono text-[11px] font-medium bg-neutral-900 text-white px-2 py-0.5 tracking-tight">
                    {pub.venue}
                  </span>
                  <span className="font-mono text-xs text-neutral-500 font-medium">
                    {pub.month ? `${pub.month} ` : ''}{pub.year}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-medium tracking-tight leading-snug text-neutral-900">
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline underline-offset-4 hover:text-blue-800 transition-colors inline-flex items-center gap-1.5 group-hover:text-blue-800"
                    >
                      <span>{pub.title}</span>
                      <ExternalLink size={14} className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>

                <p className="text-xs md:text-sm text-neutral-600 font-normal">
                  {pub.authors}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2-Column Grid for Education & Experience */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-b border-[#ddd8cf] pb-10">
        {/* Education Column */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-neutral-500 border-b border-[#e5e1d9] pb-2">
            <GraduationCap size={14} className="text-neutral-700" />
            <span>Education</span>
          </div>

          <div className="space-y-4">
            <article className="border-b border-[#e5e1d9] pb-4 pl-3.5 -ml-3.5 border-l-2 border-l-transparent hover:border-l-neutral-900 transition-colors">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg md:text-xl font-medium tracking-tight text-neutral-900">PhD Robotics and AI</h3>
                <span className="font-mono text-[11px] text-neutral-500 shrink-0">Sept 2025 – Present</span>
              </div>
              <p className="text-sm text-neutral-600 mt-0.5">University of Manchester</p>
            </article>

            <article className="border-b border-[#e5e1d9] pb-4 pl-3.5 -ml-3.5 border-l-2 border-l-transparent hover:border-l-neutral-900 transition-colors">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg md:text-xl font-medium tracking-tight text-neutral-900">MSc. Artificial Intelligence</h3>
                <span className="font-mono text-[11px] text-neutral-500 shrink-0">Jan 2025 – Present</span>
              </div>
              <p className="text-sm text-neutral-600 mt-0.5">University Of Essex</p>
            </article>

            <article className="border-b border-[#e5e1d9] pb-4 pl-3.5 -ml-3.5 border-l-2 border-l-transparent hover:border-l-neutral-900 transition-colors">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg md:text-xl font-medium tracking-tight text-neutral-900">B.A. Modern Languages</h3>
                <span className="font-mono text-[11px] text-neutral-500 shrink-0">2016 – 2020</span>
              </div>
              <p className="text-sm text-neutral-600 mt-0.5">University of Birmingham</p>
            </article>
          </div>
        </div>

        {/* Experience Column */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-neutral-500 border-b border-[#e5e1d9] pb-2">
            <Briefcase size={14} className="text-neutral-700" />
            <span>Experience</span>
          </div>

          <div className="space-y-4">
            {EXPERIENCES.map((exp, idx) => (
              <article key={idx} className="border-b border-[#e5e1d9] pb-4 pl-3.5 -ml-3.5 border-l-2 border-l-transparent hover:border-l-neutral-900 transition-colors">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-neutral-900">{exp.role}</h3>
                  <span className="font-mono text-[11px] text-neutral-500 shrink-0">{exp.period}</span>
                </div>
                <p className="text-sm text-neutral-600 mt-0.5">{exp.company}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Explore / Quick Navigation */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Explore</p>
        <div className="flex items-center gap-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-lg text-blue-700 underline underline-offset-4 hover:text-blue-800 font-medium transition-colors"
          >
            <span>Projects</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-lg text-blue-700 underline underline-offset-4 hover:text-blue-800 font-medium transition-colors"
          >
            <span>Blog</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
