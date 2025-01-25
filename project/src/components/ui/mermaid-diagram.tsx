import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#60a5fa',
        lineColor: '#60a5fa',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a',
      },
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    });

    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          // Clear the container first
          containerRef.current.innerHTML = '';
          
          // Create a unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          // Create a temporary container with the unique ID
          const tempContainer = document.createElement('div');
          tempContainer.id = id;
          tempContainer.style.width = '100%';
          containerRef.current.appendChild(tempContainer);
          
          // Render the diagram
          await mermaid.render(id, chart.trim());
          
          // The SVG is now in the tempContainer
        } catch (error) {
          console.error('Failed to render mermaid diagram:', error);
          containerRef.current.innerHTML = '<div class="text-red-500 p-4">Failed to render diagram. Please check the diagram syntax.</div>';
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div ref={containerRef} className={`my-4 overflow-x-auto ${className}`}>
      <div className="text-gray-400 text-sm">Loading diagram...</div>
    </div>
  );
}