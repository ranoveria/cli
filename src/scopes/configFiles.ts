import { configure as react } from '../scopes/react/config';
import { configure as cli } from '../scopes/cli/config';
import { configure as backend } from '../scopes/backend/config';
import { configure as frontend } from '../scopes/frontend/config';
import { configure as common } from '../scopes/common/config';
import { configure as expo } from '../scopes/expo/config';
import { configure as express } from '../scopes/express/config';
import { configure as mongo } from '../scopes/mongo/config';
import { configure as reactNative } from '../scopes/react-native/config';

export default {
  react,
  cli,
  backend,
  frontend,
  common,
  expo,
  express,
  mongo,
  'react-native': reactNative,
} as { [key: string]: (projectName: string) => void };
