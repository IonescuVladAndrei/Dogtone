import styled from "styled-components";
import GithubLogo from "./svgs/GithubLogo";

const OutsideBox = styled.div`
	height: 16rem;
	background-color: var(--color-brand-25);
	border-top: 1px solid var(--color-grey-100);
	display: flex;

	justify-content: center;
	align-items: center;
	gap: 1.5rem;

	@media (max-width: 600px) {
		flex-direction: column;
		padding-left: 1rem;
		padding-right: 1rem;
		gap: 1rem;
	}
`;

const StyledLink = styled.a`
	height: 3rem;
`;

const StyledP = styled.p`
	color: var(--color-brand-600);
	text-align: center;

	@media (min-width: 600px) {
		font-size: 1.9rem;
		padding-right: 1.5rem;
		border-right: 1px solid var(--color-grey-200);
	}
`;

function Footer() {
	return (
		<OutsideBox>
			<StyledP>© {new Date().getFullYear()} Dogtone — Built by Ionescu Vlad Andrei</StyledP>

			<StyledLink target="_blank" href="https://github.com/IonescuVladAndrei/Dogtone">
				<GithubLogo height="30px" width="30px" color="var(--color-brand-600)" />
			</StyledLink>
		</OutsideBox>
	);
}

export default Footer;
