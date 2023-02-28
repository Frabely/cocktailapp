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
    DocumentSnapshot,
    DocumentData,
    DocumentReference,
} from "firebase/firestore";
import {DRINKS_DB, INGREDIENTS, USER_USERNAME_LOWER_DB, USERS_DB} from "../constants/const_vars";
import {Cocktail, Ingredient, RatedCocktail} from "../constants/types";

//RELEASE DB KEYS
// const firebaseConfig = {
//     apiKey: "AIzaSyBhRWfGBxpeqp4G-Zy4grwmoXUal1ZwoM0",
//     authDomain: "cocktailapp-7c353.firebaseapp.com",
//     projectId: "cocktailapp-7c353",
//     storageBucket: "cocktailapp-7c353.appspot.com",
//     messagingSenderId: "715123707440",
//     appId: "1:715123707440:web:8860549792e79e27a567f5",
//     measurementId: "G-RP00C84K0C"
// };

// release DB KEYS
// const firebaseConfig = {
//     apiKey: "AIzaSyBhRWfGBxpeqp4G-Zy4grwmoXUal1ZwoM0",
//     authDomain: "cocktailapp-7c353.firebaseapp.com",
//     projectId: "cocktailapp-7c353",
//     storageBucket: "cocktailapp-7c353.appspot.com",
//     messagingSenderId: "715123707440",
//     appId: "1:715123707440:web:8490e408c197cc08a567f5",
//     measurementId: "G-HTJKSPDYH7"
// };

//dev DB KEYS
const firebaseConfig = {
    apiKey: "AIzaSyDhb6XbFW96Ev915Z7T4rfhVD3JUMuh04g",
    authDomain: "cocktailapp-dev.firebaseapp.com",
    projectId: "cocktailapp-dev",
    storageBucket: "cocktailapp-dev.appspot.com",
    messagingSenderId: "616842015944",
    appId: "1:616842015944:web:b45fefcab2c925a0f961fd"
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

export const createUserInDb: (creationData: CreationData) => Promise<void> = async (creationData: CreationData) => {
    await setDoc(doc(db, `${USERS_DB}/${creationData.userID}`), {
        username: creationData.username,
        usernameLower: creationData.username.toLowerCase(),
        email: creationData.email,
        languageSetting: creationData.languageSetting,
        favorites: creationData.favorites
    })
}

export const isUsernameUsed: (username: string) => Promise<boolean> = async (username: string) => {
    const usersRef = collection(db, USERS_DB);
    const queryResult = query(usersRef, where(USER_USERNAME_LOWER_DB, "==", username.toLowerCase()));
    const querySnapshot = await getDocs(queryResult);
    return !querySnapshot.empty;
}

export const updateUser: (userID: string, creationData: UpdateData<any>) => Promise<void> =
    async (userID: string, creationData: UpdateData<any>) => {
        const userRef = doc(db, `${USERS_DB}/${userID}`);
        await updateDoc(userRef, creationData).then()
    }

export const getUser: (userID: string) => Promise<DocumentData | null> = async (userID: string) => {
    const userRef = doc(db, `${USERS_DB}/${userID}`);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        return null
    }
}

export const getFavoritesList: (userID: string) => Promise<string[] | undefined> = async (userID: string) => {
    const userFavoritesRef = doc(db, `${USERS_DB}/${userID}`);
    return await getDoc(userFavoritesRef).then((docSnapshot) => {
        const favArray: string[] = docSnapshot.get("favorites")
        if (!favArray || favArray.length === 0) {
            return []
        } else {
            return favArray
        }
    }).catch(error => {
        console.log(error.message)
        alert(error.message)
        return undefined
    })
}

export const fetchFullDataSetAsArray: () => Promise<undefined | Cocktail[]> = async () => {
    const drinksRef = collection(db, DRINKS_DB);
    const querySnapshot = await getDocs(drinksRef).catch(error => {
        console.log(error.message)
    })
    if (querySnapshot && !querySnapshot.empty) {
        let result: Promise<(Cocktail | undefined)>[] = querySnapshot.docs.map(async (databaseCocktail) => {
            const resultMappedCocktail: Cocktail | void = await setCocktailFromDoc(databaseCocktail).catch(error => {
                console.log(error.message)
            })
            if (resultMappedCocktail) {
                return {...resultMappedCocktail, dateModified: null}
            }
        })
        let returnArray: (Cocktail | undefined)[] = await Promise.all(result)
        let isCocktailUndefined: boolean = false
        let filteredArray: Cocktail[] = []
            returnArray.map((cocktail) => {
                if (!cocktail) {
                    isCocktailUndefined = true
                }
                if (cocktail)
                    filteredArray.push(cocktail)

        })
        if (isCocktailUndefined)
            return undefined
        return filteredArray
    }
}

export const fetchFullIngredientsDataSetAsArray: () => Promise<Ingredient[]> = async () => {
    const ingredientsRef = collection(db, INGREDIENTS);
    const querySnapshot = await getDocs(ingredientsRef).catch(error => {
        console.log(error.message)
        return undefined
    })
    let ingredientArray: Ingredient[] = []
    if (querySnapshot && !querySnapshot.empty) {
        // TODO do this in function and use it in cocktail resolve as well
        ingredientArray = querySnapshot.docs.map((databaseIngredient) => {
            const ingredient: Ingredient = {
                idIngredient: databaseIngredient.id,
                alcoholVolume: databaseIngredient.get("alcoholVolume")
            }
            return ingredient
        })
    }
    return ingredientArray
}

export const updateRatingLists: (ratedCocktailList: RatedCocktail[], userID: string) => void
    = (ratedCocktailList: RatedCocktail[], userID: string) => {
    ratedCocktailList.map(async (ratedCocktail: RatedCocktail) => {
        if (ratedCocktail.userIDList.includes(userID)) {
            const drinkRef = doc(db, `${DRINKS_DB}/${ratedCocktail.cocktailID}`);
            const ratingUserIDList: string[] = await getDoc(drinkRef).then((cocktail) => {
                if (cocktail) {
                    return cocktail.get("ratingUserIDList")
                }
            }).catch(error => {
                console.log(error.message)
            })
            const updateList = [...ratingUserIDList]
            if (updateList.includes(userID))
                return
            updateList.push(userID)
            await updateDoc(drinkRef, {ratingUserIDList: updateList}).then(() => {
                return
            }).catch(error => {
                console.log(error.message)
            })
        }
    })
}

const setCocktailFromDoc: (docResult: DocumentSnapshot) => Promise<Cocktail> = async (docResult: DocumentSnapshot): Promise<Cocktail> => {
    let categoryResultPromise: DocumentSnapshot = await readReference(docResult.get("category"))
    let ingredients: DocumentSnapshot[] = await readReferenceList(docResult.get("ingredientsLiquid"))
    let ingredientsList: Ingredient[] = []
    ingredients.map((ingredient: DocumentSnapshot) => {
        let ingredientItem: Ingredient = {
            idIngredient: ingredient.id,
            alcoholVolume: ingredient.get("alcoholVolume")
        }
        ingredientsList.push(ingredientItem)
    })

    return {
        "idDrink": docResult.id,
        "alcoholic": docResult.get("alcoholic"),
        "category": categoryResultPromise.id,
        "ingredientsList": ingredientsList,
        "liquidMeasuresML": docResult.get("liquidMeasuresML"),
        "ingredientsOptionalList": docResult.get("ingredientsOptional"),
        "dateModified": docResult.get("dateModified"),
        "ratingUserIDList": docResult.get("ratingUserIDList")
    }
}

const readReference = async (reference: DocumentReference) => {
    return await getDoc(reference)
}
const readReferenceList = async (referenceList: DocumentReference[]) => {
    const reads: Promise<DocumentSnapshot>[] = referenceList.map((reference: DocumentReference) => getDoc(reference))
    const result: DocumentSnapshot[] = await Promise.all(reads)
    return result.map((doc: DocumentSnapshot) => doc)
}
