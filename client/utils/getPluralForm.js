/**
 * Plural form
 * @param  {integer} number
 * @param  {Array} forms  plural forms
 * @return {string}
 */
export default function (number, forms) {
  if (!Number.isInteger(number)) throw new Error('Number must be an integer');
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)];
  return forms[index];
}
