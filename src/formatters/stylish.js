import _ from 'lodash';

const symbols = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const getIndent = (depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  return replacer.repeat(depth * spacesCount - 2);
};

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
            const afterValue = stringify(node.value1, depth);
            const beforeValue = stringify(node.value2, depth);
            const after = `${indent}- ${node.name}: ${afterValue}`;
            const before = `${indent}+ ${node.name}: ${beforeValue}`;
            return [after, before].join('\n');
          }
          default: {
            const value = stringify(node.value, depth);
            return `${indent}${symbols[node.type]} ${node.name}: ${value}`;
          }
        }
      })
      .join('\n');
  };
  return ['{', iter(treeDiff, 1), '}'].join('\n');
};

export default nodeStringify;
