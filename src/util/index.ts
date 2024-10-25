export const getUniqueId = () => {
  const id =
    Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
  return id;
};
