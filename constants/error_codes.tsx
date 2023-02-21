import {ErrorCodesType} from "./types";

export const USERNAME_MISSING: ErrorCodesType = {code: 'username-missing', message: {en: 'Username missing', de: 'Nutzername fehlt'}}
export const USERNAME_ALREADY_USED: ErrorCodesType = {code: 'username-already-used', message: {en: 'Username already used', de: 'Nutzername bereits vergeben'}}
export const EMAIL_MISSING: ErrorCodesType = {code: 'email-missing', message: {en: 'Email missing', de: 'Email fehlt'}}
export const OLD_PASSWORD_MISSING: ErrorCodesType = {code: 'old-password-missing', message: {en: 'Old Password missing', de: 'Altes Passwort fehlt'}}
export const NEW_PASSWORD_MISSING: ErrorCodesType = {code: 'new-password-missing', message: {en: 'New Password missing', de: 'Neues Passwort fehlt'}}
export const PASSWORD_MISSING: ErrorCodesType = {code: 'password-missing', message: {en: 'Password missing', de: 'Passwort fehlt'}}
export const REPEAT_PASSWORD_MISSING: ErrorCodesType = {code: 'repeat-password-missing', message: {en: 'Repeated password missing', de: 'Wiederholtes Passwort fehlt'}}
export const PASSWORDS_NOT_MATCHING: ErrorCodesType = {code: 'passwords-not-matching', message: {en: 'Passwords not matching', de: 'Passwörter stimmen nicht überein'}}
export const OLD_AND_NEW_PASSWORDS_MATCHING: ErrorCodesType = {code: 'old-and-new-passwords-matching', message: {en: 'Old and new Passwords are matching', de: 'Altes und neues Passwort stimmen überein'}}
export const EMAIL_NOT_VERIFIED: ErrorCodesType = {code: 'email-not-verified', message: {
    en: 'Email address not verified. Check your mailbox to verify the account',
    de: 'Emailadresse nicht bestätigt. Schauen Sie in Ihr Postfach um den Account to aktivieren.'
}}
