import React from "react";
import { generateCode } from "../lib/api";
import TopBar from "./TopBar";
import IDELayout from "./IDELayout";

interface HomeProps {
  initialCode?: string;
  projectName?: string;
}

const Home = ({
  initialCode = '// Welcome to the AI Code Generation Platform\n// Start by writing your code here or use the AI assistant\n\nfunction greet() {\n  console.log("Hello, Developer!");\n}',
  projectName = "AI Code Generation Platform",
}: HomeProps) => {
  const [code, setCode] = React.useState(initialCode);
  const [generatedCode, setGeneratedCode] = React.useState("");
  const [documentation, setDocumentation] = React.useState("");
  const [executionResults, setExecutionResults] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await generateCode(prompt);
      setGeneratedCode(response.generatedCode);
      setDocumentation(response.documentation);
      setExecutionResults(response.executionResults);
    } catch (error) {
      console.error("Error:", error);
      setExecutionResults("Failed to generate code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelSelect = (model: string) => {
    console.log("Selected model:", model);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <TopBar
        projectName={projectName}
        onSettingsClick={() => console.log("Settings clicked")}
        onHelpClick={() => console.log("Help clicked")}
        onGithubClick={() => console.log("Github clicked")}
      />
      <div className="flex-1 overflow-hidden">
        <IDELayout
          code={code}
          onCodeChange={handleCodeChange}
          onPromptSubmit={handlePromptSubmit}
          onModelSelect={handleModelSelect}
          generatedCode={generatedCode}
          documentation={documentation}
          executionResults={executionResults}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Home;
