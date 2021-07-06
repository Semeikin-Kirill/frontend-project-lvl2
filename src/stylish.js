import _ from 'lodash';

export default (value, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return String(currentValue);
    }

    const indentSize = depth * spacesCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 2);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`,
    );

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, 1);
};
