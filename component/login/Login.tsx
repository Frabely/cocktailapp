import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {StyleSheet, View} from "react-native";
import TextInputWithErrorMessage from "../layout/TextInputWithErrorMessage";
import {BORDER_RADIUS, MARGIN, PADDING} from "../../constants/style_constants";
import {COLOR_BACKGROUND, COLOR_HEADER} from "../../constants/color_styles";
import FilterButton from "../home/filter/FilterButton";
import {CREATE_ACCOUNT_LABEL} from "../../constants/labels";
import {useEffect, useState} from "react";
import StyledButton from "../layout/StyledButton";
import {setIsLoadingFalse, setIsLoadingTrue} from "../../reducers/general/booleans/isLoadingReducer";
import {EMAIL_MISSING, EMAIL_NOT_VERIFIED, PASSWORD_MISSING} from "../../constants/error_codes";
import {getAuth, signInWithEmailAndPassword, UserCredential} from "firebase/auth";
import {changeModalMessage} from "../../reducers/general/modalMessageReducer";
import {invertIsModalState} from "../../reducers/general/booleans/isModalReducer";
import {activeUser} from "../../reducers/user/userReducer";
import {
    app,
    fetchFullDataSetAsArray,
    fetchNewDataSetAsArray,
    getFavoritesList,
    getUser
} from "../../functions/firebase";
import {changeLanguage} from "../../reducers/user/languageReducer";
import {
    INVALID_EMAIL,
    NETWORK_REQUEST_FAILED,
    TOO_MANY_REQUESTS,
    USER_NOT_FOUND,
    WRONG_PASSWORD
} from "../../constants/error_codes_firebase";
import {getEmailError, getPasswordError} from "../../functions/getErrorFunctionsInputs";
import {createAccount} from "../../reducers/login/loginStateReducer";
import ForgotPasswordButton from "./ForgotPasswordButton";
import {invertIsCreatingAccount} from "../../reducers/login/isCreatingAccountReducer";
import {fetchFavoriteDataSetAsArray} from "../../functions/filterFunctions";
import {Cocktail, Language, RatedCocktail, User} from "../../constants/types";
import {changeRatedCocktailArray} from "../../reducers/cocktail/cocktailRatingReducer";
import {DocumentData} from "firebase/firestore";
import {changeDataSet} from "../../reducers/general/dataSetReducer";
import {GERMAN} from "../../constants/const_vars";
import en from "../../constants/en.json"
import de from "../../constants/de.json"

export default function Login({}: LoginProps) {
    const state = useAppSelector((state) => state)
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorStateEmail, setErrorStateEmail] = useState<string[] | undefined>(undefined);
    const [errorStatePassword, setErrorStatePassword] = useState<string[] | undefined>(undefined);
    const language: Language = state.language

    const auth = getAuth(app)

    useEffect(() => {
        fetchNewDataSetAsArray().then()
    }, [])

    const onLoginHandler = async () => {
        dispatch(setIsLoadingTrue())
        let errorArrayEmail: string[] = []
        let errorArrayPassword: string[] = []
        if (email === '') {
            setEmail('')
            errorArrayEmail.push(EMAIL_MISSING.code)
        }
        if (password === '') {
            errorArrayPassword.push(PASSWORD_MISSING.code)
        }
        if ((errorArrayEmail.length > 0) ||
            (errorArrayPassword.length > 0)) {
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            dispatch(setIsLoadingFalse())
            return
        }
        const user: UserCredential | void = await signInWithEmailAndPassword(auth, email, password).catch(error => {
            if (error.code === WRONG_PASSWORD.code)
                errorArrayPassword.push(WRONG_PASSWORD.code)
            else if (error.code === USER_NOT_FOUND.code)
                errorArrayEmail.push(USER_NOT_FOUND.code)
            else if (error.code === TOO_MANY_REQUESTS.code) {
                dispatch(changeModalMessage(TOO_MANY_REQUESTS.message[`${language}`]))
                dispatch(invertIsModalState())
            } else if (error.code === NETWORK_REQUEST_FAILED.code) {
                dispatch(changeModalMessage(NETWORK_REQUEST_FAILED.message[`${language}`]))
                dispatch(invertIsModalState())
            } else if (error.code === INVALID_EMAIL.code)
                errorArrayEmail.push(INVALID_EMAIL.code)
            else {
                dispatch(changeModalMessage(error.message))
                dispatch(invertIsModalState())
            }
            setErrorStateEmail(errorArrayEmail)
            setErrorStatePassword(errorArrayPassword)
            dispatch(setIsLoadingFalse())
        })
        if (user) {
            if (!user.user.emailVerified) {
                errorArrayEmail.push(EMAIL_NOT_VERIFIED.code)
                dispatch(changeModalMessage(EMAIL_NOT_VERIFIED.message[`${language}`]))
                dispatch(invertIsModalState())
                auth.signOut().then(() => {
                    dispatch(setIsLoadingFalse())
                }).catch(error => {
                    alert(error.message)
                })
                return
            }
            let userDb: User
            const resultUser: DocumentData | null | void = await getUser(user.user.uid).catch(error => {
                console.log(error.message)
            })
            if (resultUser) {
                const dataSet: Cocktail[] | undefined | void = await fetchFullDataSetAsArray().catch(error => {
                    console.log(error.message)
                })
                if (dataSet) {
                    dispatch(changeDataSet(dataSet))
                    dispatch(changeRatedCocktailArray(getRatingCocktailList(dataSet)))
                    const favoritesArray: void | string[] | undefined = await getFavoritesList(user.user.uid).catch(error => {
                        console.log(error.message)
                        dispatch(changeModalMessage(error.message))
                        dispatch(invertIsModalState())
                    })
                    if (favoritesArray) {
                        const favoriteCocktails: Cocktail[] = fetchFavoriteDataSetAsArray(favoritesArray, dataSet)
                        userDb = {
                            userID: user.user.uid,
                            email: resultUser.email,
                            username: resultUser.username,
                            languageSetting: resultUser.languageSetting,
                            favorites: favoriteCocktails
                        }
                        dispatch(activeUser(userDb))
                        if (resultUser.languageSetting == GERMAN)
                            dispatch(changeLanguage(de))
                        else
                            dispatch(changeLanguage(en))
                    }
                } else {
                    dispatch(changeModalMessage(USER_NOT_FOUND.message[`${language}`]))
                    dispatch(invertIsModalState())
                }
                dispatch(setIsLoadingFalse())
            }
        }
    }

    const getRatingCocktailList = (dataSet: Cocktail[]) => {
        let ratingList: RatedCocktail[] = []
        dataSet.map((cocktail: Cocktail) => {
            if (cocktail.idDrink && cocktail.ratingUserIDList) {
                const ratedCocktailItem: RatedCocktail = {
                    cocktailID: cocktail.idDrink,
                    userIDList: cocktail.ratingUserIDList
                }
                ratingList.push(ratedCocktailItem)
            }
        })
        return ratingList
    }


    const onCreateAccountButtonClickHandler = () => {
        setErrorStateEmail(undefined)
        setErrorStatePassword(undefined)
        dispatch(invertIsCreatingAccount())
        dispatch(createAccount())
    }

    return (
        <>
            <View style={styles.inputCard}>
                <TextInputWithErrorMessage
                    errorState={errorStateEmail ? getEmailError(errorStateEmail) : undefined}
                    setInputState={setEmail}
                    inputState={email}
                    placeholderLabel={language.labels.EMAIL_LABEL}/>
                <TextInputWithErrorMessage
                    errorState={errorStatePassword ? getPasswordError(errorStatePassword) : undefined}
                    setInputState={setPassword}
                    inputState={password}
                    placeholderLabel={language.labels.PASSWORD_LABEL}
                    isPassword={true}/>
            </View>
            <View style={{marginVertical: MARGIN / 2}}>
                <StyledButton
                    padding={PADDING}
                    onPress={onLoginHandler}
                    title={language.labels.LOGIN_LABEL}
                />
            </View>
            <View style={{marginVertical: MARGIN / 2}}>
                <FilterButton
                    isIcon={false}
                    padding={PADDING}
                    title={language.labels.CREATE_ACCOUNT_LABEL}
                    titleENG={CREATE_ACCOUNT_LABEL.en}
                    colorActive={COLOR_HEADER}
                    colorInactive={COLOR_BACKGROUND}
                    onClick={onCreateAccountButtonClickHandler}
                    state={state.isCreatingAccount}/>
            </View>
            <ForgotPasswordButton/>
        </>
    )
}

const styles = StyleSheet.create({
    inputCard: {
        width: '100%',
        marginBottom: MARGIN / 2,
        backgroundColor: COLOR_BACKGROUND,
        borderRadius: BORDER_RADIUS / 2,
    },
})

export type LoginProps = {}
