import _ from 'lodash';

const createTreeDiff = (value1, value2) => {
  if (!_.isObject(value1) && !_.isObject(value2)) {
    return value1;
  }

  const keys = Object.keys({ ...value1, ...value2 });
  const result = _.sortBy(keys).reduce((acc, key) => {
    const accCopy = { ...acc };
    if (_.has(value1, key) && _.has(value2, key)) {
      if (
        (!_.isObject(value1[key]) || !_.isObject(value2[key]))
        && value1[key] !== value2[key]
      ) {
        accCopy[`- ${key}`] = createTreeDiff(value1[key], value1[key]);
        accCopy[`+ ${key}`] = createTreeDiff(value2[key], value2[key]);
      } else {
        accCopy[`  ${key}`] = createTreeDiff(value1[key], value2[key]);
      }
    } else if (_.has(value1, key)) {
      accCopy[`- ${key}`] = createTreeDiff(value1[key], value1[key]);
    } else {
      accCopy[`+ ${key}`] = createTreeDiff(value2[key], value2[key]);
    }
    return accCopy;
  }, {});

  return result;
};
export default createTreeDiff;
