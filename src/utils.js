export const getDate = (date) =>
  (date ? new Date(date) : new Date()).toISOString().split('T')[0];
