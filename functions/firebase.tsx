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
import {DRINKS_DB, USER_FAVORITES_DB, USER_USERNAME_LOWER_DB, USERS_DB} from "../constants/const_vars";
import {Cocktail} from "../constants/types";

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
    await updateDoc(userRef, creationData).then()
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
        } else {
            await setDoc(userFavoritesDrinkRef, {}).then().catch(error => {
                console.log(error.message)
                alert(error.message)
            })
            return
        }
    })
    return
}

export const getFavoritesList = async (userID: string) => {
    const userFavoritesRef = collection(db, `${USERS_DB}/${userID}/${USER_FAVORITES_DB}`);
    return await getDocs(userFavoritesRef).then(result => {
        if (result.empty) {
            return null
        } else if (result?.docs) {
            return result.docs
        }
    }).catch(error => {
        console.log(error.message)
        alert(error.message)
    })
}

export const fetchDataSetAsArray = async () => {
    const usersRef = collection(db, `${DRINKS_DB}`);
    return await getDocs(usersRef).then((result) => {
        if (!result.empty) {
            let returnArray: Cocktail[] = []
            result.docs.map((item) => {
                let cocktail: Cocktail = {
                    "idDrink": item.get("idDrink"),
                    "strDrink": item.get("strDrink"),
                    "strDrinkAlternate": item.get("strDrinkAlternate"),
                    "strTags": item.get("strTags"),
                    "strVideo": item.get("strVideo"),
                    "strCategory": item.get("strCategory"),
                    "strIBA": item.get("strIBA"),
                    "strAlcoholic": item.get("strAlcoholic"),
                    "strGlass": item.get("strGlass"),
                    "strInstructions": item.get("strInstructions"),
                    "strInstructionsES": item.get("strInstructionsES"),
                    "strInstructionsDE": item.get("strInstructionsDE"),
                    "strInstructionsFR": item.get("strInstructionsFR"),
                    "strInstructionsIT": item.get("strInstructionsIT"),
                    "strInstructionsZH-HANS": item.get("strInstructionsZH-HANS"),
                    "strInstructionsZH-HANT": item.get("strInstructionsZH-HANT"),
                    "strDrinkThumb": item.get("strDrinkThumb"),
                    "strIngredient1": item.get("strIngredient1"),
                    "strIngredient2": item.get("strIngredient2"),
                    "strIngredient3": item.get("strIngredient3"),
                    "strIngredient4": item.get("strIngredient4"),
                    "strIngredient5": item.get("strIngredient5"),
                    "strIngredient6": item.get("strIngredient6"),
                    "strIngredient7": item.get("strIngredient7"),
                    "strIngredient8": item.get("strIngredient8"),
                    "strIngredient9": item.get("strIngredient9"),
                    "strIngredient10": item.get("strIngredient10"),
                    "strIngredient11": item.get("strIngredient11"),
                    "strIngredient12": item.get("strIngredient12"),
                    "strIngredient13": item.get("strIngredient13"),
                    "strIngredient14": item.get("strIngredient14"),
                    "strIngredient15": item.get("strIngredient15"),
                    "strMeasure1": item.get("strMeasure1"),
                    "strMeasure2": item.get("strMeasure2"),
                    "strMeasure3": item.get("strMeasure3"),
                    "strMeasure4": item.get("strMeasure4"),
                    "strMeasure5": item.get("strMeasure5"),
                    "strMeasure6": item.get("strMeasure6"),
                    "strMeasure7": item.get("strMeasure7"),
                    "strMeasure8": item.get("strMeasure8"),
                    "strMeasure9": item.get("strMeasure9"),
                    "strMeasure10": item.get("strMeasure10"),
                    "strMeasure11": item.get("strMeasure11"),
                    "strMeasure12": item.get("strMeasure12"),
                    "strMeasure13": item.get("strMeasure13"),
                    "strMeasure14": item.get("strMeasure14"),
                    "strMeasure15": item.get("strMeasure15"),
                    "strImageSource": item.get("strImageSource"),
                    "strImageAttribution": item.get("strImageAttribution"),
                    "strCreativeCommonsConfirmed": item.get("strCreativeCommonsConfirmed"),
                    "dateModified": item.get("dateModified")
                }
                returnArray.push(cocktail)
            })
            return returnArray
        }
    }).catch(error => {
        console.log(error.message)
        return undefined
    })
}
