export const sortArrayOfObjects = (a: any, b: any, key: string, order = 'asc') => {
  const valueA = a[key];
  const valueB = b[key];

  if (valueA < valueB) return order === 'asc' ? -1 : 1;
  if (valueA > valueB) return order === 'asc' ? 1 : -1;
  return 0;
};
