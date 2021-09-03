import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));

  return _.sortBy(keys).map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: value2,
      };
    }
    if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: value1,
      };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        name: key,
        type: 'nested',
        children: buildTree(value1, value2),
      };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        name: key,
        type: 'changed',
        value1,
        value2,
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: value2,
    };
  });
};

export default buildTree;
