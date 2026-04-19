import { execFileSync } from "node:child_process";

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const isWorkersBuild =
  process.env.WORKERS_CI === "1" || process.env.CF_PAGES === "1";

function run(command, args) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: process.env,
  });
}

if (isWorkersBuild) {
  process.env.NEXT_PRIVATE_STANDALONE = "true";
  process.env.NEXT_PRIVATE_OUTPUT_TRACE_ROOT = process.cwd();
}

run(npx, ["next", "build"]);

if (isWorkersBuild) {
  console.log(
    "[build] Workers build detected, generating OpenNext Cloudflare bundle..."
  );
  run(npx, ["opennextjs-cloudflare", "build", "--skipNextBuild"]);
}
