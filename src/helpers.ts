import process from 'process';
import path from 'path';
import chalk from 'chalk';

export const getSrcPath = (...pathChunks: string[]) =>
  [process.cwd(), 'src', ...pathChunks].join(path.sep);
export const getPath = (...pathChunks: string[]) =>
  [process.cwd(), ...pathChunks].join(path.sep);
export const flowHandler = (flowStarter: () => Promise<any>) => async () =>
  await flowStarter().catch((err) => {
    logError("Oops... Something went wrong, here's what:");
    console.log();
    console.error(err);
  });

export const logSuccess = (msg: string) =>
  console.log(chalk.greenBright('√'), chalk.whiteBright(msg));
export const logError = (msg: string) =>
  console.log(chalk.redBright('×'), chalk.whiteBright(msg));
export const logProcess = (msg: string) => console.log(chalk.blueBright(msg));

export const cmds = (..._cmds: string[]) => _cmds.join(' && ');