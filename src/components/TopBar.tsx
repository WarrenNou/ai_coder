import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Settings, HelpCircle, Github, Code2, Sparkles } from "lucide-react";

interface TopBarProps {
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onGithubClick?: () => void;
  projectName?: string;
}

const TopBar = ({
  onSettingsClick = () => {},
  onHelpClick = () => {},
  onGithubClick = () => {},
  projectName = "AI Code Generation Platform",
}: TopBarProps) => {
  return (
    <div className="w-full h-[60px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {projectName}
          </h1>
        </div>
        <div className="h-4 w-[1px] bg-border" />
        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-muted-foreground">
            Powered by Gemini Pro
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onGithubClick}
          className="hover:bg-accent"
        >
          <Github className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onHelpClick}
          className="hover:bg-accent"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Keyboard Shortcuts
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Theme
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
