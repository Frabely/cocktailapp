import {ErrorCodesType} from "./types";

export const WRONG_PASSWORD: ErrorCodesType = {code: 'auth/wrong-password', messageKey: "WRONG_PASSWORD"}
export const USER_NOT_FOUND: ErrorCodesType = {code: 'auth/user-not-found', messageKey: "USER_NOT_FOUND"}
export const TOO_MANY_REQUESTS: ErrorCodesType = {code: 'auth/too-many-requests', messageKey: "TOO_MANY_REQUESTS"}
export const WEAK_PASSWORD: ErrorCodesType = {code: 'auth/weak-password', messageKey: "WEAK_PASSWORD"}
export const INVALID_EMAIL: ErrorCodesType = {code: 'auth/invalid-email', messageKey: "INVALID_EMAIL"}
export const EMAIL_ALREADY_IN_USE: ErrorCodesType = {code: 'auth/email-already-in-use', messageKey: "EMAIL_ALREADY_IN_USE"}
export const NETWORK_REQUEST_FAILED: ErrorCodesType = {code: 'auth/network-request-failed', messageKey: "NETWORK_REQUEST_FAILED"}
