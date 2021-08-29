import _ from 'lodash';

const getValue = (value) => {
  if (_.isArray(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const getValueChanged = (children) => children.map(getValue);

export default (treeDiff) => {
  const iter = (tree, listPath) => {
    const result = tree.reduce((acc, node) => {
      const { name, type, children } = node;
      const path = listPath.concat(name);
      const value = getValue(children);
      if (type === 'added') {
        return acc.concat(
          `Property '${path.join('.')}' was added with value: ${value}`,
        );
      }
      if (type === 'deleted') {
        return acc.concat(`Property '${path.join('.')}' was removed`);
      }
      if (type === 'changed') {
        const [afterChild, beforeChild] = getValueChanged(children);
        return acc.concat(
          `Property '${path.join(
            '.',
          )}' was updated. From ${afterChild} to ${beforeChild}`,
        );
      }
      if (type === 'nested') {
        return acc.concat(iter(children, path));
      }
      return acc;
    }, []);
    return result;
  };
  return iter(treeDiff, []).join('\n');
};
