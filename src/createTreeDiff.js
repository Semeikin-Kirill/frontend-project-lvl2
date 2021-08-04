import _ from 'lodash';

const isEqual = (value1, value2) => {
  if (value1 === value2) {
    return true;
  }
  if (_.isObject(value1) && _.isObject(value2)) {
    return true;
  }
  return false;
};

const createTreeDiff = (obj1, obj2) => {
  if (!_.isObject(obj1) && !_.isObject(obj2)) {
    return obj2;
  }
  const keys = Object.keys({ ...obj1, ...obj2 });
  return _.sortBy(keys).reduce((tree, key) => {
    if (_.has(obj2, key)) {
      if (!_.has(obj1, key)) {
        const obj = { [`+ ${key}`]: createTreeDiff(obj2[key], obj2[key]) };
        return { ...tree, ...obj };
      }
      if (isEqual(obj1[key], obj2[key])) {
        const obj = { [`  ${key}`]: createTreeDiff(obj1[key], obj2[key]) };
        return { ...tree, ...obj };
      }
      const value1 = createTreeDiff(obj1[key], obj1[key]);
      const value2 = createTreeDiff(obj2[key], obj2[key]);
      const obj = { [`- ${key}`]: value1, [`+ ${key}`]: value2 };
      return { ...tree, ...obj };
    }
    return { ...tree, [`- ${key}`]: createTreeDiff(obj1[key], obj1[key]) };
  }, {});
};

export default createTreeDiff;
