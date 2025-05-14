import styled from "styled-components";
import LogIn from "../features/log-in/LogIn";

const LoginLayout = styled.main`
	min-height: 100dvh;
	display: grid;
	align-content: center;
	justify-content: center;
	gap: 3rem;
	background-color: var(--color-grey-50);
	padding-bottom: 8rem;
	padding-top: 3rem;

	@media (min-width: 500px) {
		grid-template-columns: 50rem;
	}

	@media (max-width: 510px) {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
`;

const LoginBox = styled.div`
	margin-top: 8rem;

	@media (max-width: 500px) {
		margin-top: 2rem;
	}

	@media (max-width: 510px) {
		width: calc(100dvw - 1rem);
	}
`;

const StyledHeading = styled.h4`
	font-size: 3rem;
	font-weight: 700;
	text-align: center;
	margin-top: 1rem;
`;

function LogInPage() {
	return (
		<LoginLayout>
			<StyledHeading>Log in</StyledHeading>
			<LoginBox>
				<LogIn />
			</LoginBox>
		</LoginLayout>
	);
}

export default LogInPage;
