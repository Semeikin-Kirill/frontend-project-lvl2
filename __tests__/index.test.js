import { test, expect } from '@jest/globals';
import url from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');
const answer = readFile('expected_file.txt').trim();

test('json comparison', () => {
  expect(genDiff(fileJson1, fileJson2)).toEqual(answer);
});

test('yml comparison', () => {
  expect(genDiff(fileYml1, fileYml2)).toEqual(answer);
});

test('throw', () => {
  expect(() => genDiff('file1.js', 'file2.json')).toThrow();
  expect(() => genDiff('file1.json', 'file2.js')).toThrow();
  expect(() => genDiff('file1.js', 'file2.js')).toThrow();
});
