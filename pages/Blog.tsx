import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="pb-16">
      <header className="border-b border-[#ddd8cf] pb-8 pt-2 md:pt-4">
        <h1 className="text-4xl md:text-6xl tracking-tight">Blog Posts</h1>
      </header>

      <div className="mt-10 space-y-10">
        {BLOG_POSTS.map((post) => {
          const year = new Date(post.date).getFullYear();
          const metaLine = [...post.tags, String(year)].join(', ');

          return (
            <article key={post.id} className="border-b border-[#e5e1d9] pb-9">
              <h2 className="text-3xl md:text-4xl tracking-tight leading-tight">
                <Link to={`/blog/${post.id}`} className="hover:opacity-70 transition-opacity">
                  {post.title}
                </Link>
              </h2>

              <p className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-neutral-500">
                <Calendar size={13} />
                {post.date}
              </p>

              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-neutral-500">{metaLine}</p>

              <p className="mt-4 text-neutral-700 leading-relaxed max-w-4xl">{post.excerpt}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
