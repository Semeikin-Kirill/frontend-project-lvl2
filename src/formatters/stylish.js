import _ from 'lodash';

const symbols = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const nodeStringify = (treeDiff, replacer = ' ', spacesCount = 4) => {
  const iter = (tree, depth) => {
    const indent = replacer.repeat(depth * spacesCount - 2);
    const indentBrackets = replacer.repeat(depth * spacesCount);
    if (_.isPlainObject(tree)) {
      const entries = Object.entries(tree);
      return entries
        .map(([key, value]) => {
          const result = _.isPlainObject(value)
            ? ['{', iter(value, depth + 1), `${indentBrackets}}`].join('\n')
            : value;
          return `${indent}  ${key}: ${result}`;
        })
        .join('\n');
    }
    return tree
      .map((node) => {
        if (node.type === 'nested') {
          return `${indent}  ${node.name}: ${[
            '{',
            iter(node.children, depth + 1),
            `${indentBrackets}}`,
          ].join('\n')}`;
        }
        if (node.type === 'changed') {
          const afterValue = _.isObject(node.value1)
            ? ['{', iter(node.value1, depth + 1), `${indentBrackets}}`].join(
              '\n',
            )
            : node.value1;
          const beforeValue = _.isObject(node.value2)
            ? ['{', iter(node.value2, depth + 1), `${indentBrackets}}`].join(
              '\n',
            )
            : node.value2;
          const after = `${indent}- ${node.name}: ${afterValue}`;
          const before = `${indent}+ ${node.name}: ${beforeValue}`;
          return [after, before].join('\n');
        }
        const value = _.isObject(node.value)
          ? ['{', iter(node.value, depth + 1), `${indentBrackets}}`].join('\n')
          : node.value;
        return `${indent}${symbols[node.type]} ${node.name}: ${value}`;
      })
      .join('\n');
  };
  return ['{', iter(treeDiff, 1), '}'].join('\n');
};
export default nodeStringify;
