import { start } from '@src';
import chalk from 'chalk';
import process from 'process';

// On Start
console.log();
console.log(
  [
    chalk.blueBright('Hello! Welcome to '),
    chalk.greenBright('@ranoveria/cli'),
    chalk.blueBright('!'),
  ].join('')
);
console.log();

// On Exit
process.on('exit', () => {
  console.log();
  console.log(chalk.blueBright(`Thanks for using ${chalk.greenBright('@ranoveria/cli')}! See you later!`));
});

start();
