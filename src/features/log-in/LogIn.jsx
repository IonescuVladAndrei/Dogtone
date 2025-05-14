import { useState } from "react";
import Form from "../../ui/form/Form";
import FormColumn from "../../ui/form/FormColumn";
import InputPassword from "../../ui/inputs/PasswordInput";
import Input from "../../ui/inputs/Input";
import styled, { css } from "styled-components";
import NavigLink from "../../ui/NavigLink";
import Button from "../../ui/buttons/Button";
import { EMAIL_LEN, EMAIL_REGEX } from "../../../common/email-regex";
import { MAX_PASSWORD_LEN } from "../../../common/password-regex";
import { useLogIn } from "./useLogIn";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../../ui/spinners/SpinnerMini";

const StyledError = styled.p`
	color: transparent;
	${(props) =>
		props.$active &&
		css`
			color: var(--color-red-700);
		`}
	user-select: none;
`;

const SignUpBox = styled.div`
	margin-top: 1rem;
	display: flex;
	gap: 0.2rem;
`;

const InfoP = styled.p`
	color: var(--color-grey-400);
	width: fit-content;
`;

function LogIn() {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState(".");

	const navigate = useNavigate();
	const { login, isFetching: isLoading } = useLogIn();

	function handleSubmit(e) {
		e.preventDefault();
		if (!email) {
			setError("Please enter your email.");
			return;
		} else if (!EMAIL_REGEX.test(email)) {
			setError("Please enter a valid email address.");
			return;
		} else if (email.length < EMAIL_LEN.min) {
			setError(`Email is required to contain at least ${EMAIL_LEN.min} characters.`);
		} else if (email.length > EMAIL_LEN.max) {
			setError(`Email is required to contain at most ${EMAIL_LEN.max} characters.`);
		} else if (!password) {
			setError("Please enter your password.");
			return;
		} else if (password.length > MAX_PASSWORD_LEN) {
			setError(`Password is required to contain at most ${MAX_PASSWORD_LEN} characters.`);
			return;
		} else setError(".");

		login({ email, password }, { onSuccess: () => navigate("/homepage", { replace: true }) });
	}

	return (
		<Form>
			<FormColumn label="Email">
				<Input value={email} onChange={(e) => setEmail(e.target.value)} id={"email"} />
			</FormColumn>

			<FormColumn label="Password">
				<InputPassword value={password} setValue={setPassword} id={"password"} />
			</FormColumn>

			<FormColumn>
				<StyledError $active={error !== "."}>{error}</StyledError>
			</FormColumn>

			<FormColumn>
				<Button type="primary" disabled={isLoading} onClick={handleSubmit}>
					{isLoading ? <SpinnerMini width="1.6rem"/> : <span>Log in</span>}
				</Button>
			</FormColumn>

			<FormColumn>
				<SignUpBox>
					<InfoP>Don&apos;t have an account?</InfoP>
					<NavigLink to={"/sign-up"}>
						<span>Sign up</span>
					</NavigLink>
				</SignUpBox>
			</FormColumn>
			<NavigLink to={"/homepage"}>
				<span>Homepage</span>
			</NavigLink>
		</Form>
	);
}

export default LogIn;
