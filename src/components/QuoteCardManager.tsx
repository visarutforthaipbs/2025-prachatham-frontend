"use client";

import { useState } from "react";
import SelectionQuoteTrigger from "./SelectionQuoteTrigger";
import QuoteShareModal from "./QuoteShareModal";

interface QuoteCardManagerProps {
  attribution: {
    title: string;
    author?: string;
    date?: string;
  };
}

export default function QuoteCardManager({ attribution }: QuoteCardManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <>
      {/* Floating selection tooltip trigger */}
      <SelectionQuoteTrigger 
        containerSelector=".wordpress-content"
        onTrigger={(selectedText) => {
          setText(selectedText);
          setIsOpen(true);
        }}
      />

      {/* Sharing modal with Canvas renderer */}
      <QuoteShareModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        text={text}
        attribution={attribution}
      />
    </>
  );
}
