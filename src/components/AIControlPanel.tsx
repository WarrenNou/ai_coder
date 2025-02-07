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
import { Sparkles, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  selectedModel = "gemini-pro",
  isLoading = false,
  generatedCode = "// Example generated code\nfunction greet() {\n  console.log('Hello from AI!');\n}",
  documentation = "## AI Generated Documentation\n\nThis is a sample documentation.",
  executionResults = "Output will appear here",
}: AIControlPanelProps) => {
  return (
    <Card className="h-full w-full glass-effect border-0">
      <motion.div
        className="p-4 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="p-1.5 rounded-full bg-primary/10"
            >
              <Cpu className="h-4 w-4 text-primary" />
            </motion.div>
            <Select value={selectedModel} onValueChange={onModelSelect}>
              <SelectTrigger className="w-[180px] bg-black/20 border-white/10">
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <motion.div
            animate={isLoading ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>
        </div>
      </motion.div>

      <PromptInput
        onSubmit={onPromptSubmit}
        isLoading={isLoading}
        placeholder="Describe what you want to build or modify..."
      />

      <Separator className="my-2 bg-white/5" />

      <AnimatePresence mode="wait">
        <motion.div
          key={generatedCode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 overflow-hidden"
        >
          <OutputPreview
            generatedCode={generatedCode}
            documentation={documentation}
            executionResults={executionResults}
          />
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default AIControlPanel;
