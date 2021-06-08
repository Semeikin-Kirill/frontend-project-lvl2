import fs from "fs";
import path from "path";
import _ from "lodash";

export default (filePath1, filePath2) => {
  const regex = /json$/;
  if (!regex.test(filePath1) || !regex.test(filePath2)) {
    throw new Error("Format");
  }
  let result = [];
  const currentDirectory = process.cwd();
  const correctPathFile1 = path.resolve(currentDirectory, filePath1);
  const correctPathFile2 = path.resolve(currentDirectory, filePath2);
  const file1 = fs.readFileSync(correctPathFile1);
  const file2 = fs.readFileSync(correctPathFile2);
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  _.sortBy(keys).forEach((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      obj1[key] === obj2[key]
        ? result.push(`  ${key}: ${obj1[key]}`)
        : result.push(`- ${key}: ${obj1[key]}`, `+ ${key}: ${obj2[key]}`);
    } else
      _.has(obj1, key)
        ? result.push(`- ${key}: ${obj1[key]}`)
        : result.push(`+ ${key}: ${obj2[key]}`);
  });
  console.log(`{\n${result.join("\n")}\n}`);
};
