import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface QuizProps {
  questions: {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
  }[];
  onComplete: (score: number) => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const score = calculateScore();
      onComplete(score);
    }
  };

  const calculateScore = () => {
    const correctAnswers = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    return Math.round((correctAnswers / questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/[0.96] p-6 rounded-lg border border-gray-800"
      >
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">{score}%</div>
          <p className="text-gray-400 mb-6">
            You got {answers.filter((a, i) => a === questions[i].correctAnswer).length} out of {questions.length} questions correct
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`p-4 rounded-lg ${
                answers[index] === question.correctAnswer
                  ? 'bg-green-500/20 border border-green-500/50'
                  : 'bg-red-500/20 border border-red-500/50'
              }`}
            >
              <div className="flex items-start gap-3">
                {answers[index] === question.correctAnswer ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 mt-1" />
                )}
                <div>
                  <p className="font-medium mb-2">{question.text}</p>
                  <p className="text-sm text-gray-400">
                    Your answer: {question.options[answers[index]]}
                  </p>
                  {answers[index] !== question.correctAnswer && (
                    <p className="text-sm text-green-400 mt-1">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/[0.96] p-6 rounded-lg border border-gray-800"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quiz</h2>
        <span className="text-gray-400">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div className="mb-8">
        <h3 className="text-xl mb-4">{questions[currentQuestion].text}</h3>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full p-4 text-left rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 flex items-center justify-between group"
            >
              <span>{option}</span>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
            </button>
          ))}
        </div>
      </div>

      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>
    </motion.div>
  );
}