import _ from 'lodash';
import createFormatStylish from './stylish.js';
import createFormatPlain from './plain.js';

export default (tree, format) => {
  const formats = { plain: createFormatPlain, stylish: createFormatStylish };
  if (!_.has(formats, format)) {
    throw new Error(`'${format}' is the wrong format`);
  }
  return formats[format](tree);
};
