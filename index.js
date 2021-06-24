import path from 'path';
import _ from 'lodash';
import parsers from './src/parsers.js';

export default (file1, file2) => {
  const result = [];
  const filePath1 = path.resolve(process.cwd(), file1);
  const filePath2 = path.resolve(process.cwd(), file2);
  const objectFile1 = parsers(filePath1);
  const objectFile2 = parsers(filePath2);
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
