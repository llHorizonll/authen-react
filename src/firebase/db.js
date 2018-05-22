import {
  db
} from './firebase';
// User API
const usersCollectionRef = db.collection('users');

//Event API
const eventsCollectionRef = db.collection('events');



export const doCreateUser = (username, email = '', photo = '') => {
  let colorarr = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688",
    "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"
  ]
  let color = colorarr[Math.floor(Math.random() * colorarr.length)];
  return usersCollectionRef.add({
    username,
    color,
    email,
    photo
  });
}


export const doUpdateColorUser = (id, color) =>
  usersCollectionRef.doc(id).update(color)

export const onceGetUsers = () => {
  return usersCollectionRef.get().then(snapshot => {
    let arr = [];
    snapshot.forEach(function (doc) {
      arr.push({
        email: doc.data().email,
        username: doc.data().username,
        color: doc.data().color,
        photo: doc.data().photo,
        id: doc.id,
      })
    })
    return arr
  })
}

export const getEventList = () => {
  return eventsCollectionRef.get().then(snapshot => {
    let arr = [];
    snapshot.forEach((doc) => {
      arr.push({
        description: doc.data().description,
        end: doc.data().end,
        start: doc.data().start,
        title: doc.data().title,
        username: doc.data().username,
        color: doc.data().color,
        id: doc.id,
      })
    })
    return arr
  })
}

export const doCreateEvent = (event) =>
  eventsCollectionRef.add(event)

export const doUpdateEvent = (id, event) =>
  eventsCollectionRef.doc(id).set(event)

export const doUpdateColorEvent = (id, color) =>
  eventsCollectionRef.doc(id).update(color)

export const doRemoveEvent = (id) =>
  eventsCollectionRef.doc(id).delete()


// Other db APIs ...

//TODO: add events to db