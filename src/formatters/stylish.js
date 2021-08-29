import _ from 'lodash';

const isObject = (value) => _.isArray(value) && value.every(_.isPlainObject);

const nodeStringify = (treeDiff, replacer = ' ', spacesCount = 4) => {
  const iter = (tree, depth) => {
    const indent = replacer.repeat(depth * spacesCount - 2);
    const indentBrackets = replacer.repeat(depth * spacesCount);
    const result = tree.map((node) => {
      const { name, type, children } = node;
      const value = isObject(children)
        ? ['{', iter(children, depth + 1), `${indentBrackets}}`].join('\n')
        : children;
      if (type === 'deleted') {
        return `${indent}- ${name}: ${value}`;
      }
      if (type === 'added') {
        return `${indent}+ ${name}: ${value}`;
      }
      if (type === 'unchanged') {
        return `${indent}  ${name}: ${value}`;
      }
      if (type === 'changed') {
        const [afterChildren, beforeChildren] = value;
        const valueAfter = isObject(afterChildren)
          ? ['{', iter(afterChildren, depth + 1), `${indentBrackets}}`].join(
            '\n',
          )
          : afterChildren;
        const valueBefore = isObject(beforeChildren)
          ? ['{', iter(beforeChildren, depth + 1), `${indentBrackets}}`].join(
            '\n',
          )
          : beforeChildren;
        const after = `${indent}- ${name}: ${valueAfter}`;
        const before = `${indent}+ ${name}: ${valueBefore}`;
        return [after, before].join('\n');
      }
      return `${indent}  ${name}: ${value}`;
    });
    return [...result].join('\n');
  };
  return ['{', iter(treeDiff, 1), '}'].join('\n');
};

export default nodeStringify;
