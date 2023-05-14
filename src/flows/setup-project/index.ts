import { flowHandler } from '@src/helpers';
import { Project } from '@src/models';

export const startFlow = flowHandler(async () => {
  await new Project().setup();
});
