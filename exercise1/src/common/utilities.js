export const simplifyExpression = () => {
};

export const validateExpression = (str) => {
	const regex = /[^A-Ca-c0-1()^+.~]/g; // Checks if str has any char besides these
	const res = regex.test(str);
	return res;
};