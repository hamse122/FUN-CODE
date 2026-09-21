import { commandResponses } from "../data/commands";
import {
  HOME,
  displayPrompt,
  findLiveProject,
  getNode,
  listNames,
  liveProjects,
  resolvePath,
  type FsDir,
} from "./filesystem";

export type ShellResult = {
  cwd: string;
  output: string[];
  openUrl?: string;
  clear?: boolean;
};

function tokenize(input: string) {
  return input.trim().split(/\s+/).filter(Boolean);
}

function lsOutput(dir: FsDir, long: boolean, showHidden: boolean) {
  const names = listNames(dir);
  const rows: string[] = [];

  if (showHidden) {
    names.unshift("..");
    names.unshift(".");
  }

  if (names.length === 0) return [""];

  if (!long) {
    return names.map((name) => {
      if (name === "." || name === "..") return name;
      return dir.children[name]?.type === "dir" ? name + "/" : name;
    });
  }

  for (const name of names) {
    if (name === "." || name === "..") {
      rows.push("drwxr-xr-x  guest  " + name);
      continue;
    }

    const node = dir.children[name];
    const prefix = node.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
    const label = node.type === "dir" ? name + "/" : name;
    rows.push(`${prefix}  guest  ${label}`);
  }

  return rows;
}

function launchLiveProject(query: string, cwd: string): ShellResult | null {
  const project = findLiveProject(query);

  if (!project) return null;

  if (project.url) {
    return {
      cwd,
      output: [
        `Running ${project.title}...`,
        "Status : LIVE",
        `URL    : ${project.url}`,
        "",
        "Process started. Opening in a new tab.",
      ],
      openUrl: project.url,
    };
  }

  return {
    cwd,
    output: [
      `Running ${project.title}...`,
      "Status : LIVE",
      "",
      `[${project.title}]  local process started.`,
      "No public URL is attached to this project.",
    ],
  };
}

export function runShell(rawCommand: string, cwd: string): ShellResult {
  const tokens = tokenize(rawCommand);

  if (tokens.length === 0) {
    return { cwd, output: [] };
  }

  const [command, ...args] = tokens;
  const cmd = command.toLowerCase();

  if (cmd === "clear") {
    return { cwd, output: [], clear: true };
  }

  if (cmd === "pwd") {
    return { cwd, output: [cwd] };
  }

  if (cmd === "whoami") {
    return { cwd, output: ["guest"] };
  }

  if (cmd === "echo") {
    return { cwd, output: [args.join(" ")] };
  }

  if (cmd === "cd") {
    const target = args[0] ?? "~";
    const nextPath = resolvePath(cwd, target);
    const node = getNode(nextPath);

    if (!node) {
      return {
        cwd,
        output: [`bash: cd: ${target}: No such file or directory`],
      };
    }

    if (node.type !== "dir") {
      return {
        cwd,
        output: [`bash: cd: ${target}: Not a directory`],
      };
    }

    return { cwd: nextPath, output: [] };
  }

  if (cmd === "ls") {
    const flags = args.filter((arg) => arg.startsWith("-")).join("");
    const pathArg = args.find((arg) => !arg.startsWith("-")) ?? ".";
    const targetPath = resolvePath(cwd, pathArg);
    const node = getNode(targetPath);

    if (!node) {
      return {
        cwd,
        output: [`ls: cannot access '${pathArg}': No such file or directory`],
      };
    }

    if (node.type === "file") {
      return { cwd, output: [pathArg.split("/").pop() ?? pathArg] };
    }

    return {
      cwd,
      output: lsOutput(node, flags.includes("l"), flags.includes("a")),
    };
  }

  if (cmd === "cat") {
    if (args.length === 0) {
      return { cwd, output: ["cat: missing file operand"] };
    }

    const lines: string[] = [];

    for (const arg of args) {
      const targetPath = resolvePath(cwd, arg);
      const node = getNode(targetPath);

      if (!node) {
        lines.push(`cat: ${arg}: No such file or directory`);
        continue;
      }

      if (node.type === "dir") {
        lines.push(`cat: ${arg}: Is a directory`);
        continue;
      }

      lines.push(...node.content);
    }

    return { cwd, output: lines };
  }

  if (cmd === "run") {
    const query = args.join(" ");

    if (!query) {
      return {
        cwd,
        output: [
          "Usage: run <project>",
          "",
          "Live projects:",
          ...liveProjects.map(
            (project) =>
              `  ${project.id.padEnd(18)} ${project.title}${
                project.url ? "  [url]" : ""
              }`
          ),
        ],
      };
    }

    return (
      launchLiveProject(query, cwd) ?? {
        cwd,
        output: [`run: '${query}' is not a live project`],
      }
    );
  }

  if (cmd === "open") {
    const arg = args[0];

    if (!arg) {
      return { cwd, output: ["open: missing file operand"] };
    }

    const targetPath = resolvePath(cwd, arg);
    const node = getNode(targetPath);

    if (!node) {
      return {
        cwd,
        output: [`open: ${arg}: No such file or directory`],
      };
    }

    if (node.type === "dir") {
      return { cwd, output: [`open: ${arg}: Is a directory`] };
    }

    if (!node.url) {
      return {
        cwd,
        output: [
          `open: ${arg}: this file has no URL`,
          "Use cat to read it instead.",
        ],
      };
    }

    return {
      cwd,
      output: [`Opening ${node.url}`],
      openUrl: node.url,
    };
  }

  if (cmd === "date") {
    return { cwd, output: [new Date().toLocaleDateString()] };
  }

  if (cmd === "time") {
    return { cwd, output: [new Date().toLocaleTimeString()] };
  }

  if (cmd === "github") {
    return {
      cwd,
      output: ["Opening GitHub..."],
      openUrl: "https://github.com/hamse122",
    };
  }

  if (cmd === "linkedin") {
    return {
      cwd,
      output: ["Opening LinkedIn..."],
      openUrl: "https://www.linkedin.com/in/hamse-mo",
    };
  }

  if (cmd === "whatsapp" || cmd === "wa") {
    return {
      cwd,
      output: ["Opening WhatsApp... +252 63 3033254"],
      openUrl: "https://wa.me/252633033254",
    };
  }

  if (cmd === "help") {
    return { cwd, output: commandResponses.help };
  }

  const shortcut = commandResponses[cmd];
  if (shortcut) {
    return { cwd, output: shortcut };
  }

  const typedProject = launchLiveProject(rawCommand, cwd);
  if (typedProject) {
    return typedProject;
  }

  const localFile = getNode(resolvePath(cwd, rawCommand));
  if (localFile?.type === "file") {
    const fromFile = launchLiveProject(rawCommand, cwd);
    if (fromFile) return fromFile;

    if (localFile.url) {
      return {
        cwd,
        output: [`Opening ${localFile.url}`],
        openUrl: localFile.url,
      };
    }
  }

  return {
    cwd,
    output: [
      `bash: ${command}: command not found`,
      'Type "help" to see available commands.',
    ],
  };
}

export { displayPrompt, HOME };
