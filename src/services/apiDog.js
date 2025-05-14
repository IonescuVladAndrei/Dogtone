import axios from "axios";

// await new Promise((r) => setTimeout(r, 3000));
// Can be added to function to test spinners.

const BASE_URL = "https://dog.ceo/api";

function checkStatus(data) {
	if (data.message === undefined || data.status === undefined || data.status !== "success") {
		throw new Error("Failed to fetch random dog image. Please try again later.");
	}
}

/**
 * Function that fetches a random dog image.
 *
 * @returns {Promise<{ message: string, status: string }>} - API response which contains an image URL and status.
 */
export async function fetchDogImageApi() {
	let response;

	try {
		response = await axios.get(`${BASE_URL}/breeds/image/random`);
		response = response.data;
	} catch (err) {
		console.error(err.message);
		throw new Error("Failed to fetch random dog image. Please try again later.");
	}

	checkStatus(response);

	return response;
}

/**
 * Function that fetches all dog breeds.
 *
 * @returns {Promise<{ message: [], status: string }>} - API response which contains an array with dog breeds and status.
 */
export async function fetchAllDogBreedsApi() {
	let response;

	try {
		response = await axios.get(`${BASE_URL}/breeds/list/all`);
		response = response.data;
	} catch (err) {
		console.error(err.message);
		throw new Error("Failed to fetch breeds list. Please try again later.");
	}

	checkStatus(response);

	return response;
}

/**
 * Function that fetches a random dog image based on the breed.
 *
 * @param {string} breed - The dog breed.
 * @returns {Promise<{ message: string, status: string }>} - API response which contains an image URL and status.
 */
export async function fetchDogImageByBreedApi(breed) {
	let response;

	try {
		response = await axios.get(`${BASE_URL}/breed/${breed}/images/random`);
		response = response.data;
	} catch (err) {
		console.error(err.message);
		throw new Error(`Failed to fetch dog image for ${breed} breed. Please try again later.`);
	}

	checkStatus(response);

	return response;
}
