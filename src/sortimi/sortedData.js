export function getSortedData(state) {
  const { column, type } = state.sort;

  if (column) {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;

    const sortedData = state.filteredData.slice(start, end);

    sortedData.sort((a, b) => {
      if (column === "index") {
        return type === "asc" ? a.index - b.index : b.index - a.index;
      } else if (column === "name") {
        return type === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (column === "date") {
        return type === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (column === "city") {
        return type === "asc"
          ? a.city.localeCompare(b.city)
          : b.city.localeCompare(a.city);
      } else {
        return 0;
      }
    });

    return sortedData;
  } else {
    return state.filteredData;
  }
}
