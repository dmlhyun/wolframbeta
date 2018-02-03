// only works for 5 cases so far
export const simplifyExpression = (exp) => {
  let ops = [];
  let vals = [];

  if (exp[0] !== '(' && exp[exp.length-1] !== ')') {
    exp = '(' + exp + ')';
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
      if (op === '.') {
        if (val1 === '0') {
          vals.push('0');
        } else if (val1 === '1') {
          vals.push(val2);
        } else if (val1 === val2) {
          vals.push(val1);
        }
      } else {
        if (val1 === '0') {
          vals.push(val2);
        } else if (val1 === '1') {
          vals.push('1');
        } else if (val1 === val2) {
          vals.push(val1);
        }
      }
    } else {
      vals.push(exp[i])
    }
  }
  return vals[0];
};

export const validateExpression = (str) => {
  const regex = /[^A-Ca-c0-1()^+.~]/g; // Checks if str has any char besides these
  const res = regex.test(str);
  return res;
}; 
