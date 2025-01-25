import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  MessageSquare, 
  Upload, 
  Rocket, 
  User,
  Home
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            PLC
          </Link>
          
          <div className="flex space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                AI Chat
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/image-analysis" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Image Analysis
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/roadmap" className="flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Roadmap
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;