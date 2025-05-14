import { useState } from "react";
import styled from "styled-components";
import { EMAIL_LEN, EMAIL_REGEX } from "../../../common/email-regex";
import { NAME_LEN, NAME_REGEXP } from "../../../common/name-regex";
import { PASSWORD_REGEXP_ARR } from "../../../common/password-regex";
import Button from "../../ui/buttons/Button";
import Form from "../../ui/form/Form";
import FormColumn from "../../ui/form/FormColumn";
import Input from "../../ui/inputs/Input";
import InputPassword from "../../ui/inputs/PasswordInput";
import NavigLink from "../../ui/NavigLink";
import RequirementHandler from "../../ui/requirement/RequirementHandler";
import { useSignUp } from "./useSignUp";
import SpinnerMini from "../../ui/spinners/SpinnerMini";

const LogInBox = styled.div`
	margin-top: 1rem;
	display: flex;
	gap: 0.2rem;
`;

const InfoP = styled.p`
	color: var(--color-grey-400);
	width: fit-content;
`;

function SignUp() {
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);
	const [error, setError] = useState({ field: null, msg: null });

	const { signup, isFetching: isLoading } = useSignUp();

	function handleSubmit(e) {
		e.preventDefault();
		if (!email) {
			setError({ field: "email", msg: "Please enter your email." });
			return;
		} else if (!EMAIL_REGEX.test(email)) {
			setError({ field: "email", msg: "Please enter a valid email address." });
			return;
		} else if (email.length < EMAIL_LEN.min) {
			setError({ field: "email", msg: `Email is required to contain at least ${EMAIL_LEN.min} characters.` });
			return;
		} else if (email.length > EMAIL_LEN.max) {
			setError({ field: "email", msg: `Email is required to contain at most ${EMAIL_LEN.max} characters.` });
			return;
		} else if (!firstName) {
			setError({ field: "firstName", msg: "Please enter your first name." });
			return;
		} else if (!NAME_REGEXP.test(firstName)) {
			setError({
				field: "firstName",
				msg: `First name contains invalid characters. The following characters are allowed: a-z, A-Z, 0-9, ', ’ or -.`,
			});
			return;
		} else if (firstName.length < NAME_LEN.min) {
			setError({ field: "firstName", msg: `First name is required to contain at least ${NAME_LEN.min} characters.` });
			return;
		} else if (firstName.length > NAME_LEN.max) {
			setError({ field: "firstName", msg: `First name is required to contain at most ${NAME_LEN.max} characters.` });
			return;
		} else if (!lastName) {
			setError({ field: "lastName", msg: "Please enter your last name." });
			return;
		} else if (!NAME_REGEXP.test(lastName)) {
			setError({
				field: "lastName",
				msg: `Last name contains invalid characters. The following characters are allowed: a-z, A-Z, 0-9, ', ’ or -.`,
			});
			return;
		} else if (lastName.length < NAME_LEN.min) {
			setError({ field: "lastName", msg: `Last name is required to contain at least ${NAME_LEN.min} characters.` });
			return;
		} else if (lastName.length > NAME_LEN.max) {
			setError({ field: "lastName", msg: `Last name is required to contain at most ${NAME_LEN.max} characters.` });
			return;
		} else setError({ field: null, msg: null });

		signup({ email, password, firstName, lastName });
	}

	return (
		<Form>
			<FormColumn label="Email" error={error.field === "email" && error.msg}>
				<Input
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setError({ field: null, msg: null });
					}}
					id={"email"}
				/>
			</FormColumn>

			<FormColumn label="First name" error={error.field === "firstName" && error.msg}>
				<Input
					value={firstName}
					onChange={(e) => {
						setFirstName(e.target.value);
						setError({ field: null, msg: null });
					}}
					id={"firstName"}
				/>
			</FormColumn>

			<FormColumn label="Last name" error={error.field === "lastName" && error.msg}>
				<Input
					value={lastName}
					onChange={(e) => {
						setLastName(e.target.value);
						setError({ field: null, msg: null });
					}}
					id={"lastName"}
				/>
			</FormColumn>

			<FormColumn label="Password">
				<InputPassword value={password} setValue={setPassword} id={"password"} />
			</FormColumn>

			<FormColumn>
				<RequirementHandler requirements={PASSWORD_REGEXP_ARR} setCanSubmit={setCanSubmit} value={password} />
			</FormColumn>

			<FormColumn>
				<Button type="primary" disabled={isLoading || !canSubmit} onClick={handleSubmit}>
					{isLoading ? <SpinnerMini width="1.6rem" /> : <span>Sign up</span>}
				</Button>
			</FormColumn>

			<FormColumn>
				<LogInBox>
					<InfoP>Already have an account?</InfoP>
					<NavigLink to={"/log-in"}>
						<span>Log in</span>
					</NavigLink>
				</LogInBox>
			</FormColumn>

			<NavigLink to={"/homepage"}>
				<span>Homepage</span>
			</NavigLink>
		</Form>
	);
}

export default SignUp;
