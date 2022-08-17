import {initializeApp} from "firebase/app";
import {collection, doc, getDocs, getFirestore, query, setDoc, where, updateDoc} from "firebase/firestore";
import {USERS_PATH} from "../constants/const_vars";

const firebaseConfig = {
    apiKey: "AIzaSyBhRWfGBxpeqp4G-Zy4grwmoXUal1ZwoM0",
    authDomain: "cocktailapp-7c353.firebaseapp.com",
    projectId: "cocktailapp-7c353",
    storageBucket: "cocktailapp-7c353.appspot.com",
    messagingSenderId: "715123707440",
    appId: "1:715123707440:web:8860549792e79e27a567f5",
    measurementId: "G-RP00C84K0C"
};

export type CreationData = {
    path: string,
    username: string,
    email: string,
    language_setting: string
}

export type UpdateData = {
    path: string,
    language_setting: string | null
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUserInDb = async (creationData: CreationData) => {
    await setDoc(doc(db, `${creationData.path}`), {
        username: creationData.username,
        username_lower: creationData.username.toLowerCase(),
        email: creationData.email,
        language_setting: creationData.language_setting
    })
}

export const isUsernameUsed = async (username: string) => {
    const usersRef = collection(db, USERS_PATH);
    const queryResult = query(usersRef, where("username_lower", "==", username.toLowerCase()));
    const querySnapshot = await getDocs(queryResult);
    return !querySnapshot.empty;

}

export const updateUser = async (creationData: UpdateData) => {
    const userRef = doc(db, `${creationData.path}`);
    await updateDoc(userRef, creationData)
}
