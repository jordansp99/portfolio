import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Profile', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-neutral-900 selection:bg-neutral-900 selection:text-[#f6f5f2]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-10 md:gap-12">
        <aside className="md:sticky md:top-10 md:self-start border-b md:border-b-0 pb-6 md:pb-0 border-[#ddd8cf]">
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

          <p className="mt-2 text-sm text-neutral-600">AI Engineer</p>

          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex mt-5 flex-col gap-2`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-mono text-xs uppercase tracking-wide border-l-2 pl-3 py-1 transition-colors ${
                  location.pathname === link.path
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

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
