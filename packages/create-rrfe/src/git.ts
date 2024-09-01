import { execSync } from "child_process";

export function initGit(projectName: string) {
  //进行一次git提交
  process.chdir(`./${projectName}`);
  execSync("git init", { stdio: "ignore" });
  execSync("git add .", { stdio: "ignore" });
  execSync('git commit -m "feat: redrock-project init"', { stdio: "ignore" });
}
