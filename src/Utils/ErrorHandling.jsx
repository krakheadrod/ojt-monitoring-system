export const checkOrganization = (parsedData, orgsName) => {
  for (let i = 0; i < parsedData.length; i++) {
    if (orgsName.includes(parsedData[i].orgsName)) {
      return true
    } else {
      return false
    }
  }
}
