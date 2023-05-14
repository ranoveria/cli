import prompts, { PromptObject } from 'prompts';
import { cmds, logProcess, logSuccess } from '@src/helpers';
import { execSync } from 'child_process';
import { Scope } from '@src/models/Scope';
import stacksScopes from '@src/stacks/stacksScopes';
import postInstallFiles from '@src/stacks/postInstallFiles';
import preInstallFiles from '@src/stacks/preInstallFiles';

const STACKS = [
  'cli',
  'express',
  'mern',
  'mobile',
  'mongo',
  'react',
  'react-native',
];

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

    const preInstall = preInstallFiles[this.stack];
    if (preInstall) {
      preInstall(this.name);
    } else {
      execSync(
        cmds(
          `if not exist ${this.name} md ${this.name}`,
          `cd ${this.name}`,
          `yarn init -y`,
          `git init`
        )
      );
    }

    logSuccess('Finished running pre-install scripts.');
  }

  private async runPostInstallScripts() {
    logProcess('Running post-install scripts...');

    const postInstall = postInstallFiles[this.stack];
    if (postInstall) {
      postInstall(this.name);
    }

    logSuccess('Finished running post-install scripts.');
  }

  private setScopes() {
    logProcess('Acquiring scopes...');

    stacksScopes[this.stack].map((scope: string) =>
      this.scopes.push(new Scope(scope, this.name))
    );

    logSuccess('Scopes acquired.');
  }
}
