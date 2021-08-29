import _ from 'lodash';

const getTreeOfObject = (obj) => {
  if (!_.isObject(obj)) {
    return obj;
  }

  return Object.entries(obj).map(([key, value]) => ({
    name: key,
    children: getTreeOfObject(value),
  }));
};

const createTreeDiff = (obj1, obj2) => {
  const keyObj1 = Object.keys(obj1);
  const keyObj2 = Object.keys(obj2);
  const keys = _.union(keyObj1, keyObj2);

  return _.sortBy(keys).map((key) => {
    const valueObj1 = obj1[key];
    const valueObj2 = obj2[key];

    if (!_.has(obj1, key)) {
      return {
        name: key,
        type: 'added',
        children: getTreeOfObject(valueObj2),
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key,
        type: 'deleted',
        children: getTreeOfObject(valueObj1),
      };
    }
    if (_.isObject(valueObj1) && _.isObject(valueObj2)) {
      return {
        name: key,
        type: 'nested',
        children: createTreeDiff(valueObj1, valueObj2),
      };
    }
    if (valueObj1 === valueObj2) {
      return {
        name: key,
        type: 'unchanged',
        children: valueObj2,
      };
    }
    const value1 = _.isObject(valueObj1)
      ? getTreeOfObject(valueObj1)
      : valueObj1;
    const value2 = _.isObject(valueObj2)
      ? getTreeOfObject(valueObj2)
      : valueObj2;
    return {
      name: key,
      type: 'changed',
      children: [value1, value2],
    };
  });
};

export default createTreeDiff;
