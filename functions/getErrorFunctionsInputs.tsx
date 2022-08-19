import {
    EMAIL_MISSING,
    PASSWORD_MISSING,
    PASSWORDS_NOT_MATCHING, REPEAT_PASSWORD_MISSING,
    USERNAME_ALREADY_USED,
    USERNAME_MISSING
} from "../constants/error_codes";
import {
    EMAIL_ALREADY_IN_USE,
    INVALID_EMAIL,
    USER_NOT_FOUND,
    WEAK_PASSWORD,
    WRONG_PASSWORD
} from "../constants/error_codes_firebase";

export const getUsernameError = (errorStateUsername: string[]) => {
    if (errorStateUsername.includes(USERNAME_MISSING.code))
        return USERNAME_MISSING
    if (errorStateUsername.includes(USERNAME_ALREADY_USED.code))
        return USERNAME_ALREADY_USED
    return undefined;
}

export const getEmailError = (errorStateEmail: string[]) => {
    if (errorStateEmail.includes(EMAIL_MISSING.code))
        return EMAIL_MISSING
    if (errorStateEmail.includes(INVALID_EMAIL.code))
        return INVALID_EMAIL
    if (errorStateEmail.includes(EMAIL_ALREADY_IN_USE.code))
        return EMAIL_ALREADY_IN_USE
    if (errorStateEmail.includes(USER_NOT_FOUND.code))
        return USER_NOT_FOUND
    return undefined;
}

export const getPasswordError = (errorStatePassword: string[]) => {
    if (errorStatePassword.includes(PASSWORD_MISSING.code))
        return PASSWORD_MISSING
    if (errorStatePassword.includes(WRONG_PASSWORD.code))
        return WRONG_PASSWORD
    if (errorStatePassword.includes(PASSWORDS_NOT_MATCHING.code))
        return PASSWORDS_NOT_MATCHING
    if (errorStatePassword.includes(WEAK_PASSWORD.code))
        return WEAK_PASSWORD
    return undefined;
}

export const getRepeatPasswordError = (errorStateRepeatPassword: string[]) => {
    if (errorStateRepeatPassword.includes(REPEAT_PASSWORD_MISSING.code))
        return REPEAT_PASSWORD_MISSING
    if (errorStateRepeatPassword.includes(PASSWORDS_NOT_MATCHING.code))
        return PASSWORDS_NOT_MATCHING
    if (errorStateRepeatPassword.includes(WEAK_PASSWORD.code))
        return WEAK_PASSWORD
    return undefined;
}
