import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "When learning something new, I prefer to:",
    options: [
      { value: "visual", label: "See diagrams and visual demonstrations" },
      { value: "auditory", label: "Listen to explanations and discussions" },
      { value: "kinesthetic", label: "Try it out hands-on and practice" },
    ],
  },
  {
    id: 2,
    text: "I remember information best when:",
    options: [
      { value: "visual", label: "I see it written or in pictures" },
      { value: "auditory", label: "I hear it explained" },
      { value: "kinesthetic", label: "I physically interact with it" },
    ],
  },
  {
    id: 3,
    text: "When solving problems, I tend to:",
    options: [
      { value: "visual", label: "Visualize the solution in my mind" },
      { value: "auditory", label: "Talk through the steps" },
      { value: "kinesthetic", label: "Use objects or movement to work it out" },
    ],
  },
];

const LearningStyleQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate learning style
      const styles = answers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const dominantStyle = Object.entries(styles).reduce((a, b) => 
        (a[1] > b[1] ? a : b)
      )[0];

      toast({
        title: "Quiz Complete!",
        description: `Your dominant learning style is: ${dominantStyle.charAt(0).toUpperCase() + dominantStyle.slice(1)}`,
      });

      navigate("/");
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Learning Style Quiz</h1>
        <div className="space-y-6">
          <div className="text-lg mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <h2 className="text-xl mb-4">{question.text}</h2>
          <RadioGroup className="space-y-4">
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  onClick={() => handleAnswer(option.value)}
                />
                <Label htmlFor={option.value} className="text-base">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </Card>
    </div>
  );
};

export default LearningStyleQuiz;