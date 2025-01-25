import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Circle, CheckCircle2, Lock } from 'lucide-react';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'current' | 'completed';
  type: 'milestone' | 'concept' | 'project';
}

interface RoadmapDiagramProps {
  nodes: RoadmapNode[];
  className?: string;
  onNodeClick?: (node: RoadmapNode) => void;
}

export function RoadmapDiagram({ nodes, className = '', onNodeClick }: RoadmapDiagramProps) {
  return (
    <div className={`relative py-8 ${className}`}>
      {/* Background line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 transform -translate-y-1/2" />
      
      {/* Nodes */}
      <div className="relative flex justify-between items-center gap-4 flex-wrap">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex-1 min-w-[250px] ${
                index % 2 === 0 ? 'md:mt-0 md:mb-24' : 'md:mb-0 md:mt-24'
              }`}
              onClick={() => {
                if (node.status !== 'locked' && onNodeClick) {
                  onNodeClick(node);
                }
              }}
            >
              <div
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  node.status === 'completed'
                    ? 'bg-blue-500/10 border-blue-500/50 hover:border-blue-400'
                    : node.status === 'current'
                    ? 'bg-purple-500/10 border-purple-500/50 hover:border-purple-400 cursor-pointer'
                    : 'bg-gray-800/50 border-gray-700 opacity-50'
                } ${node.status !== 'locked' ? 'hover:transform hover:scale-105' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {node.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    ) : node.status === 'current' ? (
                      <Circle className="w-5 h-5 text-purple-400" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          node.type === 'milestone'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : node.type === 'project'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {node.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{node.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{node.description}</p>
                  </div>
                </div>
              </div>

              {/* Connector line and arrow */}
              {index < nodes.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-8 transform translate-x-full">
                  <div className="relative w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50">
                    <ArrowRight className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-purple-400" />
                  </div>
                </div>
              )}
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}