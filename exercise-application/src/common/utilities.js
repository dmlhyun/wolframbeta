// only works for 5 cases so far
export const simplifyExpression = (expression) => {
  let ops = [];
  let vals = [];

  let exp = expression;
  if (exp[0] !== '(' && exp[exp.length-1] !== ')') {
    exp = '(' + expression + ')';
  }

  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === "(") {

    } else if (exp[i] === "+" || exp[i] === ".") {
      ops.push(exp[i])
    } else if (exp[i] === ")") {
      let op = ops.pop();
      let val1 = vals.pop();
      let val2 = vals.pop();
      let sorted = [val1, val2].sort();
      if (sorted[0] === sorted[1]) {
        vals.push(val1);
      } else if (op === '.') {
        if (sorted[0] === '0') {
          vals.push(sorted[0]);
        } else if (sorted[0] === '1') {
          vals.push(sorted[1]);
        } else {
          return expression;
        }
      } else if (op === '+') {
        if (sorted[0] === '0') {
          vals.push(sorted[1]);
        } else if (sorted[0] === '1') {
          vals.push(sorted[0]);
        } else {
          return expression;
        }
      } else {
        return expression;
      }
    } else {
      vals.push(exp[i])
    }
  }
  return vals[0];
};

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
  const operators = ['+', '.'];
  const operands = ['A', 'B', 'C', '1', '0', '~'];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '~') {
      if (operators.includes(str[i-1]) && operands.includes(str[i+1])) {
        continue;
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

export const validateExpression = (str) => {
  const regex = /[^A-Ca-c0-1()+.]/g; // Checks if str has any char besides these
  const res = !regex.test(str);
  const valid = res && balancedBrackets(str) && validateOperators(str);
  return valid;
};
