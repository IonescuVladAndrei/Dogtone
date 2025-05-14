import CryptoJS from "crypto-js";
import { EMAIL_LEN, EMAIL_REGEX } from "../common/email-regex.js";
import { PASSWORD_REGEXP } from "../common/password-regex.js";
import { NAME_LEN, NAME_REGEXP } from "../common/name-regex.js";

const ENCR_KEY = "RJHjFwbt2zwit1F";
// Should be stored in a .env file, but this is a backend simulator

/**
 * Function that encrypts a string.
 *
 * @param {string} val - The value to be encrypted.
 *
 * @returns {string} - Returns the encrypted value.
 */
export function encrypt(val) {
	const encryptedVal = CryptoJS.AES.encrypt(val, ENCR_KEY).toString();

	return encryptedVal;
}

/**
 * Function that decrypts a string.
 *
 * @param {string} val - The value to be decrypted.
 *
 * @returns {string} - Returns the decrypted value.
 */
export function decrypt(val) {
	const bytes = CryptoJS.AES.decrypt(val, ENCR_KEY);

	const decryptedVal = bytes.toString(CryptoJS.enc.Utf8);

	return decryptedVal;
}

/**
 * Function that checks if the email is valid.
 *
 * @param {string} email - The value to be tested.
 *
 * @returns {string} - Returns an error message if the value is not valid, or an empty string if the value is valid.
 */
export function testEmail(email) {
	if (!EMAIL_REGEX.test(email)) return "Email is not valid";
	if (email.length < EMAIL_LEN.min) return `Email is required to contain at least ${EMAIL_LEN.min} characters`;
	if (email.length > EMAIL_LEN.max) return `Email is required to contain at most ${EMAIL_LEN.max} characters`;

	return "";
}

/**
 * Function that checks if the password is valid.
 *
 * @param {string} password - The value to be tested.
 *
 * @returns {string} - Returns an error message if the value is not valid, or an empty string if the value is valid.
 */
export function testPassword(password) {
	if (!PASSWORD_REGEXP.test(password)) return "Password does not meet the requirements";

	return "";
}

/**
 * Function that checks if the firstName is valid.
 *
 * @param {string} firstName - The value to be tested.
 *
 * @returns {string} - Returns an error message if the value is not valid, or an empty string if the value is valid.
 */
export function testFirstName(firstName) {
	if (firstName === undefined) return "First name is required";
	if (!NAME_REGEXP.test(firstName)) return "First name contains invalid characters";
	if (firstName.length < NAME_LEN.min) return `First name is required to contain at least ${NAME_LEN.min} characters`;
	if (firstName.length > NAME_LEN.max) return `First name is required to contain at most ${NAME_LEN.max} characters`;

	return "";
}

/**
 * Function that checks if the lastName is valid.
 *
 * @param {string} lastName - The value to be tested.
 *
 * @returns {string} - Returns an error message if the value is not valid, or an empty string if the value is valid.
 */
export function testLastName(lastName) {
	if (lastName === undefined) return "Last name is required";
	if (!NAME_REGEXP.test(lastName)) return "Last name contains invalid characters";
	if (lastName.length < NAME_LEN.min) return `Last name is required to contain at least ${NAME_LEN.min} characters`;
	if (lastName.length > NAME_LEN.max) return `Last name is required to contain at most ${NAME_LEN.max} characters`;

	return "";
}
