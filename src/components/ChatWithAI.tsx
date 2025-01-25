import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useToast } from "./ui/use-toast";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI("AIzaSyAZmTdvQQ2lK-CXY2FhpUxGDM3nCqjYmiE");

interface Message {
  role: "user" | "ai";
  content: string;
}

const ChatWithAI = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
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

    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const aiMessage: Message = {
        role: "ai",
        content: result.response.text(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setPrompt("");
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
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="glass-card min-h-[85vh] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-white/60 mt-8">
              <h3 className="text-lg font-semibold mb-2">
                How can I assist you today?
              </h3>
              <p className="text-sm">
                Ask me anything! I'm here to help with your questions.
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "glass-card"
                }`}
              >
                {message.role === "ai" ? (
                  <ReactMarkdown className="prose prose-invert">
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/20">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Textarea
              placeholder="Send a message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="glass-input min-h-[60px] max-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="shrink-0"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatWithAI;