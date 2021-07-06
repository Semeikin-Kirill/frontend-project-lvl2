import path from 'path';
import parsers from './src/parsers.js';
import createTreeDiff from './src/createTreeDiff.js';
import stylish from './src/stylish.js';

export default (file1, file2, formater = 'stylish') => {
  const filePath1 = path.resolve(process.cwd(), file1);
  const filePath2 = path.resolve(process.cwd(), file2);
  const objectFile1 = parsers(filePath1);
  const objectFile2 = parsers(filePath2);
  const treeDiff = createTreeDiff(objectFile1, objectFile2);
  return formater === 'stylish' ? stylish(treeDiff) : false;
};
