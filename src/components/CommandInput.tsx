import { useState, KeyboardEvent } from "react";

interface CommandInputProps {
  onCommand: (command: string) => void;
}

export default function CommandInput({
  onCommand,
}: CommandInputProps) {
  const [value, setValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const command = value.trim();

      if (command) {
        onCommand(command);
      }

      setValue("");
    }
  };

  return (
    <div className="command-input">
      <span className="prompt">guest@dev:~$</span>

      <input
        autoFocus
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
        aria-label="Terminal command"
      />
    </div>
  );
}