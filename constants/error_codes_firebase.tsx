import {ErrorCodesType} from "./types";

export const WRONG_PASSWORD: ErrorCodesType = {code: 'auth/wrong-password', message: {ENG: 'Wrong password', GER: 'Falsches Passwort'}}
export const USER_NOT_FOUND: ErrorCodesType = {code: 'auth/user-not-found', message: {ENG: 'User not found', GER: 'Nutzer nicht gefunden'}}
export const TOO_MANY_REQUESTS: ErrorCodesType = {code: 'auth/too-many-requests', message: {ENG: 'Too many server requests. Try again.', GER: 'Zu viele Serveranfragen. Versuche es nochmal.'}}
export const WEAK_PASSWORD: ErrorCodesType = {code: 'auth/weak-password', message: {ENG: 'Weak password. Password should be at least 6 characters long.', GER: 'Schwaches Passwort. Das Passwort sollte mindestens 6 Zeichen lang sein.'}}
export const INVALID_EMAIL: ErrorCodesType = {code: 'auth/invalid-email', message: {ENG: 'Invalid email', GER: 'Ungültige Email'}}
export const EMAIL_ALREADY_IN_USE: ErrorCodesType = {code: 'auth/email-already-in-use', message: {ENG: 'Email already in use', GER: 'Email bereits vergeben'}}
export const NETWORK_REQUEST_FAILED: ErrorCodesType = {code: 'auth/network-request-failed', message: {ENG: 'Network request failed. Try again', GER: 'Netzwerkanfrage fehlgeschlagen. Versuche es nochmal.'}}
