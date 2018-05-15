import {
  db
} from './firebase';
// User API
const usersCollectionRef = db.collection('users');

//Event API
const eventsCollectionRef = db.collection('events');

export const doCreateUser = (username, email) =>
  usersCollectionRef.add({
    username,
    email,
  });

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