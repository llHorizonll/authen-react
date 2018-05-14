export const service = {
  searchevent,
};

function search(nameKey, myArray) {
  if (myArray.title.toString().toLowerCase().search(nameKey.toString().toLowerCase()) !== -1) {
    return myArray;
  } else {
    return;
  }
}

function searchevent(data, s) {
  return data.filter((item) => {
    return search(s, item)
  })
}