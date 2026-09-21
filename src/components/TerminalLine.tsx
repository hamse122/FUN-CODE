interface TerminalLineProps {
  text: string;
}

export default function TerminalLine({ text }: TerminalLineProps) {
  return (
    <div className="terminal-line">
      {text || "\u00A0"}
    </div>
  );
}