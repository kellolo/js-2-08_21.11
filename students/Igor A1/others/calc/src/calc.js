const add = (a, b) => {
  let ab = [Number(a), Number(b)]
  if (isNaN(ab[0]) || isNaN(ab[1]))
    return NaN;
  return ab[0] + ab[1];
};

const subtract = (a, b) => {
  let ab = [Number(a), Number(b)]
  if (isNaN(ab[0]) || isNaN(ab[1]))
    return NaN;
  return ab[0] - ab[1];
};

const multiply = (a, b) => {
  let ab = [Number(a), Number(b)]
  if (isNaN(ab[0]) || isNaN(ab[1]))
    return NaN;
  return ab[0] * ab[1];
};

const divide = (a, b) => {
  let ab = [Number(a), Number(b)]
  if (isNaN(ab[0]) || isNaN(ab[1]))
    return NaN;
  return ab[0] / ab[1];
};

const pow = (a, n) => {
  let ab = [Number(a), Number(n)]
  if (isNaN(ab[0]) || isNaN(ab[1]))
    return NaN;

  let result = 1;
  for (let i = 0 ; i < ab[1]; i++) {
    result *= ab[0];
  };
  
  return result;
};

module.exports = {add, subtract, multiply, divide, pow};
