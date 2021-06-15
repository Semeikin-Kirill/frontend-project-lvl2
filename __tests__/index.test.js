import { test, expect } from '@jest/globals';
import url from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const answer = readFile('expected_file.txt').trim();

test('genDiff', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(answer);
});
test('throw', () => {
  expect(() => genDiff('file1.js', 'file2.json')).toThrow();
  expect(() => genDiff('file1.json', 'file2.js')).toThrow();
  expect(() => genDiff('file1.js', 'file2.js')).toThrow();
});
