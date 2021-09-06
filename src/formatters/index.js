import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formats = {
  plain: formatPlain,
  stylish: formatStylish,
  json: formatJson,
};

export default (tree, formatName) => {
  if (!_.has(formats, formatName)) {
    throw new Error(`'${formatName}' is the wrong format`);
  }
  return formats[formatName](tree);
};
