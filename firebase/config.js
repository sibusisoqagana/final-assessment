// firebase setup for clinic bookings

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCzfJ1uHoNslHGjOfNvc_pV7_7w6NvtFJI",
  authDomain: "clinic-bookings-78578.firebaseapp.com",
  projectId: "clinic-bookings-78578",
  storageBucket: "clinic-bookings-78578.firebasestorage.app",
  messagingSenderId: "640787377874",
  appId: "1:640787377874:web:a64d7623d27d4b694f070b"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)