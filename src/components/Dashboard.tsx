import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Trophy,
  Brain,
  BookOpen,
  BarChart3,
  Star
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const progress = 65;
  const badges = [
    { name: "Quick Learner", icon: Brain },
    { name: "Knowledge Seeker", icon: BookOpen },
    { name: "Star Student", icon: Star },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
        <Button onClick={() => navigate("/quiz")} className="bg-primary hover:bg-primary/90">
          Take Learning Style Quiz
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-2xl font-semibold">Overall Progress</h2>
              <p className="text-muted-foreground">Keep going, you're doing great!</p>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="mt-2 text-sm text-muted-foreground">{progress}% Complete</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-2xl font-semibold">Recent Activity</h2>
              <p className="text-muted-foreground">Your learning journey</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Mathematics</span>
              <Progress value={80} className="w-1/2 h-2" />
            </div>
            <div className="flex justify-between items-center">
              <span>Science</span>
              <Progress value={60} className="w-1/2 h-2" />
            </div>
            <div className="flex justify-between items-center">
              <span>History</span>
              <Progress value={45} className="w-1/2 h-2" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
        <div className="flex gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <Badge
                key={badge.name}
                className="p-3 flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <Icon className="w-4 h-4" />
                {badge.name}
              </Badge>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;