import React from "react";
import { generateCode } from "../lib/api";
import TopBar from "./TopBar";
import IDELayout from "./IDELayout";
import { motion } from "framer-motion";

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
    <div className="min-h-screen w-full bg-gradient-to-b from-background via-background/95 to-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <TopBar
          projectName={projectName}
          onSettingsClick={() => console.log("Settings clicked")}
          onHelpClick={() => console.log("Help clicked")}
          onGithubClick={() => console.log("Github clicked")}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="container mx-auto px-4 py-6"
        >
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
        </motion.div>
      </motion.div>

      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-primary/2 to-background" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
    </div>
  );
};

export default Home;
