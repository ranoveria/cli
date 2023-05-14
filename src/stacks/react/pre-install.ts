import { execSync } from 'child_process';
import { cmds, getPath } from '@src/helpers';

export const preInstall = (projectName: string) => {
  const projectPath = getPath(projectName);
  execSync(
    cmds(
      `npx create-react-app ${projectName} --template typescript`,
      `cd ${projectPath}`,
      `git init`
    )
  );
};
