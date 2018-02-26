const findPrimeImplicants = require('./findPrimeImplicants.js');
const operators = ['+', '.'];
const operands = ['X', 'Y', 'Z', '1', '0', '~'];

const simplifyExpression = (exp) => {
  let ops = [];
  let vals = [];
  let inner_exp = '';
  let final_exp = '';

  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === "(" && i != 0 && exp[i-1] != '+' && exp[i-1] != ')') {
      vals.push(inner_exp);
      inner_exp = '';
      ops.push('.');
    } else if (exp[i] === "+" || exp[i] === ".") {
      vals.push(inner_exp);
      inner_exp = '';
      ops.push(exp[i]);
    } else if (exp[i] === ")") {
      let op = ops.pop();
      if (op == '.') {
        let exp1 = vals.pop();
        let exp2 = vals.pop();
        vals.push(expand(exp1, exp2));
      } else {
        vals.push(`${exp1}+${exp2}`);
      }
    } else {
      inner_exp = inner_exp + exp[i];
    }
  }
  return qmc(vals[0]);
}

const expand = (exp1, exp2) => {
  let exp1Arr = exp1.split('+');
  let exp2Arr = exp2.split('+');

  let expandedArr = [];

  exp1Arr.forEach((term1) => {
    exp2Arr.forEach((term2) => {
      expandedArr.push(term1 + term2);
    });
  });
  return expandedArr.join('+')
}

const qmc = (exp) => {
  let placeholder_dict = {};

  const convertToStr = (simplified) => {
    let counter = 0;
    let str = '';

    operands.forEach((op) => {
      if(placeholder_dict[op] && simplified[counter] == '1') {
        str = str + op;
      } else if (placeholder_dict[op] && simplified[counter] == '0') {
        str = str + `~${op}`;
      }
    });

    return str;
  }

  const convertToBinary = (term) => {
    let negate = false;
    let binary_str = '';

    for (let i = 0; i < term.length; i++) {
      if (term[i] == '~') {
        negate = !negate;
      } else if (!placeholder_dict[term[i]]) {
        if (negate) {
            placeholder_dict[term[i]] = '0';
            negate = false;
        } else {
            placeholder_dict[term[i]] = '1';
        }
      }
    }

    operands.forEach((op) => {
      if(placeholder_dict[op]) {
        binary_str = binary_str + placeholder_dict[op];
      }
    });

    return binary_str;
  }

  let terms_arr = exp.split('+');
  let terms_in_binary = terms_arr.map(convertToBinary);
  let simplified_in_binary = findPrimeImplicants(terms_in_binary);
  let simplified_str_arr = simplified_in_binary.map(convertToStr);
  let simplified_exp = simplified_str_arr.join('+');

  return simplified_exp;
}

module.exports = {simplifyExpression, expand, qmc}
