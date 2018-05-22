import { auth,provider } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

// Google Sign In 
export const doSignInGoogle = () => auth.signInWithPopup(provider);

// Sign out
export const doSignOut = () => {
  auth.signOut();
}

// Password Reset
export const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) => auth.currentUser.updatePassword(password);
