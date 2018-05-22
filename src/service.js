export const service = {
  searchevent,
  arrayUnique
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

function arrayUnique(array) {
  var a = array;
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i].id === a[j].id)
              a.splice(j--, 1);
      }
  }

  return a;
}