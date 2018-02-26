//TODO write better tests using jest, or mocha & chai
const utilities = require('./utilities.js');

//testing
// console.log(simplifyExpression('(A+0)'));
// console.log(simplifyExpression('(A+1)'));
// console.log(simplifyExpression('(A.0)'));
// console.log(simplifyExpression('(A.1)'));
// console.log(simplifyExpression('(A.A)'));
// console.log(simplifyExpression('(A+A)'));
// console.log(simplifyExpression('((A+A)+0)'));
// console.log(simplifyExpression('((A+A)+1)'));
// console.log(simplifyExpression('(A+(((A+A)+A)+A)+A))'));

// console.log('test convertToBinary');
// console.log(utilities.convertToBinary('XY'));
// console.log(utilities.convertToBinary('XYZ'));
// console.log(utilities.convertToBinary('~XYZ'));

console.log('test findPrimeImplicants');
console.log(utilities.findPrimeImplicants(['000','001']));

console.log('test qmc');
console.log(utilities.qmc('XYZ+XYZ'));
console.log(utilities.qmc('XX'));

console.log('test expand');
console.log(utilities.expand('X', 'Y+Z'));
console.log(utilities.expand('X+Y', 'X+Z'));

console.log('test simplifyExpression');
console.log(utilities.simplifyExpression('X+Y'));
