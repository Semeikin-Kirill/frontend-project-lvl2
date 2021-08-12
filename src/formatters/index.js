import _ from 'lodash';
import createFormatStylish from './stylish.js';
import createFormatPlain from './plain.js';
import createFormatJson from './json.js';

export default (tree, format) => {
  const formats = {
    plain: createFormatPlain,
    stylish: createFormatStylish,
    json: createFormatJson,
  };
  if (!_.has(formats, format)) {
    throw new Error(`'${format}' is the wrong format`);
  }
  return formats[format](tree);
};
