import prompts, { PromptObject } from 'prompts';
import process from 'process';
import chalk from 'chalk';
import flows from '@src/flows';

const questions: PromptObject[] = [
  {
    name: 'flow',
    type: 'select',
    message: 'Select desired flow:',
    choices: [
      { title: 'Setup project', value: 'setup-project' },
      { title: chalk.yellow('Another time'), value: 'exit' },
    ],
  },
];

export const start = async () => {
  const { flow } = await prompts(questions);
  if (!flow || flow === 'exit') {
    process.exit();
  }

  const startFlow = flows[flow];
  startFlow().then(() => {
    // Restart
    console.log();
    console.log(chalk.whiteBright('Do you want to do anything else?'));
    start();
  });
};
