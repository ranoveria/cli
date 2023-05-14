import prompts, { PromptObject } from 'prompts';
import path from 'path';
import { getSrcPath } from '@src/helpers';
import process from 'process';
import chalk from 'chalk';

const questions: PromptObject[] = [
  {
    name: 'flow',
    type: 'select',
    message: 'Select desired flow:',
    choices: [
      { title: 'Setup project', value: 'setup-project' },
      { title: 'Generate files', value: 'gen-files' },
      { title: 'Edit files', value: 'edit' },
      { title: chalk.yellow('Another time'), value: 'exit' },
    ],
  },
];

export const start = async () => {
  const { flow } = await prompts(questions);
  if (!flow || flow === 'exit') {
    process.exit();
  }

  const { startFlow } = await import(
    path.resolve(getSrcPath('flows', `${flow}/index.ts`))
  );
  startFlow().then(() => {
    // Restart
    console.log();
    console.log(chalk.whiteBright('Do you want to do anything else?'));
    start();
  });
};
