import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, Calendar } from 'lucide-react';
import { BLOG_POSTS, PROJECTS } from '../constants';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);

type TocHeading = {
  level: number;
  text: string;
  slug: string;
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const createSlugger = () => {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = slugify(text) || 'section';
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
};

const extractHeadings = (markdown: string): TocHeading[] => {
  const slugger = createSlugger();
  return markdown
    .split('\n')
    .map((line) => line.match(/^(#{1,6})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => {
      const level = match[1].length;
      const text = match[2].trim();
      return { level, text, slug: slugger(text) };
    })
    .filter((heading) => heading.level >= 1 && heading.level <= 3);
};

const nodeToText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join('');
  if (React.isValidElement(node)) return nodeToText(node.props.children);
  return '';
};

const PostDetail: React.FC<{ type: 'blog' | 'project' }> = ({ type }) => {
  const { id } = useParams();
  const data = type === 'blog' ? BLOG_POSTS.find((p) => p.id === id) : PROJECTS.find((p) => p.id === id);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
        <h1 className="text-6xl font-medium text-neutral-900">404</h1>
        <p className="font-mono text-neutral-500">Content not found</p>
        <Link to="/" className="text-blue-700 underline underline-offset-4 hover:text-blue-800 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  const listPath = type === 'blog' ? '/blog' : '/projects';
  const listLabel = type === 'blog' ? 'Blog' : 'Projects';

  const allHeadings = React.useMemo(() => extractHeadings(data.markdown), [data.markdown]);
  const headings = React.useMemo(() => allHeadings.filter((h) => h.level >= 2), [allHeadings]);
  const headingSlugger = createSlugger();

  const blogYear = type === 'blog' && 'date' in data ? new Date(data.date).getFullYear() : null;
  const scrollToHeading = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <article className="max-w-6xl mx-auto pb-20">
      <Link
        to={listPath}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-blue-700 hover:text-blue-800 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to {listLabel}
      </Link>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-10 lg:gap-12">
        <div className="min-w-0">
          <header className="border-b border-[#ddd8cf] pb-8">
            <h1 className="text-4xl md:text-5xl tracking-tight leading-tight text-neutral-900 max-w-4xl">{data.title}</h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-neutral-500">
              {'date' in data && (
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide">
                  <Calendar size={13} />
                  {data.date}
                </div>
              )}
              {'date' in data && (
                <p className="font-mono text-xs uppercase tracking-wide">
                  {data.tags[0] ?? 'Post'}{blogYear ? `, ${blogYear}` : ''}
                </p>
              )}
            </div>
          </header>

          {type === 'project' && 'imageUrl' in data && (
            <div className="mt-8 overflow-hidden border border-[#ddd8cf]">
              <img src={data.imageUrl} className="w-full h-auto object-cover" alt={data.title} />
            </div>
          )}

          <div className="mt-8 prose prose-neutral max-w-none prose-headings:tracking-tight prose-headings:font-medium prose-p:leading-relaxed prose-p:text-neutral-700 prose-a:text-blue-700 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-blue-800 prose-strong:text-neutral-900 prose-code:text-neutral-800 prose-code:px-1 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown
              components={{
                h1: ({ node, children, ...props }) => {
                  const id = headingSlugger(nodeToText(children));
                  return (
                    <h1 id={id} className="text-3xl mt-10 mb-5 scroll-mt-24" {...props}>
                      {children}
                    </h1>
                  );
                },
                h2: ({ node, children, ...props }) => {
                  const id = headingSlugger(nodeToText(children));
                  return (
                    <h2 id={id} className="text-2xl mt-10 mb-4 scroll-mt-24" {...props}>
                      {children}
                    </h2>
                  );
                },
                h3: ({ node, children, ...props }) => {
                  const id = headingSlugger(nodeToText(children));
                  return (
                    <h3 id={id} className="text-xl mt-8 mb-3 scroll-mt-24" {...props}>
                      {children}
                    </h3>
                  );
                },
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-2 border-[#cfc8bd] pl-4 italic text-neutral-600" {...props} />
                ),
                code: ({ node, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match && !String(children).includes('\n');

                  if (isInline) {
                    return (
                      <code className="bg-transparent border border-[#d8d3cb] text-neutral-800 px-1 py-0.5 rounded-sm text-[0.9em]" {...props}>
                        {children}
                      </code>
                    );
                  }

                  return (
                    <div className="my-8 border border-[#ddd8cf] overflow-hidden">
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match ? match[1] : 'text'}
                        PreTag="div"
                        customStyle={{ margin: 0, padding: '1rem', background: '#111827', fontSize: '0.84rem' }}
                        showLineNumbers={true}
                        lineNumberStyle={{ minWidth: '2.2em', paddingRight: '1em', color: '#6b7280', textAlign: 'right' }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  );
                },
                img: ({ node, ...props }) => (
                  <figure className="my-8">
                    <img className="w-full border border-[#ddd8cf]" {...props} />
                    {props.alt && (
                      <figcaption className="text-center text-xs font-mono text-neutral-500 mt-2 uppercase tracking-wide">
                        {props.alt}
                      </figcaption>
                    )}
                  </figure>
                ),
              }}
            >
              {data.markdown}
            </ReactMarkdown>
          </div>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-10 border-l border-[#ddd8cf] pl-6">
              <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Headings</p>
              <ol className="mt-4 space-y-3">
                {headings.map((heading, index) => (
                  <li key={heading.slug} className="flex gap-3 leading-snug">
                    <span className="font-mono text-xs text-neutral-500 pt-1">{String(index + 1).padStart(2, '0')}</span>
                    <button
                      type="button"
                      onClick={() => scrollToHeading(heading.slug)}
                      className={`text-sm hover:text-neutral-900 transition-colors ${
                        heading.level === 3 ? 'text-neutral-500' : 'text-neutral-800'
                      } text-left`}
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
};

export default PostDetail;
