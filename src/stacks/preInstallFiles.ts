import { preInstall as reactPreInstall } from '../stacks/react/pre-install';

export default {
  react: reactPreInstall,
} as { [key: string]: (projectName: string) => void };