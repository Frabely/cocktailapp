import {ErrorCodesType} from "./types";

export const USERNAME_MISSING: ErrorCodesType = {code: 'username-missing', message: {ENG: 'Username missing', GER: 'Nutzername fehlt'}}
export const USERNAME_ALREADY_USED: ErrorCodesType = {code: 'username-already-used', message: {ENG: 'Username already used', GER: 'Nutzername bereits vergeben'}}
export const EMAIL_MISSING: ErrorCodesType = {code: 'email-missing', message: {ENG: 'Email missing', GER: 'Email fehlt'}}
export const OLD_PASSWORD_MISSING: ErrorCodesType = {code: 'old-password-missing', message: {ENG: 'Old Password missing', GER: 'Altes Passwort fehlt'}}
export const NEW_PASSWORD_MISSING: ErrorCodesType = {code: 'new-password-missing', message: {ENG: 'New Password missing', GER: 'Neues Passwort fehlt'}}
export const PASSWORD_MISSING: ErrorCodesType = {code: 'password-missing', message: {ENG: 'Password missing', GER: 'Passwort fehlt'}}
export const REPEAT_PASSWORD_MISSING: ErrorCodesType = {code: 'repeat-password-missing', message: {ENG: 'Repeated password missing', GER: 'Wiederholtes Passwort fehlt'}}
export const PASSWORDS_NOT_MATCHING: ErrorCodesType = {code: 'passwords-not-matching', message: {ENG: 'Passwords not matching', GER: 'Passwörter stimmen nicht überein'}}
export const OLD_AND_NEW_PASSWORDS_MATCHING: ErrorCodesType = {code: 'old-and-new-passwords-matching', message: {ENG: 'Old and new Passwords are matching', GER: 'Altes und neues Passwort stimmen überein'}}
export const EMAIL_NOT_VERIFIED: ErrorCodesType = {code: 'email-not-verified', message: {
    ENG: 'Email address not verified. Check your mailbox to verify the account',
    GER: 'Emailadresse nicht bestätigt. Schauen Sie in Ihr Postfach um den Account to aktivieren.'
}}
