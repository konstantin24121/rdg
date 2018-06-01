const zad = ({ str, ...other }) => {
  console.log(`zad${str}`);
  console.log(other);
};

zad({
  str: 'zad',
  zad: 1,
  foo: 2,
});
