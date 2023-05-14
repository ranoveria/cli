import { flowHandler } from '@src/helpers';
import { CombinedProject } from '@src/models/CombinedProject';

export const startFlow = flowHandler(async () => {
  await new CombinedProject().setup();
});
