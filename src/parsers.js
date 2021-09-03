import yaml from 'js-yaml';
import _ from 'lodash';

const formats = {
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.load(data, { json: true }),
  ymal: (data) => yaml.load(data, { json: true }),
};

export default (data, formatName) => {
  if (!_.has(formats, formatName)) {
    throw new Error(`this format is not supported '${formatName}'`);
  }
  return formats[formatName](data);
};
