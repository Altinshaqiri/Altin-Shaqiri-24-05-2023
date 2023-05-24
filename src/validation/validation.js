export function isDuplicateName(data, nameItem, newName) {
  const duplicateItem = data.find(
    (item) => item.name === newName && item.name !== nameItem
  );
  return !!duplicateItem; 
}

export function validateFields(newUser) {
  if (
    newUser.name.trim() === "" ||
    newUser.date.trim() === "" ||
    newUser.city.trim() === ""
  ) {
    return false;
  }
  return true;
}
