import axios from "axios";

const BASE_URL = "http://localhost:6969";

/**
 * Function which throws an error.
 *
 * @param {object} err - The error object which should be a nested object.
 * @param {string} genericMessage - Generic error message in case err.response.data.error is undefined.
 */
export function throwErr(err, genericMessage) {
	if (!err.response?.data?.error) {
		console.error(genericMessage);
		throw new Error(err);
	} else throw new Error(err.response.data.error);
}

/**
 * Log in function which sends a request to the json server.
 *
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @returns {Promise<{ email: string, firstName: string, lastName: string }>} - API response which contains user's data.
 */
export async function logInApi({ email, password }) {
	let response;

	try {
		response = await axios.post(`${BASE_URL}/log-in`, { email, password });

		response = response.data;
	} catch (err) {
		throwErr(err);
	}

	return response;
}

/**
 * Sign up function which sends a request to the json server.
 *
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @param {string} params.firstName - The user's first name.
 * @param {string} params.lastName - The user's last name.
 * @returns {Promise<{ email: string, firstName: string, lastName: string }>} - API response which contains user's data.
 */
export async function signUpApi({ email, password, firstName, lastName }) {
	let response;

	try {
		response = await axios.post(`${BASE_URL}/sign-up`, { email, password, firstName, lastName });

		response = response.data;
	} catch (err) {
		throwErr(err);
	}

	return response;
}
