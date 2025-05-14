import styled from "styled-components";
import Button from "../../ui/buttons/Button";
import PersonSvg from "../../ui/svgs/PersonSvg";

const Initials = styled.div`
	width: 3.5rem;
	height: 3.5rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;

	color: var(--color-brand-25);
	background-color: var(--color-brand-600);

	& p {
		text-transform: uppercase;
		font-weight: 500;
		font-size: 1.7rem;
		user-select: none;
	}
`;

const StyledButton = styled(Button)`
	padding: 0.2rem;

	&:focus {
		box-shadow: 0 0 0 2px var(--color-brand-300);
	}
`;

function InitialsButton({ firstName, lastName, ...props }) {
	return (
		<StyledButton type="transparent" {...props}>
			{!firstName || !lastName ? (
				<PersonSvg color="var(--color-brand-600)" height="35px" width="35px" />
			) : (
				<Initials>
					<p>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</p>
				</Initials>
			)}
		</StyledButton>
	);
}

export default InitialsButton;
