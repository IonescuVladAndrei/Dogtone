import jsonServer from "json-server";
import express from "express";
import { decrypt, encrypt, testEmail, testFirstName, testLastName, testPassword } from "./helper-functions.js";

const server = jsonServer.create();
const router = jsonServer.router("backend/data.json");
const middlewares = jsonServer.defaults();

server.use(express.json());
server.use(middlewares);

const USERS = "users";

/**
 * Handles user login by validating input credentials and checking for a matching user in data.json file.
 *
 * @route POST /log-in
 * @param {Object} req - The request object.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @param {Object} res - The response object.
 *
 * @returns {201 | 400} - Returns 201 and the user's decrypted data if credentials are valid,
 *                        otherwise returns 400 with an error message.
 */
server.post("/log-in", async (req, res) => {
	const { email, password } = req.body;

	const emailError = testEmail(email);
	if (emailError) return res.status(400).json({ error: emailError });

	if (!password) return res.status(400).json({ error: "Password is required" });

	const data = await router.db.get(USERS).value();

	const existingUser = data.find((user) => user.email === email && decrypt(user.password) === password);

	if (!existingUser) return res.status(400).json({ error: "Invalid credentials" });
	else {
		res.status(201).json({ email, firstName: decrypt(existingUser.firstName), lastName: decrypt(existingUser.lastName) });
	}
});

/**
 * Handles user signup by validating input credentials and checking for a matching user in data.json file.
 *
 * @route POST /sign-up
 * @param {Object} req - The request object.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @param {string} req.body.firstName - The user's first name.
 * @param {string} req.body.lastName - The user's last name.
 * @param {Object} res - The response object.
 *
 * @returns {201 | 400} - Returns 201 and the user's data if credentials are valid and the email isn't already in use,
 *                        otherwise returns 400 with an error message.
 */
server.post("/sign-up", async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	const emailError = testEmail(email);
	if (emailError) return res.status(400).json({ error: emailError });

	const passwordError = testPassword(password);
	if (passwordError) return res.status(400).json({ error: passwordError });

	const firstNameError = testFirstName(firstName);
	if (firstNameError) return res.status(400).json({ error: firstNameError });

	const lastNameError = testLastName(lastName);
	if (lastNameError) return res.status(400).json({ error: lastNameError });

	const data = await router.db.get(USERS).value();

	if (data.find((user) => user.email === email)) return res.status(400).json({ error: "Email is already is use" });
	else {
		const newUser = { id: Date.now(), email, password: encrypt(password), firstName: encrypt(firstName), lastName: encrypt(lastName) };
		await router.db.set(USERS, [...data, newUser]).write();
		res.status(201).json({ email, firstName, lastName });
	}
});

server.use(router);

server.listen(6969, () => {
	console.log("JSON Server is running on port 6969");
});
