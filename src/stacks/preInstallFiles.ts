import { preInstall as react } from '../stacks/react/pre-install';
import { preInstall as expo } from '../stacks/expo/pre-install';

export default {
  react,
  expo,
} as { [key: string]: (projectName: string) => void };
