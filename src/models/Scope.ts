import { cmds, logProcess, logSuccess } from '@src/helpers';
import { execSync } from 'child_process';
import packages from '@src/scopes/packages';
import configFiles from '@src/scopes/configFiles';
import fsExtra from 'fs-extra';
import * as path from 'path';
import process from 'process';

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

    this.packages = packages[this.name];

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
    logProcess(`Copying ${this.name} templates...`);

    const scopeFilesDirSrc = path.resolve(
      __dirname,
      'scopes',
      this.name,
      'files'
    );
    const projectDir = [process.cwd(), this.projectName].join(path.sep);
    fsExtra.copySync(scopeFilesDirSrc, projectDir);

    logSuccess(`Successfully copied ${this.name} templates.`);
  }

  private async configure() {
    logProcess(`Running ${this.name} configuration scripts...`);

    const configure = configFiles[this.name];
    configure(this.projectName);

    logProcess(`Finished running ${this.name} configuration scripts.`);
  }
}
