import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : String(value);
};

export default (treeDiff) => {
  const iter = (tree, path) => tree.flatMap((node) => {
    const currentPath = path.concat(node.name).join('.');
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${stringify(
          node.value,
        )}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${stringify(
          node.value1,
        )} to ${stringify(node.value2)}`;
      case 'nested':
        return iter(node.children, [currentPath]);
      default:
        return [];
    }
  });
  return iter(treeDiff, []).join('\n');
};
