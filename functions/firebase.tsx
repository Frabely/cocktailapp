import {initializeApp} from "firebase/app";
import {
    UpdateData,
    collection,
    doc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    where,
    updateDoc,
    getDoc,
    deleteDoc
} from "firebase/firestore";
import {USER_FAVORITES_DB, USER_USERNAME_LOWER_DB, USERS_DB} from "../constants/const_vars";

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
    userID: string,
    username: string,
    email: string,
    languageSetting: string
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUserInDb = async (creationData: CreationData) => {
    await setDoc(doc(db, `${USERS_DB}/${creationData.userID}`), {
        username: creationData.username,
        usernameLower: creationData.username.toLowerCase(),
        email: creationData.email,
        languageSetting: creationData.languageSetting
    })
}

export const isUsernameUsed = async (username: string) => {
    const usersRef = collection(db, USERS_DB);
    const queryResult = query(usersRef, where(USER_USERNAME_LOWER_DB, "==", username.toLowerCase()));
    const querySnapshot = await getDocs(queryResult);
    return !querySnapshot.empty;
}

export const updateUser = async (userID: string, creationData: UpdateData<any>) => {
    const userRef = doc(db, `${USERS_DB}/${userID}`);
    await updateDoc(userRef, creationData)
}

export const getUser = async (userID: string) => {
    const userRef = doc(db, `${USERS_DB}/${userID}`);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        return null
    }
}

export const isFavoriteOfUser = async (userID: string, drinkID: string) => {
    let isFavorite: boolean = false
    await getDoc(doc(db, `${USERS_DB}/${userID}/${USER_FAVORITES_DB}/${drinkID}`)).then(result => {
        isFavorite = result.exists()
    }).catch(error => {
        console.log(error.message)
        alert(error.message)
    });
    return isFavorite
}

export const AddOrDeleteFavoriteOfUser = async (userID: string, drinkID: string) => {
    const userFavoritesDrinkRef = doc(db, `${USERS_DB}/${userID}/${USER_FAVORITES_DB}/${drinkID}`);
    isFavoriteOfUser(userID, drinkID).then(async result => {
        if (result) {
            await deleteDoc(userFavoritesDrinkRef).then().catch(error => {
                console.log(error.message)
                alert(error.message)
            })
            return
        }
        else {
            await setDoc(userFavoritesDrinkRef, {}).then().catch(error => {
                console.log(error.message)
                alert(error.message)
            })
            return
        }
    })
    return
}
