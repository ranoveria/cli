import chalk from 'chalk';
export const flowHandler = (flowStarter: () => Promise<any>) => async () =>
  await flowStarter().catch((err) => {
    logError("Oops... Something went wrong, here's what:");
    console.log();
    console.error(err);
  });

export const logSuccess = (msg: string) =>
  console.log(chalk.greenBright('√'), chalk.greenBright(msg));
export const logError = (msg: string) =>
  console.log(chalk.redBright('×'), chalk.whiteBright(msg));
export const logProcess = (msg: string) => console.log(chalk.blue(msg));

export const cmds = (..._cmds: string[]) => _cmds.join(' && ');
