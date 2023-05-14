import { execSync } from 'child_process';
import { cmds } from '@src/helpers';
import * as path from 'path';

export const preInstall = (projectName: string) => {
  const projectPath = [process.cwd(), projectName].join(path.sep);
  execSync(
    cmds(
      `npx create-react-app ${projectName} --template typescript`,
      `cd ${projectPath}`,
      `git init`
    )
  );
};
