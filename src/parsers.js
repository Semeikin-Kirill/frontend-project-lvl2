import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export default (filePath) => {
  const data = readFileSync(filePath);
  const format = path.extname(filePath);
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.ymal') {
    return yaml.load(data, { json: true });
  }
  throw new Error('Invalid format');
};
