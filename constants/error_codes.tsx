import {ErrorCodesType} from "./types";

export const USERNAME_MISSING: ErrorCodesType = {code: 'username-missing', messageKey: "USERNAME_MISSING"}
export const USERNAME_ALREADY_USED: ErrorCodesType = {code: 'username-already-used', messageKey: "USERNAME_ALREADY_USED"}
export const EMAIL_MISSING: ErrorCodesType = {code: 'email-missing', messageKey: "EMAIL_MISSING"}
export const OLD_PASSWORD_MISSING: ErrorCodesType = {code: 'old-password-missing', messageKey: "OLD_PASSWORD_MISSING"}
export const NEW_PASSWORD_MISSING: ErrorCodesType = {code: 'new-password-missing', messageKey: "NEW_PASSWORD_MISSING"}
export const PASSWORD_MISSING: ErrorCodesType = {code: 'password-missing', messageKey: "PASSWORD_MISSING"}
export const REPEAT_PASSWORD_MISSING: ErrorCodesType = {code: 'repeat-password-missing', messageKey: "REPEAT_PASSWORD_MISSING"}
export const PASSWORDS_NOT_MATCHING: ErrorCodesType = {code: 'passwords-not-matching', messageKey: "PASSWORDS_NOT_MATCHING"}
export const OLD_AND_NEW_PASSWORDS_MATCHING: ErrorCodesType = {code: 'old-and-new-passwords-matching', messageKey: "OLD_AND_NEW_PASSWORDS_MATCHING"}
export const EMAIL_NOT_VERIFIED: ErrorCodesType = {code: 'email-not-verified', messageKey: "EMAIL_NOT_VERIFIED"}
