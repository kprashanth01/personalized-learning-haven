import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Brain, Star, Trophy } from "lucide-react";

const Profile = () => {
  return (
    <div className="container mx-auto p-6 mt-20">
      <Card className="p-6 backdrop-blur-lg bg-white/10 border-white/20">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-500">Visual Learner</p>
          </div>
        </div>
        
        <div className="grid gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Progress Overview</h2>
            <Progress value={65} className="h-2" />
            <p className="text-sm text-gray-500 mt-1">65% Complete</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Achievements</h2>
            <div className="flex gap-2">
              <Badge className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                Quick Learner
              </Badge>
              <Badge className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                Problem Solver
              </Badge>
              <Badge className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                Top Performer
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;