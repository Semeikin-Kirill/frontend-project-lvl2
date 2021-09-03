import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export default (treeDiff) => {
  const iter = (tree, listPath) => {
    const result = tree.reduce((acc, node) => {
      const path = listPath.concat(node.name);
      if (node.type === 'added') {
        return acc.concat(
          `Property '${path.join('.')}' was added with value: ${getValue(
            node.value,
          )}`,
        );
      }
      if (node.type === 'deleted') {
        return acc.concat(`Property '${path.join('.')}' was removed`);
      }
      if (node.type === 'changed') {
        return acc.concat(
          `Property '${path.join('.')}' was updated. From ${getValue(
            node.value1,
          )} to ${getValue(node.value2)}`,
        );
      }
      if (node.type === 'nested') {
        return acc.concat(iter(node.children, path));
      }
      return acc;
    }, []);
    return result;
  };
  return iter(treeDiff, []).join('\n');
};
