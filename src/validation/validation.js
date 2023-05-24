export function isDuplicateName(data, editedItem) {
  const duplicateItem = data.find(
    (item) => item.name === editedItem.name && item.id !== editedItem.id
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