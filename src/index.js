import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import buildTree from './createTreeDiff.js';
import format from './formatters/index.js';

const getPath = (fileName) => path.resolve(process.cwd(), fileName);

const extractFormat = (fileName) => path.extname(fileName).substr(1);

const getData = (filePath) => {
  const rawData = readFileSync(filePath);
  const dataFormat = extractFormat(filePath);
  return parse(rawData, dataFormat);
};

export default (fileName1, fileName2, formatName = 'stylish') => {
  const filePath1 = getPath(fileName1);
  const filePath2 = getPath(fileName2);
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const innerTree = buildTree(data1, data2);
  return format(innerTree, formatName);
};
