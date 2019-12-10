export const generatePermutations = <V>(items: V[], res: V[] = []): V[][] => {
  if (!items.length) {
    return [res];
  } else {
    return items
      .map(item =>
        generatePermutations(
          items.filter(i => i !== item),
          [...res, item],
        ),
      )
      .reduce((p, c) => [...p, ...c], []);
  }
};
