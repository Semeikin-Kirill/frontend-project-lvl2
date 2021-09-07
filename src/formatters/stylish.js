import _ from 'lodash';

const symbols = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return node;
  }
  const indent = getIndent(depth);
  const result = Object.entries(node).map(([key, value]) => {
    const nextIndent = getIndent(depth + 1);
    return `${nextIndent}  ${key}: ${stringify(value, depth + 1)}`;
  });
  return ['{', ...result, `${indent}  }`].join('\n');
};

const nodeStringify = (treeDiff) => {
  const iter = (tree, depth) => {
    const indent = getIndent(depth);
    return tree
      .map((node) => {
        switch (node.type) {
          case 'nested':
            return `${indent}  ${node.name}: ${[
              '{',
              iter(node.children, depth + 1),
              `${indent}  }`,
            ].join('\n')}`;
          case 'changed': {
            const value1 = stringify(node.value1, depth);
            const value2 = stringify(node.value2, depth);
            const node1 = `${indent}- ${node.name}: ${value1}`;
            const node2 = `${indent}+ ${node.name}: ${value2}`;
            return [node1, node2].join('\n');
          }
          case 'added':
          case 'deleted':
          case 'unchanged': {
            const value = stringify(node.value, depth);
            return `${indent}${symbols[node.type]} ${node.name}: ${value}`;
          }
          default:
            throw new Error(`Wrong type: ${node.type}`);
        }
      })
      .join('\n');
  };
  return ['{', iter(treeDiff, 1), '}'].join('\n');
};

export default nodeStringify;
