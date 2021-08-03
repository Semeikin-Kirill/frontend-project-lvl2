import path from 'path';
import parsers from './src/parsers.js';
import createTreeDiff from './src/createTreeDiff.js';
import getFormattedTree from './formatters/index.js';

export default (file1, file2, formatName = 'stylish') => {
  const filePath1 = path.resolve(process.cwd(), file1);
  const filePath2 = path.resolve(process.cwd(), file2);
  const objectFile1 = parsers(filePath1);
  const objectFile2 = parsers(filePath2);
  const treeDiff = createTreeDiff(objectFile1, objectFile2);
  return getFormattedTree(treeDiff, formatName);
};
