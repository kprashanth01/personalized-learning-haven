import React, { useState } from 'react';
import { Send, Sparkles, BookOpen, Loader } from 'lucide-react';
import { generateRoadmap, chatWithAI, generateQuiz, getLearningMaterials } from '../lib/gemini';
import { MarkdownRenderer } from '../components/ui/markdown-renderer';
import { RoadmapDiagram } from '../components/ui/roadmap-diagram';
import { Quiz } from '../components/Quiz';
import { LearningProgress } from '../components/LearningProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { useRoadmapStore } from '../lib/roadmap-store';

export function Learn() {
  const [activeTab, setActiveTab] = useState<'chat' | 'roadmap'>('chat');
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [learningContent, setLearningContent] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<any[] | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    roadmap,
    setRoadmap,
    updateProgress,
    updateQuizScore,
    error: roadmapError
  } = useRoadmapStore();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setChatHistory(prev => [...prev, { role: 'user', content: message }]);
      const response = await chatWithAI(message);
      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      await setRoadmap(topic);
      setTopic('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNodeClick = async (node: any) => {
    if (node.status === 'locked') return;
    
    setSelectedNode(node);
    setShowQuiz(false);
    setIsLoading(true);
    
    try {
      // Get learning materials for the selected node
      const content = await getLearningMaterials(roadmap?.title || '', node.title);
      setLearningContent(content);
      
      // Generate quiz questions
      const questions = await generateQuiz(node.title, 1);
      setQuizQuestions(questions);
    } catch (error) {
      console.error('Error loading node content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = (score: number) => {
    if (selectedNode && roadmap?.nodes) {
      // Update the current node's status to completed
      const updatedNodes = roadmap.nodes.map(node => {
        if (node.id === selectedNode.id) {
          return { ...node, status: 'completed' };
        }
        // Find the next node and unlock it
        const currentIndex = roadmap.nodes.findIndex(n => n.id === selectedNode.id);
        if (currentIndex >= 0 && currentIndex + 1 < roadmap.nodes.length) {
          const nextNode = roadmap.nodes[currentIndex + 1];
          if (node.id === nextNode.id) {
            return { ...node, status: 'current' };
          }
        }
        return node;
      });

      // Update the roadmap with new node statuses
      setRoadmap({ ...roadmap, nodes: updatedNodes });
      
      // Update progress and score
      updateProgress(selectedNode.id, true);
      updateQuizScore(selectedNode.id, score);
      
      // Show results for a moment before resetting
      setTimeout(() => {
        setSelectedNode(null);
        setLearningContent(null);
        setQuizQuestions(null);
        setShowQuiz(false);
      }, 3000);
    }
  };

  return (
    <div className="pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'chat'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span>AI Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'roadmap'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Learning Roadmap</span>
              </button>
            </div>

            {/* Content */}
            <div className="bg-black/[0.96] rounded-lg p-6 shadow-xl border border-gray-800">
              <AnimatePresence mode="wait">
                {activeTab === 'chat' ? (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Chat History */}
                    <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto">
                      {chatHistory.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-6 rounded-lg ${
                            msg.role === 'user'
                              ? 'bg-blue-500/20 ml-12 border border-blue-500/20'
                              : 'bg-gray-800/50 mr-12 border border-gray-700'
                          }`}
                        >
                          {msg.role === 'user' ? (
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          ) : (
                            <MarkdownRenderer content={msg.content} />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask anything..."
                        className="flex-1 bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 shadow-lg shadow-blue-500/30 flex items-center space-x-2"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="roadmap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Loading Indicator */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="flex flex-col items-center gap-4">
                          <Loader className="w-8 h-8 animate-spin text-blue-500" />
                          <p className="text-blue-400">Generating content...</p>
                        </div>
                      </div>
                    )}

                    {/* Roadmap Form */}
                    {!selectedNode && (
                      <form onSubmit={handleGenerateRoadmap} className="flex space-x-2">
                        <input
                          type="text"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="Enter a topic (e.g., 'React Development', 'Machine Learning')"
                          className="flex-1 bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                          disabled={isLoading}
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 shadow-lg shadow-blue-500/30 flex items-center space-x-2"
                        >
                          {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Generate'}
                        </button>
                      </form>
                    )}

                    {roadmapError && (
                      <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg">
                        {roadmapError}
                      </div>
                    )}

                    {/* Selected Node Content */}
                    {selectedNode && learningContent && !showQuiz && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <h2 className="text-2xl font-bold">{selectedNode.title}</h2>
                          <button
                            onClick={() => setShowQuiz(true)}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                          >
                            Take Quiz
                          </button>
                        </div>
                        <MarkdownRenderer content={learningContent} />
                      </motion.div>
                    )}

                    {/* Quiz */}
                    {selectedNode && showQuiz && quizQuestions && (
                      <Quiz
                        questions={quizQuestions}
                        onComplete={handleQuizComplete}
                      />
                    )}

                    {/* Roadmap Display */}
                    {roadmap && !selectedNode && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                      >
                        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                          <MarkdownRenderer content={roadmap.description} />
                        </div>
                        
                        {roadmap.nodes && (
                          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                            <h2 className="text-xl font-bold mb-6">Learning Path Visualization</h2>
                            <RoadmapDiagram
                              nodes={roadmap.nodes}
                              onNodeClick={handleNodeClick}
                            />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <LearningProgress />
          </div>
        </div>
      </div>
    </div>
  );
}