import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={atomDark}
              language={match[1]}
              PreTag="div"
              className="rounded-md my-2"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm" {...props}>
              {children}
            </code>
          );
        },
        // Style other markdown elements
        h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>,
        p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
        li: ({ children }) => <li className="ml-4">{children}</li>,
        a: ({ href, children }) => (
          <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic bg-gray-800/50 py-2 rounded-r">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-6 border-gray-700" />,
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-700 rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-gray-800">{children}</thead>,
        th: ({ children }) => (
          <th className="px-4 py-2 border-b border-gray-700 text-left">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 border-b border-gray-700">{children}</td>
        ),
      }}
      className="prose prose-invert max-w-none"
    >
      {content}
    </ReactMarkdown>
  );
}