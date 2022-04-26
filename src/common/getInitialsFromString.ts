const getInitialsFromString = (str: string | null | undefined): string => {
  if (str)
    return str
      .trim()
      .split(' ')
      .reduce((prev, curr) => prev[0] + curr[0]);
  return 'U';
};

export default getInitialsFromString;
