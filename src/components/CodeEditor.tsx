import React from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Copy, Download, Play, Code2 } from "lucide-react";

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
    <Card className="h-full w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg overflow-hidden flex flex-col shadow-lg">
      <Tabs defaultValue="editor" className="flex-1 flex flex-col">
        <div className="border-b p-2 flex justify-between items-center bg-muted/50">
          <div className="flex items-center space-x-2">
            <Code2 className="h-5 w-5 text-primary" />
            <TabsList className="bg-background/50">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-background/80"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-background/80"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onRun}
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-grow">
          <TabsContent value="editor" className="h-full m-0">
            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
                className="w-full h-[800px] font-mono text-sm bg-background/50 resize-none focus:outline-none p-4 rounded-md"
                spellCheck="false"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="h-full m-0">
            <div className="p-4">
              <pre className="font-mono text-sm bg-muted p-4 rounded-lg">
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
