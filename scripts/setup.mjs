import { execSync } from "node:child_process";
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  DB_NAME_DEFAULT,
  PATH_BACKEND_ENV,
  PATH_FRONTEND_ENV,
} from "../constants.mjs";

// Use process.cwd() so cwd exists from the caller's perspective (avoids ENOENT when cwd was wrong)
const rootDir = process.cwd();
const backendDir = join(rootDir, "backend");
const frontendDir = join(rootDir, "frontend");

function run(cmd, cwd = rootDir) {
  if (!existsSync(cwd)) {
    throw new Error(`Setup: directory does not exist: ${cwd}. Run "npm run start" from project root.`);
  }
  execSync(cmd, { cwd, stdio: "inherit", shell: true });
}

function runOptional(cmd, cwd = rootDir) {
  if (!existsSync(cwd)) return;
  try {
    execSync(cmd, { cwd, stdio: "pipe", shell: true });
  } catch (_) {}
}

run("npm install", backendDir);

const backendEnv = join(rootDir, PATH_BACKEND_ENV);
const backendEnvExample = join(backendDir, ".env.example");
if (!existsSync(backendEnv) && existsSync(backendEnvExample)) {
  copyFileSync(backendEnvExample, backendEnv);
}

runOptional(`createdb ${DB_NAME_DEFAULT}`);

run("npm run db:generate", backendDir);
run("npm run db:migrate", backendDir);
run("npm run db:push", backendDir);
run("npm run db:seed", backendDir);

run("npm install", frontendDir);

const frontendEnv = join(rootDir, PATH_FRONTEND_ENV);
const frontendEnvExample = join(frontendDir, ".env.example");
if (!existsSync(frontendEnv) && existsSync(frontendEnvExample)) {
  copyFileSync(frontendEnvExample, frontendEnv);
}

run("npm run dev", rootDir);
