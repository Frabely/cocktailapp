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
    deleteDoc,
    DocumentSnapshot,
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
    favorites: string[]
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUserInDb = async (creationData: CreationData) => {
    await setDoc(doc(db, `${USERS_DB}/${creationData.userID}`), {
        username: creationData.username,
        usernameLower: creationData.username.toLowerCase(),
        email: creationData.email,
        languageSetting: creationData.languageSetting,
        favorites: creationData.favorites
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
            return undefined
        } else if (result?.docs) {
            let favoriteArray: string[] = []
            result.docs.map((item) => {
                favoriteArray.push(item.id)
            })
            return favoriteArray
        }
    }).catch(error => {
        console.log(error.message)
        alert(error.message)
        return undefined
    })
}

export const fetchFullDataSetAsArray = async () => {
    const usersRef = collection(db, `${DRINKS_DB}`);
    return await getDocs(usersRef).then((result) => {
        if (!result.empty) {
            let returnArray: Cocktail[] = []
            result.docs.map((item) => {
                returnArray.push(setCocktailFromDoc(item))
            })
            return returnArray
        }
    }).catch(error => {
        console.log(error.message)
        return undefined
    })
}

const setCocktailFromDoc = (docResult: DocumentSnapshot) => {
    let cocktail: Cocktail = {
        "idDrink": docResult.get("idDrink"),
        "strDrink": docResult.get("strDrink"),
        "strDrinkAlternate": docResult.get("strDrinkAlternate"),
        "strTags": docResult.get("strTags"),
        "strVideo": docResult.get("strVideo"),
        "strCategory": docResult.get("strCategory"),
        "strIBA": docResult.get("strIBA"),
        "strAlcoholic": docResult.get("strAlcoholic"),
        "strGlass": docResult.get("strGlass"),
        "strInstructions": docResult.get("strInstructions"),
        "strInstructionsES": docResult.get("strInstructionsES"),
        "strInstructionsDE": docResult.get("strInstructionsDE"),
        "strInstructionsFR": docResult.get("strInstructionsFR"),
        "strInstructionsIT": docResult.get("strInstructionsIT"),
        "strInstructionsZH-HANS": docResult.get("strInstructionsZH-HANS"),
        "strInstructionsZH-HANT": docResult.get("strInstructionsZH-HANT"),
        "strDrinkThumb": docResult.get("strDrinkThumb"),
        "strIngredient1": docResult.get("strIngredient1"),
        "strIngredient2": docResult.get("strIngredient2"),
        "strIngredient3": docResult.get("strIngredient3"),
        "strIngredient4": docResult.get("strIngredient4"),
        "strIngredient5": docResult.get("strIngredient5"),
        "strIngredient6": docResult.get("strIngredient6"),
        "strIngredient7": docResult.get("strIngredient7"),
        "strIngredient8": docResult.get("strIngredient8"),
        "strIngredient9": docResult.get("strIngredient9"),
        "strIngredient10": docResult.get("strIngredient10"),
        "strIngredient11": docResult.get("strIngredient11"),
        "strIngredient12": docResult.get("strIngredient12"),
        "strIngredient13": docResult.get("strIngredient13"),
        "strIngredient14": docResult.get("strIngredient14"),
        "strIngredient15": docResult.get("strIngredient15"),
        "strMeasure1": docResult.get("strMeasure1"),
        "strMeasure2": docResult.get("strMeasure2"),
        "strMeasure3": docResult.get("strMeasure3"),
        "strMeasure4": docResult.get("strMeasure4"),
        "strMeasure5": docResult.get("strMeasure5"),
        "strMeasure6": docResult.get("strMeasure6"),
        "strMeasure7": docResult.get("strMeasure7"),
        "strMeasure8": docResult.get("strMeasure8"),
        "strMeasure9": docResult.get("strMeasure9"),
        "strMeasure10": docResult.get("strMeasure10"),
        "strMeasure11": docResult.get("strMeasure11"),
        "strMeasure12": docResult.get("strMeasure12"),
        "strMeasure13": docResult.get("strMeasure13"),
        "strMeasure14": docResult.get("strMeasure14"),
        "strMeasure15": docResult.get("strMeasure15"),
        "strImageSource": docResult.get("strImageSource"),
        "strImageAttribution": docResult.get("strImageAttribution"),
        "strCreativeCommonsConfirmed": docResult.get("strCreativeCommonsConfirmed"),
        "dateModified": docResult.get("dateModified")
    }
    return cocktail
}
