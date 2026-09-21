import { useEffect, useRef, useState } from "react";
import CommandInput from "./CommandInput";
import TerminalLine from "./TerminalLine";
import { commandResponses } from "../data/commands";

interface TerminalEntry {
  id: number;
  command?: string;
  output: string[];
}

export default function Terminal() {
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 0,
      output: [
        "╔══════════════════════════════════════╗",
        "║        HAMSE DEV TERMINAL            ║",
        "║        System initialized...         ║",
        "╚══════════════════════════════════════╝",
        "",
        'Type "help" to see available commands.',
        "",
      ],
    },
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const handleCommand = (command: string) => {
    const normalizedCommand = command.toLowerCase();

    if (normalizedCommand === "clear") {
      setHistory([]);
      return;
    }

    if (normalizedCommand === "date") {
      setHistory((previous) => [
        ...previous,
        {
          id: Date.now(),
          command,
          output: [new Date().toLocaleDateString()],
        },
      ]);

      return;
    }

    if (normalizedCommand === "time") {
      setHistory((previous) => [
        ...previous,
        {
          id: Date.now(),
          command,
          output: [new Date().toLocaleTimeString()],
        },
      ]);

      return;
    }

    if (normalizedCommand === "github") {
      setHistory((previous) => [
        ...previous,
        {
          id: Date.now(),
          command,
          output: ["Opening GitHub..."],
        },
      ]);

      window.open(
        "https://github.com/hamse122",
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }

    const response = commandResponses[normalizedCommand];

    setHistory((previous) => [
      ...previous,
      {
        id: Date.now(),
        command,
        output: response ?? [
          `Command not found: ${command}`,
          'Type "help" to see available commands.',
        ],
      },
    ]);
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="window-buttons">
          <span className="close" />
          <span className="minimize" />
          <span className="maximize" />
        </div>

        <span className="terminal-title">
          hamse@dev — terminal
        </span>

        <span className="terminal-status">
          ● ONLINE
        </span>
      </div>

      <div className="terminal-body" ref={terminalRef}>
        {history.map((entry) => (
          <div key={entry.id} className="terminal-entry">
            {entry.command && (
              <div className="command-history">
                <span className="prompt">
                  guest@dev:~$
                </span>{" "}
                {entry.command}
              </div>
            )}

            {entry.output.map((line, index) => (
              <TerminalLine
                key={`${entry.id}-${index}`}
                text={line}
              />
            ))}
          </div>
        ))}

        <CommandInput onCommand={handleCommand} />
      </div>
    </div>
  );
}