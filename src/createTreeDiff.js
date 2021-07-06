import _ from 'lodash';

const createTreeDiff = (value1, value2) => {
  if (!_.isObject(value1) && !_.isObject(value2)) {
    return value1;
  }

  const keys = Object.keys({ ...value1, ...value2 });
  const result = _.sortBy(keys).reduce((acc, key) => {
    if (_.has(value1, key) && _.has(value2, key)) {
      if (
        (!_.isObject(value1[key]) || !_.isObject(value2[key]))
        && value1[key] !== value2[key]
      ) {
        acc[`- ${key}`] = createTreeDiff(value1[key], value1[key]);
        acc[`+ ${key}`] = createTreeDiff(value2[key], value2[key]);
      } else {
        acc[`  ${key}`] = createTreeDiff(value1[key], value2[key]);
      }
    } else if (_.has(value1, key)) {
      acc[`- ${key}`] = createTreeDiff(value1[key], value1[key]);
    } else {
      acc[`+ ${key}`] = createTreeDiff(value2[key], value2[key]);
    }
    return acc;
  }, {});

  return result;
};
export default createTreeDiff;
