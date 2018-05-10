import {
  db
} from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.collection("users").add({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.collection("users").get()

export const getEventList = () =>
  db.collection("events").get()
// Other db APIs ...

//TODO: add events to db