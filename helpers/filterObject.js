export function filterObject(obj, ...fieldsToRemove) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    if (!fieldsToRemove.includes(key)) {
      result[key] = value;
    }

    return result;
  }, {});
}
