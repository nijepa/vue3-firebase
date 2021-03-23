import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDuhIjUpfSmV88XRAx1tLz1pnUxepEB0Qo",
  authDomain: "dojo-blog-18aa1.firebaseapp.com",
  projectId: "dojo-blog-18aa1",
  storageBucket: "dojo-blog-18aa1.appspot.com",
  messagingSenderId: "580524981221",
  appId: "1:580524981221:web:5e806493a9f552341c0d0c"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }