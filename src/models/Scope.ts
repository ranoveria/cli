import fs from 'fs';
import {
  cmds,
  getPath,
  getSrcPath,
  logProcess,
  logSuccess,
} from '@src/helpers';
import { execSync } from 'child_process';
import fsExtra from 'fs-extra';

export class Scope {
  private readonly name: string = '';
  private readonly projectName: string = '';
  private packages: { dependencies?: string[]; devDependencies?: string[] } =
    {};

  constructor(name: string, projectName: string) {
    this.name = name;
    this.projectName = projectName;
  }

  async setup() {
    logProcess(`Started setup for ${this.name} scope...`);

    this.setPackages();
    this.installDependencies();
    this.installDevDependencies();
    this.copyTemplates();
    await this.configure();

    logSuccess(`Setup for ${this.name} scope finished successfully!`);
  }

  private setPackages() {
    logProcess(`Acquiring ${this.name} packages...`);

    this.packages = JSON.parse(
      fs.readFileSync(getSrcPath('scopes', this.name, 'packages.json'), 'utf-8')
    );

    logSuccess(`Packages for ${this.name} scope acquired.`);
  }

  private installDependencies() {
    if (this.packages.dependencies && this.packages.dependencies.length > 0) {
      logProcess(`Installing ${this.name} dependencies...`);

      execSync(
        cmds(
          `cd ${this.projectName}`,
          `yarn add ${this.packages.dependencies.join(' ')}`
        )
      );

      logSuccess(`Installed ${this.name} dependencies.`);
    }
  }

  private installDevDependencies() {
    if (
      this.packages.devDependencies &&
      this.packages.devDependencies.length > 0
    ) {
      logProcess(`Installing ${this.name} dev dependencies...`);

      execSync(
        cmds(
          `cd ${this.projectName}`,
          `yarn add -D ${this.packages.devDependencies.join(' ')}`
        )
      );

      logSuccess(`Installed ${this.name} dev dependencies.`);
    }
  }

  private copyTemplates() {
    const projectDir = getPath(this.projectName);

    const scopeFilesDirSrc = getSrcPath('scopes', this.name, 'files');

    if (fs.existsSync(scopeFilesDirSrc)) {
      logProcess(`Copying ${this.name} templates...`);

      fsExtra.copySync(scopeFilesDirSrc, projectDir);

      logSuccess(`Successfully copied ${this.name} templates.`);
    }
  }

  private async configure() {
    const configFilePath = getSrcPath('scopes', this.name, 'config.ts');

    if (fs.existsSync(configFilePath)) {
      logProcess(`Running ${this.name} configuration scripts...`);

      await import(configFilePath).then(({ configure }) =>
        configure(this.projectName)
      );

      logProcess(`Finished running ${this.name} configuration scripts.`);
    }
  }
}