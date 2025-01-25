import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useToast } from "./ui/use-toast";

const genAI = new GoogleGenerativeAI("AIzaSyAZmTdvQQ2lK-CXY2FhpUxGDM3nCqjYmiE");

const ChatWithAI = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <Card className="p-6 backdrop-blur-lg bg-white/10 border-white/20">
        <h1 className="text-2xl font-bold mb-6">Chat with AI</h1>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-white/5 border-white/20"
          />
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Generating..." : "Send"}
          </Button>
          {response && (
            <Card className="p-4 mt-4 bg-white/5 border-white/20">
              <pre className="whitespace-pre-wrap">{response}</pre>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChatWithAI;