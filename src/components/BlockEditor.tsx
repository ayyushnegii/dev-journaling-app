import { BlockNoteEditor } from "@blocknote/core";
import type { PartialBlock, Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "./ThemeContext";

interface BlockEditorProps {
  initialContent?: string;
  onChange: (content: Block[]) => void;
  editable?: boolean;
}

export default function BlockEditor({ initialContent, onChange, editable = true }: BlockEditorProps) {
  const { theme } = useTheme();
  
  const parseInitialContent = (content?: string): PartialBlock[] | undefined => {
    if (!content) return undefined;
    try {
      return JSON.parse(content) as PartialBlock[];
    } catch (e) {
      console.error("Failed to parse initial content:", e);
      return undefined;
    }
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: parseInitialContent(initialContent),
  });

  return (
    <div className="w-full rounded-2xl overflow-hidden transition-all">
      <BlockNoteView
        editor={editor}
        theme={theme}
        editable={editable}
        onChange={() => {
          onChange(editor.document);
        }}
        className="min-h-[500px]"
      />
    </div>
  );
}
