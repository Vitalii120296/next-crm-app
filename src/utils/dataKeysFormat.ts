export const dataKeysFormat = (phrase: string) => {
  return phrase.at(0)?.toUpperCase() + phrase.slice(1).replace("_", " ");
};
