import { execSync } from "node:child_process";
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(fileURLToPath(import.meta.url), "..");
const backendDir = join(rootDir, "backend");
const frontendDir = join(rootDir, "frontend");

function run(cmd, cwd = rootDir) {
  execSync(cmd, { cwd, stdio: "inherit", shell: true });
}

function runOptional(cmd, cwd = rootDir) {
  try {
    execSync(cmd, { cwd, stdio: "pipe", shell: true });
  } catch (_) {}
}

run("npm install", backendDir);

const backendEnv = join(backendDir, ".env");
const backendEnvExample = join(backendDir, ".env.example");
if (!existsSync(backendEnv) && existsSync(backendEnvExample)) {
  copyFileSync(backendEnvExample, backendEnv);
}

runOptional("createdb call_center");

run("npm run db:generate", backendDir);
run("npm run db:migrate", backendDir);
run("npm run db:push", backendDir);
run("npm run db:seed", backendDir);

run("npm install", frontendDir);

const frontendEnv = join(frontendDir, ".env");
const frontendEnvExample = join(frontendDir, ".env.example");
if (!existsSync(frontendEnv) && existsSync(frontendEnvExample)) {
  copyFileSync(frontendEnvExample, frontendEnv);
}

run("npm run dev", rootDir);
