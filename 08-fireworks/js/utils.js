export const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
}

export const hypotenuse = (a, b) => {
  return Math.sqrt(a*a + b*b);
}