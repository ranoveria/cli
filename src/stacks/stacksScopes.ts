import cli from './cli/scopes.json';
import express from './express/scopes.json';
import mern from './mern/scopes.json';
import mongo from './mongo/scopes.json';
import react from './react/scopes.json';
import reactNative from './react-native/scopes.json';
import expo from './expo/scopes.json';

export default {
  cli,
  express,
  mern,
  mongo,
  expo,
  react,
  'react-native': reactNative,
} as { [key: string]: string[] };
