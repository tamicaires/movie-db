interface HighlightTextProps {
  text: string;
  highlight?: string;
  className?: string;
}

export const HighlightText = ({ text, highlight, className = '' }: HighlightTextProps) => {
  if (!highlight?.trim()) {
    return <span className={className}>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={index} className="bg-primary/30 text-foreground font-semibold">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};
