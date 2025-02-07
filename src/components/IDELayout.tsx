import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import CodeEditor from "./CodeEditor";
import AIControlPanel from "./AIControlPanel";
import { motion } from "framer-motion";

interface IDELayoutProps {
  onCodeChange?: (code: string) => void;
  onPromptSubmit?: (prompt: string) => void;
  onModelSelect?: (model: string) => void;
  code?: string;
  generatedCode?: string;
  documentation?: string;
  executionResults?: string;
  isLoading?: boolean;
}

const IDELayout = ({
  onCodeChange = () => {},
  onPromptSubmit = () => {},
  onModelSelect = () => {},
  code = '// Write your code here\nfunction example() {\n  console.log("Hello World");\n}',
  generatedCode = "// Generated code will appear here",
  documentation = "## Documentation will appear here",
  executionResults = "Execution results will appear here",
  isLoading = false,
}: IDELayoutProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-[calc(100vh-8rem)] w-full rounded-xl overflow-hidden glass-panel glow-subtle"
    >
      <ResizablePanelGroup direction="horizontal" className="h-full rounded-xl">
        <ResizablePanel
          defaultSize={50}
          minSize={30}
          className="transition-all duration-200"
        >
          <CodeEditor
            code={code}
            onCodeChange={onCodeChange}
            onRun={() => console.log("Run code")}
          />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-white/5 hover:bg-primary/20 transition-colors" />

        <ResizablePanel
          defaultSize={50}
          minSize={30}
          className="transition-all duration-200"
        >
          <AIControlPanel
            onPromptSubmit={onPromptSubmit}
            onModelSelect={onModelSelect}
            isLoading={isLoading}
            generatedCode={generatedCode}
            documentation={documentation}
            executionResults={executionResults}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </motion.div>
  );
};

export default IDELayout;
