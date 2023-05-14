import backend from './backend/packages.json';
import cli from './cli/packages.json';
import common from './common/packages.json';
import expo from './expo/packages.json';
import express from './express/packages.json';
import frontend from './frontend/packages.json';
import mongo from './mongo/packages.json';
import react from './react/packages.json';
import reactNative from './react-native/packages.json';

export default {
  backend,
  cli,
  common,
  expo,
  express,
  frontend,
  mongo,
  react,
  'react-native': reactNative,
} as { [key: string]: { dependencies?: string[]; devDependencies?: string[] } };
