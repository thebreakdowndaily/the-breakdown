import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const site = path.resolve(root, "out");
const outputSubdir = "pagefind";

try {
  execSync(
    `npx pagefind --site "${site}" --output-subdir "${outputSubdir}"`,
    { stdio: "inherit", cwd: root },
  );
  console.log("\nPagefind indexing complete.");
} catch (err) {
  console.error("\nPagefind indexing failed:", err.message);
  process.exit(1);
}
