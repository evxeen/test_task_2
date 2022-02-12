export const getVegans = (data) => {
  let result = [];
  data.party.forEach((person) => {
    result.push(`${person.name.replace(' ' , '%20')}`);
  })
  return result.join();
}

