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

type TableBlock = {
  type: 'table';
  headers: string[];
  rows: string[][];
};

type MarkdownBlock = {
  type: 'markdown';
  content: string;
};

type ContentBlock = TableBlock | MarkdownBlock;

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

const formatDateBritish = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleDateString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
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

const resolveAssetUrl = (src?: string): string | undefined => {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:') || src.startsWith('blob:')) return src;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;

  if (src.startsWith('/')) {
    if (normalizedBase && src.startsWith(`${normalizedBase}/`)) return src;
    return `${normalizedBase}${src}`;
  }

  return src;
};

const isTableSeparatorLine = (line: string): boolean => {
  const cells = line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
};

const parseTableRow = (line: string): string[] =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

const splitMarkdownTables = (markdown: string): ContentBlock[] => {
  const lines = markdown.split('\n');
  const blocks: ContentBlock[] = [];
  let mdBuffer: string[] = [];
  let i = 0;

  const flushMarkdown = () => {
    if (mdBuffer.length === 0) return;
    const content = mdBuffer.join('\n').trim();
    if (content) blocks.push({ type: 'markdown', content });
    mdBuffer = [];
  };

  while (i < lines.length) {
    const current = lines[i];
    const next = lines[i + 1];
    const looksLikeHeader = current?.includes('|') && !/^\s*```/.test(current);
    const looksLikeSeparator = typeof next === 'string' && next.includes('|') && isTableSeparatorLine(next);

    if (looksLikeHeader && looksLikeSeparator) {
      flushMarkdown();
      const headers = parseTableRow(current);
      i += 2;

      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|') && !/^\s*$/.test(lines[i])) {
        rows.push(parseTableRow(lines[i]));
        i += 1;
      }

      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    mdBuffer.push(current);
    i += 1;
  }

  flushMarkdown();
  return blocks;
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

  const allHeadings = React.useMemo(() => {
    return extractHeadings(data.markdown);
  }, [data.markdown]);
  const headings = React.useMemo(() => allHeadings.filter((h) => h.level >= 2), [allHeadings]);
  const contentBlocks = React.useMemo(() => splitMarkdownTables(data.markdown), [data.markdown]);
  const [lightboxImage, setLightboxImage] = React.useState<{ src: string; alt: string } | null>(null);

  const blogYear = type === 'blog' && 'date' in data ? new Date(data.date).getFullYear() : null;
  const scrollToHeading = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  };
  const closeLightbox = () => setLightboxImage(null);

  React.useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxImage]);

  const renderSlugger = createSlugger();

  const markdownComponents = {
    h1: ({ node, children, ...props }: any) => {
      const id = renderSlugger(nodeToText(children));
      return (
        <h1 id={id} className="text-3xl md:text-4xl font-bold mt-16 mb-8 scroll-mt-24 text-neutral-900" {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ node, children, ...props }: any) => {
      const id = renderSlugger(nodeToText(children));
      const headingIndex = headings.findIndex((h) => h.slug === id);
      const number = headingIndex !== -1 ? String(headingIndex + 1).padStart(2, '0') : null;

      return (
        <h2 id={id} className="text-2xl md:text-3xl font-bold mt-24 mb-10 scroll-mt-24 flex items-start gap-6 group text-neutral-900 border-t-2 border-neutral-900 pt-12" {...props}>
          {number && (
            <span className="font-mono text-xs text-white bg-neutral-900 px-2.5 py-1.5 shrink-0 mt-0.5 select-none tracking-tighter">
              {number}
            </span>
          )}
          <span className="flex-1 leading-tight">{children}</span>
        </h2>
      );
    },
    h3: ({ node, children, ...props }: any) => {
      const id = renderSlugger(nodeToText(children));
      const headingIndex = headings.findIndex((h) => h.slug === id);
      const number = headingIndex !== -1 ? String(headingIndex + 1).padStart(2, '0') : null;

      return (
        <h3 id={id} className="text-xl md:text-2xl font-bold mt-16 mb-6 scroll-mt-24 flex items-start gap-4 group text-neutral-800" {...props}>
          {number && (
            <span className="font-mono text-[10px] text-neutral-500 shrink-0 mt-2 select-none tracking-[0.2em] border-l-2 border-neutral-300 pl-4 uppercase">
              {number}
            </span>
          )}
          <span className="flex-1 leading-tight">{children}</span>
        </h3>
      );
    },
    blockquote: ({ node, ...props }: any) => (
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
    img: ({ node, ...props }: any) => {
      const resolvedSrc = resolveAssetUrl(props.src);
      return (
        <figure className="my-8">
          <button
            type="button"
            onClick={() => resolvedSrc && setLightboxImage({ src: resolvedSrc, alt: props.alt || 'Image preview' })}
            className="group relative block w-full text-left cursor-zoom-in"
          >
            <img className="w-full border border-[#ddd8cf]" {...props} src={resolvedSrc} />
            <span className="absolute right-3 top-3 bg-black/70 text-white text-[10px] font-mono uppercase tracking-wide px-2 py-1 opacity-90 group-hover:opacity-100">
              Click to zoom
            </span>
          </button>
          {props.alt && (
            <figcaption className="text-center text-xs font-mono text-neutral-500 mt-2 uppercase tracking-wide">
              {props.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    ul: ({ node, children, ...props }: any) => (
      <ul className="list-disc ml-6 my-4 space-y-2" {...props}>{children}</ul>
    ),
    ol: ({ node, children, ...props }: any) => (
      <ol className="list-decimal ml-6 my-4 space-y-2" {...props}>{children}</ol>
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="text-neutral-700 leading-relaxed" {...props}>{children}</li>
    ),
    p: ({ node, children, ...props }: any) => (
      <p className="text-neutral-700 leading-relaxed my-4" {...props}>{children}</p>
    ),
    a: (props: any) => {
      const href = props.href;
      const isExternal = href?.startsWith('http');
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-blue-700 underline underline-offset-4 hover:text-blue-800 transition-colors"
        >
          {props.children}
        </a>
      );
    },
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

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-10 lg:gap-12">
        <div className="min-w-0">
          <header className="border-b border-[#ddd8cf] pb-8">
            <h1 className="text-4xl md:text-5xl tracking-tight leading-tight text-neutral-900 max-w-4xl">{data.title}</h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-neutral-500">
              {'date' in data && (
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide">
                  <Calendar size={13} />
                  {formatDateBritish(data.date)}
                </div>
              )}
              {'date' in data && (
                <p className="font-mono text-xs uppercase tracking-wide">
                  {data.tags[0] ?? 'Post'}{blogYear ? `, ${blogYear}` : ''}
                </p>
              )}
            </div>
          </header>

          {type === 'project' && 'imageUrl' in data && !data.markdown.includes(`](${data.imageUrl})`) && (
            <div className="mt-8 overflow-hidden border border-[#ddd8cf]">
              <button
                type="button"
                onClick={() => {
                  const src = resolveAssetUrl(data.imageUrl);
                  if (src) setLightboxImage({ src, alt: data.title });
                }}
                className="group relative block w-full text-left cursor-zoom-in"
              >
                <img src={resolveAssetUrl(data.imageUrl)} className="w-full h-auto object-cover" alt={data.title} />
                <span className="absolute right-3 top-3 bg-black/70 text-white text-[10px] font-mono uppercase tracking-wide px-2 py-1 opacity-90 group-hover:opacity-100">
                  Click to zoom
                </span>
              </button>
            </div>
          )}

          <div className="mt-8 prose prose-neutral max-w-none prose-headings:tracking-tight prose-headings:font-medium prose-p:leading-relaxed prose-p:text-neutral-700 prose-a:text-blue-700 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-blue-800 prose-strong:text-neutral-900">
            {contentBlocks.map((block, index) => {
              if (block.type === 'table') {
                return (
                  <div key={`table-${index}`} className="my-8 overflow-x-auto border border-[#ddd8cf]">
                    <table className="w-full border-collapse text-sm">
                      <thead className="bg-[#f1ede6]">
                        <tr>
                          {block.headers.map((header, headerIndex) => (
                            <th key={headerIndex} className="border border-[#ddd8cf] px-3 py-2 text-left font-medium text-neutral-900">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border border-[#ddd8cf] px-3 py-2 text-neutral-700 align-top">
                                <ReactMarkdown
                                  components={{
                                    p: ({ children }) => <span>{children}</span>,
                                  }}
                                >
                                  {cell}
                                </ReactMarkdown>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              return (
                <ReactMarkdown key={`md-${index}`} components={markdownComponents}>
                  {block.content}
                </ReactMarkdown>
              );
            })}
          </div>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-10 border-l border-[#ddd8cf] pl-6">
              <p className="font-mono text-xs uppercase tracking-wide text-neutral-500">Headings</p>
              <ul className="mt-4 space-y-3 list-none">
                {headings.map((heading, index) => (
                  <li key={heading.slug} className="flex items-start gap-4">
                    <span className="font-mono text-[10px] text-neutral-900 font-bold mt-1.5 shrink-0 select-none tracking-widest border-b border-neutral-900 pb-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => scrollToHeading(heading.slug)}
                      className={`text-sm underline underline-offset-4 transition-colors font-medium ${
                        heading.level === 3 ? 'text-blue-600 hover:text-blue-700' : 'text-blue-700 hover:text-blue-800'
                      } text-left leading-relaxed`}
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/85 p-4 md:p-8" onClick={closeLightbox}>
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 md:right-8 md:top-8 text-white text-3xl leading-none"
            aria-label="Close image preview"
          >
            x
          </button>
          <div className="h-full w-full flex items-center justify-center">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-h-[92vh] max-w-[92vw] object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </article>
  );
};

export default PostDetail;
