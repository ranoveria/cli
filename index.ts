#!/usr/bin/env node
import { start } from '@src';
import chalk from 'chalk';
import process from 'process';
import pj from './package.json';

// On Start
console.log();
console.log(
  [
    chalk.blueBright('Hello! Welcome to '),
    chalk.greenBright('@ranoveria/cli'),
    chalk.blueBright('!'),
  ].join('')
);
console.log(chalk.white('Current version:'), chalk.blue(pj.version));
console.log();

// On Exit
process.on('exit', () => {
  console.log();
  console.log(chalk.blueBright(`Thanks for using ${chalk.greenBright('@ranoveria/cli')}! See you later!`));
});

start();
