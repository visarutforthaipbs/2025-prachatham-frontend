"use client";

interface HighlightProps {
  text: string;
  query: string;
  className?: string;
}

export function Highlight({ text, query, className = "" }: HighlightProps) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const normalizedQuery = query.trim().toLowerCase();
  const parts: Array<{ text: string; match: boolean }> = [];

  let remaining = text;
  let index = remaining.toLowerCase().indexOf(normalizedQuery);

  while (index !== -1) {
    if (index > 0) {
      parts.push({ text: remaining.slice(0, index), match: false });
    }
    parts.push({
      text: remaining.slice(index, index + normalizedQuery.length),
      match: true,
    });
    remaining = remaining.slice(index + normalizedQuery.length);
    index = remaining.toLowerCase().indexOf(normalizedQuery);
  }

  if (remaining.length > 0) {
    parts.push({ text: remaining, match: false });
  }

  return (
    <>
      {parts.map((part, i) =>
        part.match ? (
          <mark
            key={i}
            className={`bg-yellow-200 text-inherit rounded px-0.5 ${className}`}
          >
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}
