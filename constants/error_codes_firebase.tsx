import {ErrorCodesType} from "./types";

//TODO rework how error codes are resolved - use them from json

export const WRONG_PASSWORD: ErrorCodesType = {code: 'auth/wrong-password', message: {en: 'Wrong password', de: 'Falsches Passwort'}}
export const USER_NOT_FOUND: ErrorCodesType = {code: 'auth/user-not-found', message: {en: 'User not found', de: 'Nutzer nicht gefunden'}}
export const TOO_MANY_REQUESTS: ErrorCodesType = {code: 'auth/too-many-requests', message: {en: 'Too many server requests. Try again.', de: 'Zu viele Serveranfragen. Versuche es nochmal.'}}
export const WEAK_PASSWORD: ErrorCodesType = {code: 'auth/weak-password', message: {en: 'Weak password. Password should be at least 6 characters long.', de: 'Schwaches Passwort. Das Passwort sollte mindestens 6 Zeichen lang sein.'}}
export const INVALID_EMAIL: ErrorCodesType = {code: 'auth/invalid-email', message: {en: 'Invalid email', de: 'Ungültige Email'}}
export const EMAIL_ALREADY_IN_USE: ErrorCodesType = {code: 'auth/email-already-in-use', message: {en: 'Email already in use', de: 'Email bereits vergeben'}}
export const NETWORK_REQUEST_FAILED: ErrorCodesType = {code: 'auth/network-request-failed', message: {en: 'Network request failed. Try again', de: 'Netzwerkanfrage fehlgeschlagen. Versuche es nochmal.'}}
