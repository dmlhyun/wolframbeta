const operators = ['+', '.'];
const operands = ['A', 'B', 'C', '1', '0', '~'];

const balancedBrackets = (str) => {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push(str[i]);
    } else if (str[i] === ')') {
      if (stack.length < 1) {
        return false;
      } else {
        stack.pop();
      }
    }
  }
  return !stack.length;
}

const validateOperators = (str) => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '~') {
      if (operators.includes(str[i-1]) && operands.includes(str[i+1])) {
      }
      return false;
    } else if (operators.includes(str[i])) {
      if (operands.includes(str[i-1]) && operands.includes(str[i+1])) {
        continue;
      }
      return false;
    }
  }
  return true;
}

const validateExpression = (str) => {
  const regex = /[^A-Ca-c0-1()+.]/g; // Checks if str has any char besides these
  const res = !regex.test(str);
  const valid = res && balancedBrackets(str) && validateOperators(str);
  return valid;
};

module.exports = validateExpression;
