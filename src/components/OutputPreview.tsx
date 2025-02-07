import React from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";

interface OutputPreviewProps {
  generatedCode?: string;
  documentation?: string;
  executionResults?: string;
}

const OutputPreview = ({
  generatedCode = '// Generated code will appear here\nfunction example() {\n  console.log("Hello World");\n}',
  documentation = '## Code Documentation\n\nThis is a simple example function that logs "Hello World" to the console.',
  executionResults = "Hello World",
}: OutputPreviewProps) => {
  return (
    <Card className="h-full w-full bg-background border rounded-lg overflow-hidden">
      <Tabs defaultValue="code" className="w-full h-full">
        <TabsList className="w-full border-b">
          <TabsTrigger value="code">Generated Code</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="results">Execution Results</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100%-40px)] w-full">
          <TabsContent value="code" className="p-4 m-0">
            <pre className="font-mono text-sm">
              <code>{generatedCode}</code>
            </pre>
          </TabsContent>

          <TabsContent value="docs" className="p-4 m-0">
            <div className="prose prose-invert">{documentation}</div>
          </TabsContent>

          <TabsContent value="results" className="p-4 m-0">
            <pre className="font-mono text-sm bg-muted p-4 rounded-lg">
              {executionResults}
            </pre>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};

export default OutputPreview;
