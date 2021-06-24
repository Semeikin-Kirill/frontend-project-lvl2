import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getPath = (directory, filePath) => path.resolve(directory, filePath);

const readFile = (file) => fs.readFileSync(file);

const parseJson = (directory, filePath) => {
  if (path.extname(filePath) !== '.json') {
    throw new Error('Invalid format');
  }
  const file = readFile(getPath(directory, filePath));
  return JSON.parse(file);
};

export default (filePath1, filePath2) => {
  const result = [];
  const currentDirectory = process.cwd();
  const objectFile1 = parseJson(currentDirectory, filePath1);
  const objectFile2 = parseJson(currentDirectory, filePath2);
  const commomObject = { ...objectFile1, ...objectFile2 };
  const keys = Object.keys(commomObject);
  _.sortBy(keys).forEach((key) => {
    if (_.has(objectFile1, key) && _.has(objectFile2, key)) {
      if (objectFile1[key] === objectFile2[key]) {
        result.push(`  ${key}: ${objectFile1[key]}`);
      } else {
        result.push(
          `- ${key}: ${objectFile1[key]}`,
          `+ ${key}: ${objectFile2[key]}`,
        );
      }
    } else {
      const string = _.has(objectFile1, key)
        ? `- ${key}: ${objectFile1[key]}`
        : `+ ${key}: ${objectFile2[key]}`;
      result.push(string);
    }
  });
  return `{\n ${result.join('\n ')}\n}`;
};
