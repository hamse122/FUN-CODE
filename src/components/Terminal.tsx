import { useEffect, useRef, useState } from "react";
import CommandInput from "./CommandInput";
import TerminalLine from "./TerminalLine";
import { displayPrompt, HOME, runShell } from "../lib/shell";

interface TerminalEntry {
  id: number;
  prompt?: string;
  command?: string;
  output: string[];
}

export default function Terminal() {
  const [cwd, setCwd] = useState(HOME);
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 0,
      output: [
        "╔══════════════════════════════════════╗",
        "║        HAMSE MO TERMINAL             ║",
        "║        System initialized...         ║",
        "╚══════════════════════════════════════╝",
        "",
        'Type "help" to see available commands.',
        "Try:  pwd   ls   cd projects   cat about.txt",
        "",
      ],
    },
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const prompt = displayPrompt(cwd);

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const handleCommand = (command: string) => {
    const result = runShell(command, cwd);
    const currentPrompt = displayPrompt(cwd);

    setCwd(result.cwd);

    if (result.openUrl) {
      window.open(result.openUrl, "_blank", "noopener,noreferrer");
    }

    if (result.clear) {
      setHistory([]);
      return;
    }

    setHistory((previous) => [
      ...previous,
      {
        id: Date.now(),
        prompt: currentPrompt,
        command,
        output: result.output,
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

      <div className="terminal-stage">
        <img
          className="terminal-dragon"
          src="/terminal-dragon.png"
          alt=""
          aria-hidden="true"
        />

        <div className="terminal-body" ref={terminalRef}>
          {history.map((entry) => (
            <div key={entry.id} className="terminal-entry">
              {entry.command && (
                <div className="command-history">
                  <span className="prompt">
                    {entry.prompt ?? "guest@dev:~$"}
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

          <CommandInput prompt={prompt} onCommand={handleCommand} />
        </div>
      </div>
    </div>
  );
}
