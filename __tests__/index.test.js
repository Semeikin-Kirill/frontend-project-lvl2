import { test, expect } from '@jest/globals';
import url from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');

test.each`
  fileName1    | fileName2    | format       | expected
  ${fileJson1} | ${fileJson2} | ${'stylish'} | ${'expected_file.txt'}
  ${fileYml1}  | ${fileYml2}  | ${'stylish'} | ${'expected_file.txt'}
  ${fileYml1}  | ${fileYml2}  | ${'plain'}   | ${'expected_file2.txt'}
  ${fileJson1} | ${fileJson2} | ${'plain'}   | ${'expected_file2.txt'}
  ${fileJson1} | ${fileJson2} | ${'json'}    | ${'expected.json'}
`(
  'genDiff($fileName1, $fileName2, $format)',
  ({
    fileName1, fileName2, format, expected,
  }) => {
    expect(genDiff(fileName1, fileName2, format)).toBe(
      readFile(expected).trim(),
    );
  },
);
