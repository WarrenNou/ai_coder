import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Settings, HelpCircle, Github } from "lucide-react";

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
    <div className="w-full h-[60px] bg-background border-b px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold">{projectName}</h1>
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
            <DropdownMenuItem>Theme</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
