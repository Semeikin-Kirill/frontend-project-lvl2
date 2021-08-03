import _ from 'lodash';

const isKey = (key, operator, obj) => {
  const newKey = key.replace(key[0], operator);
  return _.has(obj, newKey);
};

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export default (tree) => {
  const iter = (obj, path) => {
    if (typeof obj !== 'object') {
      return [];
    }
    const keys = Object.keys(obj);
    return keys.reduce((acc, key) => {
      const updatePath = path.concat(key.slice(2));
      if (key[0] === '+') {
        const value = obj[key];
        if (isKey(key, '-', obj)) {
          const oppositeKey = key.replace('+', '-');
          const valueOpposite = obj[oppositeKey];
          return acc.concat(
            `Property '${updatePath.join('.')}' was updated. From ${getValue(
              valueOpposite,
            )} to ${getValue(value)}`,
          );
        }
        return acc.concat(
          `Property '${updatePath.join(
            '.',
          )}' was added with value: ${getValue(value)}`,
        );
      } if (key[0] === '-') {
        if (!isKey(key, '+', obj)) {
          return acc.concat(`Property '${updatePath.join('.')}' was removed`);
        }
      }
      return acc.concat(iter(obj[key], updatePath));
    }, []);
  };

  return iter(tree, []).join('\n');
};
