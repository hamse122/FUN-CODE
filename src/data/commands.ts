export type CommandResult = {
  command: string;
  output: string[];
};

export const commandResponses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "",
    "  about      → About the developer",
    "  skills     → View technical skills",
    "  projects   → View projects",
    "  github     → Open GitHub",
    "  contact    → Contact information",
    "  date       → Current date",
    "  time       → Current time",
    "  clear      → Clear terminal",
    "",
    "Try typing a command 👀",
  ],

  about: [
    "╭────────────────────────────────────╮",
    "│  DEVELOPER PROFILE                 │",
    "╰────────────────────────────────────╯",
    "",
    "Name     : Hamse Mo",
    "Role     : Full-Stack Developer",
    "Focus    : Web & Mobile Applications",
    "Stack    : React • Flutter • Django",
    "Status   : Building something awesome 🚀",
  ],

  skills: [
    "TECHNICAL SKILLS",
    "────────────────────────",
    "",
    "Frontend   → React, TypeScript, Tailwind",
    "Backend    → Django, DRF, Flask",
    "Mobile     → Flutter, Dart",
    "Database   → PostgreSQL, MongoDB",
    "Tools      → Git, GitHub, Vite",
  ],

  projects: [
    "PROJECTS",
    "────────────────────────",
    "",
    "01. Zentry",
    "    Interactive gaming website",
    "",
    "02. Hoysame",
    "    Web platform",
    "",
    "03. Delta Petroleum",
    "    Business management system",
    "",
    "04. Discountly",
    "    Flutter + Django application",
  ],

  contact: [
    "CONTACT",
    "────────────────────────",
    "",
    "GitHub   → github.com/hamse122",
    "YouTube  → @hamsecodes",
    "LinkedIn → /in/hamse-mo/",
  ],

  github: [
    "Opening GitHub...",
  ],
};