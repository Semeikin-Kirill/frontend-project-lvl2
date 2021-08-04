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
    const valueObj1 = obj1[key];
    const valueObj2 = obj2[key];
    if (_.has(obj2, key)) {
      if (!_.has(obj1, key)) {
        const obj = { [`+ ${key}`]: createTreeDiff(valueObj2, valueObj2) };
        return { ...tree, ...obj };
      }
      if (isEqual(valueObj1, valueObj2)) {
        const obj = { [`  ${key}`]: createTreeDiff(valueObj1, valueObj2) };
        return { ...tree, ...obj };
      }
      const value1 = createTreeDiff(valueObj1, valueObj1);
      const value2 = createTreeDiff(valueObj2, valueObj2);
      const obj = { [`- ${key}`]: value1, [`+ ${key}`]: value2 };
      return { ...tree, ...obj };
    }
    return { ...tree, [`- ${key}`]: createTreeDiff(valueObj1, valueObj1) };
  }, {});
};

export default createTreeDiff;
