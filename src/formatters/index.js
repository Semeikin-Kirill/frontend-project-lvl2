import _ from 'lodash';
import createFormatStylish from './stylish.js';
import createFormatPlain from './plain.js';
import createFormatJson from './json.js';

const formats = {
  plain: createFormatPlain,
  stylish: createFormatStylish,
  json: createFormatJson,
};

export default (tree, formatName) => {
  if (!_.has(formats, formatName)) {
    throw new Error(`'${formatName}' is the wrong format`);
  }
  return formats[formatName](tree);
};
