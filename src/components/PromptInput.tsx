import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Wand2 } from "lucide-react";

interface PromptInputProps {
  onSubmit?: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const PromptInput = ({
  onSubmit = () => {},
  isLoading = false,
  placeholder = "Describe what you want to build or modify...",
}: PromptInputProps) => {
  const [prompt, setPrompt] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <div className="w-full bg-background p-4 border-b">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="min-h-[80px] resize-none"
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            variant="secondary"
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button type="button" disabled={isLoading} variant="default">
            <Wand2 className="w-4 h-4 mr-2" />
            Generate
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
