export const findClassDetails = (className, classes) => {
  return classes.find(c => c.Name === className);
};