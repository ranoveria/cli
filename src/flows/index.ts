import { startFlow as setupProjectStartFlow } from './setup-project';

export default {
  'setup-project': setupProjectStartFlow,
} as { [key: string]: () => Promise<unknown> };
