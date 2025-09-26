import  { useRef, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline } from "lucide-react";

// Instead of textarea with markers, we’ll use a contentEditable div

export default function ShadcnTextEditor() {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string[]>([]);

  function applyCommand(command: string) {
    document.execCommand(command, false, "");
  }

  function onToggleChange(newVal: string[] | null) {
    const newActive = newVal ?? [];
    const added = newActive.filter((x) => !active.includes(x));

    added.forEach((k) => {
      if (k === "bold") applyCommand("bold");
      if (k === "italic") applyCommand("italic");
      if (k === "underline") applyCommand("underline");
    });

    setActive(newActive);
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Shadcn Rich Text Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <ToggleGroup.Root
            type="multiple"
            className="inline-flex rounded-md bg-muted p-1"
            value={active}
            onValueChange={onToggleChange}
            aria-label="text formatting"
          >
            <ToggleGroup.Item
              value="bold"
              className="inline-flex items-center justify-center px-3 py-2 rounded-md hover:bg-muted/60"
              aria-label="bold"
            >
              <Bold className="w-4 h-4" />
            </ToggleGroup.Item>

            <ToggleGroup.Item
              value="italic"
              className="inline-flex items-center justify-center px-3 py-2 rounded-md hover:bg-muted/60"
              aria-label="italic"
            >
              <Italic className="w-4 h-4" />
            </ToggleGroup.Item>

            <ToggleGroup.Item
              value="underline"
              className="inline-flex items-center justify-center px-3 py-2 rounded-md hover:bg-muted/60"
              aria-label="underline"
            >
              <Underline className="w-4 h-4" />
            </ToggleGroup.Item>
          </ToggleGroup.Root>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (editorRef.current) editorRef.current.innerHTML = "";
              setActive([]);
            }}
          >
            Clear
          </Button>
        </div>

        <div
          ref={editorRef}
          contentEditable
          className="min-h-[200px] w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <div className="mt-3 text-sm text-muted-foreground">
          This editor applies real bold, italic, and underline styles instead of inserting markers.
        </div>
      </CardContent>
    </Card>
  );
}
