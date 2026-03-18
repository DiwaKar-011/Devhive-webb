import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

type ProjectRecord = {
  id: string;
  name: string;
  branch: string;
  year: string;
  projectName: string;
  projectLink: string;
  githubLink: string;
  submittedAt: string;
};

type ProjectPayload = {
  name?: string;
  branch?: string;
  year?: string;
  projectName?: string;
  projectLink?: string;
  githubLink?: string;
};

const dataFilePath = path.join(process.cwd(), "data", "projects.json");

const memberAccessHeader = "x-project-member-key";

const getAllowedMemberKeys = () => {
  const rawValue = (process.env.PROJECTS_MEMBER_KEYS || "").trim();

  const normalizedValue =
    (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
    (rawValue.startsWith("'") && rawValue.endsWith("'"))
      ? rawValue.slice(1, -1).trim()
      : rawValue;

  if (!normalizedValue) {
    return [];
  }

  if (normalizedValue.startsWith("[")) {
    try {
      const parsed = JSON.parse(normalizedValue) as unknown;

      if (Array.isArray(parsed)) {
        return parsed
          .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
          .filter(Boolean);
      }

      if (typeof parsed === "string") {
        return parsed.trim() ? [parsed.trim()] : [];
      }
    } catch {
      return [];
    }
  }

  return normalizedValue
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);
};

const isAuthorizedMemberRequest = (request: Request) => {
  const providedKey = request.headers.get(memberAccessHeader)?.trim() || "";

  if (!providedKey) {
    return {
      authorized: false,
      status: 401,
      message: "Member access key is required for this action.",
    };
  }

  const allowedMemberKeys = getAllowedMemberKeys();

  if (allowedMemberKeys.length === 0) {
    return {
      authorized: false,
      status: 500,
      message: "Project member access is not configured on the server.",
    };
  }

  if (!allowedMemberKeys.includes(providedKey)) {
    return {
      authorized: false,
      status: 403,
      message: "You are not allowed to manage projects.",
    };
  }

  return { authorized: true as const };
};

const isValidHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, "[]\n", "utf8");
  }
}

async function readProjects(): Promise<ProjectRecord[]> {
  await ensureDataFile();
  const file = await fs.readFile(dataFilePath, "utf8");

  try {
    const parsed = JSON.parse(file) as ProjectRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeProjects(projects: ProjectRecord[]) {
  await ensureDataFile();
  await fs.writeFile(dataFilePath, `${JSON.stringify(projects, null, 2)}\n`, "utf8");
}

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json({ projects }, { status: 200 });
}

export async function POST(request: Request) {
  const authResult = isAuthorizedMemberRequest(request);

  if (!authResult.authorized) {
    return NextResponse.json({ message: authResult.message }, { status: authResult.status });
  }

  const body = (await request.json()) as ProjectPayload;

  const name = body.name?.trim() || "";
  const branch = body.branch?.trim() || "";
  const year = body.year?.trim() || "";
  const projectName = body.projectName?.trim() || "";
  const projectLink = body.projectLink?.trim() || "";
  const githubLink = body.githubLink?.trim() || "";

  if (!name || !branch || !year || !projectName) {
    return NextResponse.json(
      { message: "Please fill name, branch, year, and project name." },
      { status: 400 },
    );
  }

  if (!projectLink && !githubLink) {
    return NextResponse.json(
      { message: "Please provide at least one link: project link or GitHub link." },
      { status: 400 },
    );
  }

  if (projectLink && !isValidHttpUrl(projectLink)) {
    return NextResponse.json({ message: "Project link must be a valid URL." }, { status: 400 });
  }

  if (githubLink && !isValidHttpUrl(githubLink)) {
    return NextResponse.json({ message: "GitHub link must be a valid URL." }, { status: 400 });
  }

  const newProject: ProjectRecord = {
    id: randomUUID(),
    name,
    branch,
    year,
    projectName,
    projectLink,
    githubLink,
    submittedAt: new Date().toISOString(),
  };

  const projects = await readProjects();
  const updatedProjects = [newProject, ...projects];
  await writeProjects(updatedProjects);

  return NextResponse.json({ project: newProject, message: "Project uploaded successfully." }, { status: 201 });
}

export async function DELETE(request: Request) {
  const authResult = isAuthorizedMemberRequest(request);

  if (!authResult.authorized) {
    return NextResponse.json({ message: authResult.message }, { status: authResult.status });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();

  if (!id) {
    return NextResponse.json({ message: "Project id is required." }, { status: 400 });
  }

  const projects = await readProjects();
  const projectExists = projects.some((project) => project.id === id);

  if (!projectExists) {
    return NextResponse.json({ message: "Project not found." }, { status: 404 });
  }

  const updatedProjects = projects.filter((project) => project.id !== id);
  await writeProjects(updatedProjects);

  return NextResponse.json({ message: "Project deleted successfully." }, { status: 200 });
}
