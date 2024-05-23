import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBLjRWSXCUpNXJ_N1KQWPXZZsq25U_hkbQ',
  authDomain: 'ztm-vue-music-25923.firebaseapp.com',
  projectId: 'ztm-vue-music-25923',
  storageBucket: 'ztm-vue-music-25923.appspot.com',
  //   messagingSenderId: '358549763384',
  appId: '1:358549763384:web:7837bbfe89bc9febb97dcd'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }
