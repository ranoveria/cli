import prompts, { PromptObject } from 'prompts';
import fs from 'fs';

import { flowHandler, getSrcPath, logProcess, logSuccess } from '@src/helpers';
import chalk from 'chalk';
import fsExtra from 'fs-extra';

const questions: PromptObject[] = [
  {
    name: 'type',
    type: 'select',
    message: 'Select file(s) type you want to generate',
    choices: fs
      .readdirSync(getSrcPath('templates'))
      .map((fileName) => ({ title: fileName, value: fileName })),
  },
  {
    name: 'name',
    type: 'text',
    message: 'Enter name for generated file(s):',
  },
];

export const startFlow = flowHandler(async () => {
  console.log('Files generation flow selected.');

  const { type, name } = await prompts(questions);
  if (!name) {
    throw chalk.redBright('Name cannot be empty.');
  }

  logProcess(`Generating ${type} file(s) for ${name}...`);
  await fsExtra.copy(getSrcPath('templates', type), getSrcPath(type + 's', name));
  logSuccess('Files generated successfully.');
});
