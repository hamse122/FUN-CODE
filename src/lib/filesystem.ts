export type FsFile = {
  type: "file";
  content: string[];
  url?: string;
};

export type FsDir = {
  type: "dir";
  children: Record<string, FsNode>;
};

export type FsNode = FsFile | FsDir;

export const HOME = "/home/guest";

function file(content: string[], url?: string): FsFile {
  return { type: "file", content, url };
}

function dir(children: Record<string, FsNode>): FsDir {
  return { type: "dir", children };
}

export const filesystem: FsDir = dir({
  home: dir({
    guest: dir({
      "readme.txt": file([
        "Welcome to Hamse Mo's terminal.",
        "",
        "This home directory works like Linux.",
        "",
        "  pwd              print working directory",
        "  ls               list files",
        "  ls projects      list a folder",
        "  cd projects      enter a folder",
        "  cd ..            go up one folder",
        "  cat about.txt    read a file",
        "  open hadrawitrading.txt",
        "",
        "Start with:  ls",
      ]),
      "about.txt": file([
        "Name     : Hamse Mo",
        "Role     : Full-Stack Developer",
        "Focus    : Web & Mobile Applications",
        "Stack    : React • Flutter • Django",
        "Projects : 56 (public, personal, private, local, apps)",
        "Status   : Building something awesome",
      ]),
      "skills.txt": file([
        "Frontend   → React, TypeScript, Tailwind",
        "Backend    → Django, DRF, Flask",
        "Mobile     → Flutter, Dart",
        "Database   → PostgreSQL, MongoDB",
        "Tools      → Git, GitHub, Vite",
      ]),
      "contact.txt": file([
        "GitHub    → github.com/hamse122",
        "LinkedIn  → linkedin.com/in/hamse-mo",
        "WhatsApp  → +252 63 3033254",
        "",
        "Tip: type  open contact.txt  or  whatsapp",
      ]),
      projects: dir({
        "readme.txt": file([
          "PROJECTS  ·  56 TOTAL",
          "",
          "Public     : 8",
          "Personal   : 28",
          "Private    : 9",
          "Mobile apps: 6",
          "Local      : 5",
          "",
          "Folders:",
          "  public/    personal/    private/    apps/    local/",
        ]),
        public: dir({
          "hadrawitrading.txt": file(
            [
              "Hadraawi Trading Establishment",
              "Type   : PUBLIC",
              "Status : LIVE",
              "URL    : https://hadrawitrading.com/",
            ],
            "https://hadrawitrading.com/"
          ),
          "mahdihospital.txt": file(
            [
              "Mahdi Hospital",
              "Type   : PUBLIC",
              "Status : LIVE",
              "URL    : https://mahdihospital.com/",
            ],
            "https://mahdihospital.com/"
          ),
          "vip-game.txt": file(["VIP Game", "Type : PUBLIC"]),
          "maax-gym.txt": file(["Maax Gym", "Type : PUBLIC"]),
          "soltelco-lms.txt": file(["Soltelco LMS", "Type : PUBLIC"]),
          "danjire-store.txt": file(["Danjire Store", "Type : PUBLIC"]),
          "agri-market.txt": file(["Agri Market", "Type : PUBLIC"]),
          "dalal-pharmacy.txt": file([
            "Dalal Pharmacy Management",
            "Type : PUBLIC",
          ]),
        }),
        personal: dir({
          "readme.txt": file([
            "PERSONAL PROJECTS  ·  28",
            "",
            "Featured files in this folder.",
            "The rest are local / unpublished personal builds.",
          ]),
          "saas-project.txt": file(["SaaS Project", "Type : PERSONAL"]),
          "gta-vi.txt": file(["GTA VI", "Type : PERSONAL"]),
          "fresh-fold-laundry.txt": file([
            "Fresh Fold Laundry",
            "Type : PERSONAL",
          ]),
          "ipr-ngo.txt": file(["IPR NGO", "Type : PERSONAL"]),
          "escape-road.txt": file(["Escape Road", "Type : PERSONAL"]),
          "ehr.txt": file(["EHR", "Type : PERSONAL"]),
        }),
        private: dir({
          "readme.txt": file([
            "PRIVATE PROJECTS  ·  9",
            "",
            "Client / confidential work.",
            "Details are not listed in this terminal.",
          ]),
        }),
        apps: dir({
          "readme.txt": file([
            "MOBILE APPS  ·  6",
            "Stack : Flutter",
          ]),
          "app-01.txt": file(["Mobile App 01", "Type : APP", "Stack : Flutter"]),
          "app-02.txt": file(["Mobile App 02", "Type : APP", "Stack : Flutter"]),
          "app-03.txt": file(["Mobile App 03", "Type : APP", "Stack : Flutter"]),
          "app-04.txt": file(["Mobile App 04", "Type : APP", "Stack : Flutter"]),
          "app-05.txt": file(["Mobile App 05", "Type : APP", "Stack : Flutter"]),
          "app-06.txt": file(["Mobile App 06", "Type : APP", "Stack : Flutter"]),
        }),
        local: dir({
          "readme.txt": file([
            "LOCAL PROJECTS  ·  5",
            "",
            "Machine-only / unpublished local work.",
            "Included in the 56 total.",
          ]),
        }),
      }),
    }),
  }),
});

function splitPath(path: string) {
  return path.split("/").filter(Boolean);
}

export function normalizePath(path: string) {
  const parts: string[] = [];

  for (const part of splitPath(path)) {
    if (part === ".") continue;
    if (part === "..") {
      parts.pop();
      continue;
    }
    parts.push(part);
  }

  return "/" + parts.join("/");
}

export function resolvePath(cwd: string, input = "") {
  const target = input.trim();

  if (!target || target === ".") return normalizePath(cwd);
  if (target === "~") return HOME;
  if (target.startsWith("~/")) return normalizePath(HOME + target.slice(1));
  if (target.startsWith("/")) return normalizePath(target);

  return normalizePath(cwd + "/" + target);
}

export function getNode(path: string): FsNode | null {
  const parts = splitPath(normalizePath(path));
  let current: FsNode = filesystem;

  for (const part of parts) {
    if (current.type !== "dir") return null;
    const next: FsNode | undefined = current.children[part];
    if (!next) return null;
    current = next;
  }

  return current;
}

export type LiveProject = {
  id: string;
  title: string;
  aliases: string[];
  url?: string;
};

export const liveProjects: LiveProject[] = [
  {
    id: "hadrawitrading",
    title: "Hadraawi Trading",
    aliases: ["hadraawi", "hadraawi-trading", "hadrawitrading.txt"],
    url: "https://hadrawitrading.com/",
  },
  {
    id: "mahdihospital",
    title: "Mahdi Hospital",
    aliases: ["mahdi", "mahdi-hospital", "mahdihospital.txt"],
    url: "https://mahdihospital.com/",
  },
  {
    id: "vip-game",
    title: "VIP Game",
    aliases: ["vip", "vipgame", "vip-game.txt"],
  },
  {
    id: "maax-gym",
    title: "Maax Gym",
    aliases: ["maax", "maaxgym", "maax-gym.txt"],
  },
  {
    id: "soltelco-lms",
    title: "Soltelco LMS",
    aliases: ["soltelco", "soltelco-lms.txt", "lms"],
  },
  {
    id: "danjire-store",
    title: "Danjire Store",
    aliases: ["danjire", "danjire-store.txt"],
  },
  {
    id: "agri-market",
    title: "Agri Market",
    aliases: ["agri", "agrimarket", "agri-market.txt"],
  },
  {
    id: "dalal-pharmacy",
    title: "Dalal Pharmacy Management",
    aliases: ["dalal", "dalal-pharmacy.txt", "pharmacy"],
  },
];

export function normalizeKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^\.\//, "")
    .replace(/\.txt$/, "")
    .replace(/[\s_]+/g, "-");
}

export function findLiveProject(query: string) {
  const key = normalizeKey(query);

  return (
    liveProjects.find(
      (project) =>
        project.id === key ||
        normalizeKey(project.title) === key ||
        project.aliases.some((alias) => normalizeKey(alias) === key)
    ) ?? null
  );
}

export function formatPromptPath(cwd: string) {
  if (cwd === HOME) return "~";
  if (cwd.startsWith(HOME + "/")) return "~" + cwd.slice(HOME.length);
  return cwd;
}

export function displayPrompt(cwd: string) {
  return `guest@dev:${formatPromptPath(cwd)}$`;
}

export function listNames(node: FsDir) {
  return Object.keys(node.children).sort((a, b) => {
    const aDir = node.children[a].type === "dir";
    const bDir = node.children[b].type === "dir";
    if (aDir !== bDir) return aDir ? -1 : 1;
    return a.localeCompare(b);
  });
}
