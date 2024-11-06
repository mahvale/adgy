import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as refdb, orderByChild, equalTo, get, set,onValue,push,serverTimestamp,limitToLast } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref,uploadBytes,getDownloadURL,listAll   } from "firebase/storage";
import { collection, addDoc,setDoc,doc,getDocs,orderBy,onSnapshot,query,where } from "firebase/firestore"; 
import { getApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';



const firebaseConfig = {
 apiKey: "AIzaSyA1B-xyHo8Cd1bg1Qmx6IWGWdRlDP9LMog",
  authDomain: "adgy-eadb2.firebaseapp.com",
  projectId: "adgy-eadb2",
  storageBucket: "adgy-eadb2.appspot.com",
  messagingSenderId: "728395677501",
  appId: "1:728395677501:web:16ede0c189385c7c3c0f54"
};

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app)
 const dbstorage = getFirestore(app)
 const db = getDatabase();
 const storageFile = getStorage(app,"gs://adgy-eadb2.appspot.com");

export function SignIn (email,password) { 
	try {
		return createUserWithEmailAndPassword(auth, email, password)
	} catch(e) {
		console.log("e");
	}
	
}



export function Profile  (email,classe,username,tel,password,uid) {
  try {
  const docRef =  setDoc(doc(dbstorage, "users",uid), {
    username:username,
    email:email,
    classe:classe,
    tel:tel,
  });
} catch (e) {
  console.error("Error adding document: ", e);
}
}

export const storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};


export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
     return value;
    }else{
      return null;
    }
  } catch (e) {
    // error reading value
  }
};

   const handleLogin = async () => {
    
  };


export { auth, db,dbstorage, ref, query, orderByChild, equalTo, get, set, signInWithEmailAndPassword, createUserWithEmailAndPassword,refdb,storageFile,onValue,push,serverTimestamp,onAuthStateChanged,signOut,uploadBytes,getDownloadURL,app,listAll,limitToLast,doc,setDoc,addDoc,collection,getDocs,onSnapshot,orderBy,where };
