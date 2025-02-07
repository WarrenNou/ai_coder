import React from "react";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import PromptInput from "./PromptInput";
import OutputPreview from "./OutputPreview";

interface AIControlPanelProps {
  onModelSelect?: (model: string) => void;
  onPromptSubmit?: (prompt: string) => void;
  selectedModel?: string;
  isLoading?: boolean;
  generatedCode?: string;
  documentation?: string;
  executionResults?: string;
}

const AIControlPanel = ({
  onModelSelect = () => {},
  onPromptSubmit = () => {},
  selectedModel = "gpt-4",
  isLoading = false,
  generatedCode = "// Example generated code\nfunction greet() {\n  console.log('Hello from AI!');\n}",
  documentation = "## AI Generated Documentation\n\nThis is a sample documentation.",
  executionResults = "Output will appear here",
}: AIControlPanelProps) => {
  return (
    <Card className="h-full w-full bg-background flex flex-col">
      <div className="p-4 border-b">
        <Select value={selectedModel} onValueChange={onModelSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PromptInput
        onSubmit={onPromptSubmit}
        isLoading={isLoading}
        placeholder="Describe what you want to build or modify..."
      />

      <Separator />

      <div className="flex-1 overflow-hidden">
        <OutputPreview
          generatedCode={generatedCode}
          documentation={documentation}
          executionResults={executionResults}
        />
      </div>
    </Card>
  );
};

export default AIControlPanel;
