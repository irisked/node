const toArray = (enums: any): any[] => {
  const values: Array<any> = [];

  for (const value in enums) {
    if (value) values.push(enums[value]);
  }
  return values;
};

export default { toArray };
