import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Copy, Download, Play } from "lucide-react";

interface CodeEditorProps {
  code?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onRun?: () => void;
}

const CodeEditor = ({
  code = '// Write your code here\nfunction example() {\n  console.log("Hello World");\n}',
  language = "javascript",
  onCodeChange = () => {},
  onRun = () => {},
}: CodeEditorProps) => {
  return (
    <Card className="h-full w-full bg-background border rounded-lg overflow-hidden flex flex-col">
      <Tabs defaultValue="editor" className="flex-1 flex flex-col">
        <div className="border-b p-2 flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="default" size="sm" onClick={onRun}>
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-grow">
          <TabsContent value="editor" className="h-full">
            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
                className="w-full h-[800px] font-mono text-sm bg-background resize-none focus:outline-none"
                spellCheck="false"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-full">
            <div className="p-4">
              <pre className="font-mono text-sm">
                <code>{code}</code>
              </pre>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};

export default CodeEditor;
