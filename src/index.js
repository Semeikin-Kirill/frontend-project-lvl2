import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import buildTree from './createTreeDiff.js';
import format from './formatters/index.js';

const buildingPathFile = (fileName) => path.resolve(process.cwd(), fileName);

const getDataFile = (filePath) => {
  const rawData = readFileSync(filePath);
  const extName = path.extname(filePath);
  return { rawData, extName };
};

export default (fileName1, fileName2, formatName = 'stylish') => {
  const filePath1 = buildingPathFile(fileName1);
  const filePath2 = buildingPathFile(fileName2);
  const { rawData: rawDataFile1, extName: extNameFile1 } = getDataFile(filePath1);
  const { rawData: rawDataFile2, extName: extNameFile2 } = getDataFile(filePath2);
  const data1 = parse(rawDataFile1, extNameFile1);
  const data2 = parse(rawDataFile2, extNameFile2);
  const innerTree = buildTree(data1, data2);
  return format(innerTree, formatName);
};
