import prompts, { PromptObject } from 'prompts';
import { cmds, getSrcPath, logProcess, logSuccess } from '@src/helpers';
import fs from 'fs';
import { execSync } from 'child_process';
import { Scope } from '@src/models/Scope';

const STACKS = fs.readdirSync(getSrcPath('stacks'));

const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'projectName',
    message: "Enter your project's name",
    validate: (prev) => prev.length > 0 || 'Project name cannot be empty',
  },
  {
    type: 'select',
    name: 'stack',
    message: 'Select project stack:',
    choices: STACKS.map((stackName) => ({
      title: stackName,
      value: stackName,
    })),
    instructions: false,
  },
];

export class Project {
  protected name: string = '';
  protected stack: string = '';
  private scopes: Scope[] = [];

  constructor(name?: string, stack?: string) {
    if (name && stack) {
      this.name = name;
      this.stack = stack;
    }
  }

  async setup() {
    if (!this.name || !this.stack) {
      await this.initialize();
    }
    logProcess(`Setup for ${this.name} project started...`);

    await this.runPreInstallScripts();

    this.setScopes();

    for (let scope of this.scopes) {
      await scope.setup();
    }

    await this.runPostInstallScripts();

    logSuccess(`Setup for ${this.name} project finished successfully!`);
    console.log();
  }

  protected async initialize() {
    const { projectName, stack } = await prompts(questions);
    if (!projectName) {
      throw 'Cannot create project without a name';
    }

    this.name = projectName;
    this.stack = stack;
  }

  private async runPreInstallScripts() {
    logProcess(
      'Running pre-install scripts (this may take some time, be patient)...'
    );

    const preInstallPath = getSrcPath('stacks', this.stack, 'pre-install.ts');

    if (fs.existsSync(preInstallPath)) {
      const { preInstall } = await import(preInstallPath);

      preInstall(this.name);
    } else {
      execSync(
        cmds(
          `mkdir ${this.name}`,
          `cd ${this.name}`,
          `yarn init -y`,
          `git init`
        )
      );
    }

    logSuccess('Finished running pre-install scripts.');
  }

  private async runPostInstallScripts() {
    const postInstallPath = getSrcPath('stacks', this.stack, 'post-install.ts');

    if (fs.existsSync(postInstallPath)) {
      logProcess('Running post-install scripts...');

      const { postInstall } = await import(postInstallPath);
      postInstall(this.name);

      logSuccess('Finished running post-install scripts.');
    }
  }

  private setScopes() {
    const scopesFilePath = getSrcPath('stacks', this.stack, 'scopes.json');

    if (fs.existsSync(scopesFilePath)) {
      logProcess('Acquiring scopes...');

      JSON.parse(fs.readFileSync(scopesFilePath, 'utf-8')).map(
        (scope: string) => this.scopes.push(new Scope(scope, this.name))
      );

      logSuccess('Scopes acquired.');
    }
  }
}
