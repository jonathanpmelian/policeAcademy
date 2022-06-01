export function filterThefts(filter, thefts) {
  let filteredList = [...thefts]

  // Filter status
  if (filter.status !== '') {
    const filtered = filteredList.filter(
      (theft) => theft.status === filter.status
    )
    filteredList = filtered
  }

  // Search
  if (filter.search !== '') {
    const searchList = []
    const searchTerm = filter.search.toUpperCase()
    for (let i = 0; i < filteredList.length; i++) {
      if (
        filteredList[i].licenseNumber !== null &&
        filteredList[i].licenseNumber.includes(searchTerm)
      ) {
        searchList.unshift(filteredList[i])
      }
    }
    filteredList = searchList
  }

  return filteredList
}
