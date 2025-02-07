import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import CodeEditor from "./CodeEditor";
import AIControlPanel from "./AIControlPanel";

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
    <div className="h-full w-full bg-background">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <CodeEditor
            code={code}
            onCodeChange={onCodeChange}
            onRun={() => console.log("Run code")}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
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
    </div>
  );
};

export default IDELayout;
