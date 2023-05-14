import fs from 'fs';
import { getPath } from '@src/helpers';

const prettierConfig = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};

export const configure = (projectName: string) => {
  // Modify package.json
  const packageJsonPath = getPath(projectName, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Add prettier config
  packageJson.prettier = prettierConfig;

  // Add license, author etc.
  packageJson.author = 'Yurii Romanov @ Ranoveria';

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};
