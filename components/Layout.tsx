import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import abstractAiImage from '../src/assets/ai-abstract.svg';
import { BLOG_POSTS, PROJECTS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();

  const navLinks = [
    { name: 'Profile', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
  ];

  const searchResults = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const projectMatches = PROJECTS.filter((project) =>
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags.some((tag) => tag.toLowerCase().includes(q))
    ).map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      type: 'Project',
      to: `/projects/${project.id}`,
    }));

    const blogMatches = BLOG_POSTS.filter((post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q))
    ).map((post) => ({
      id: `blog-${post.id}`,
      label: post.title,
      type: 'Post',
      to: `/blog/${post.id}`,
    }));

    return [...projectMatches, ...blogMatches].slice(0, 8);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-neutral-900 selection:bg-neutral-900 selection:text-[#f6f5f2]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-10 md:gap-12">
        <aside className="md:sticky md:top-10 md:self-start border-b md:border-b-0 pb-6 md:pb-0 border-[#ddd8cf]">
          <div className="mb-5 overflow-hidden border border-[#d7d2c9] bg-[#efebe3]">
            <img
              src={abstractAiImage}
              alt="Abstract AI visual"
              className="w-full h-28 object-cover opacity-95"
            />
          </div>

          <div className="flex items-center justify-between md:block">
            <Link to="/" className="text-lg tracking-tight font-medium hover:opacity-70 transition-opacity">
              Jordan Speight
            </Link>
            <button
              className="md:hidden p-2 border border-[#d0ccc4] rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <p className="mt-2 text-sm text-neutral-600">Data Scientist</p>

          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex mt-5 flex-col gap-2`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-mono text-xs uppercase tracking-wide border-l-2 pl-3 py-1 transition-colors ${
                  location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-6`}>
            <label htmlFor="site-search" className="font-mono text-xs uppercase tracking-wide text-neutral-500">
              Search
            </label>
            <input
              id="site-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects and posts"
              className="mt-2 w-full border border-[#d8d3cb] bg-[#fbfaf7] px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900"
            />
            {searchQuery.trim().length > 0 && (
              <div className="mt-3 border border-[#ddd8cf] bg-[#fbfaf7]">
                {searchResults.length > 0 ? (
                  <ul className="divide-y divide-[#e4dfd6]">
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <Link
                          to={result.to}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setSearchQuery('');
                          }}
                          className="block px-3 py-2 hover:bg-[#f1ede6] transition-colors"
                        >
                          <p className="text-sm text-neutral-800 leading-snug">{result.label}</p>
                          <p className="font-mono text-[10px] uppercase tracking-wide text-neutral-500 mt-1">{result.type}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-3 py-3 text-sm text-neutral-500">No matches</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-4 text-neutral-500">
            <a href="#" className="hover:text-neutral-900 transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="#" className="hover:text-neutral-900 transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:jordanspeight@hotmail.com" className="hover:text-neutral-900 transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </aside>

        <main className="min-w-0 border-l border-[#ddd8cf] pl-0 md:pl-10">{children}</main>
      </div>

      <footer className="border-t border-[#ddd8cf] text-neutral-500">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 font-mono text-[11px] uppercase tracking-wider">
          {new Date().getFullYear()} Jordan Speight
        </div>
      </footer>
    </div>
  );
};

export default Layout;
