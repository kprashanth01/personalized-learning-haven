import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Rocket, Star, Trophy } from "lucide-react";

const Roadmap = () => {
  const milestones = [
    {
      title: "Getting Started",
      progress: 100,
      status: "Completed",
      icon: Star,
    },
    {
      title: "Basic Concepts",
      progress: 75,
      status: "In Progress",
      icon: Trophy,
    },
    {
      title: "Advanced Topics",
      progress: 30,
      status: "In Progress",
      icon: Rocket,
    },
  ];

  return (
    <div className="container mx-auto p-6 mt-20">
      <Card className="p-6 backdrop-blur-lg bg-white/10 border-white/20">
        <h1 className="text-2xl font-bold mb-6">Learning Roadmap</h1>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <milestone.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{milestone.title}</h3>
                </div>
                <Badge variant="secondary">{milestone.status}</Badge>
              </div>
              <Progress value={milestone.progress} className="h-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Roadmap;