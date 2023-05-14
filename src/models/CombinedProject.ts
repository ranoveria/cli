import { Project } from '@src/models/Project';
import path from 'path';

const combinedStacks = {
  mern: ['react', 'express', 'mongodb'],
};

export class CombinedProject extends Project {
  override async setup() {
    await this.initialize();

    if (Object.keys(combinedStacks).includes(this.stack)) {
      await this.setupSubProjects();
    } else {
      await super.setup();
    }
  }

  async setupSubProjects() {
    switch (this.stack) {
      case 'mern':
        await new Project([this.name, 'client'].join(path.sep), 'react').setup();
        await new Project([this.name, 'server'].join(path.sep), 'express').setup();
        await new Project([this.name, 'server'].join(path.sep), 'mongo').setup();
    }
  }
}
