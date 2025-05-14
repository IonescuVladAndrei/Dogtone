import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { queryKey_user } from "../../constants/user-query-key";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Button from "../../ui/buttons/Button";
import InitialsButton from "./InitialsButton";

const OutsideBox = styled.div`
	height: 5rem;
	background-color: var(--color-brand-25);
	border-bottom: 1px solid var(--color-grey-100);
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const ButtonBox = styled.div`
	margin-right: 1rem;
	position: relative;
`;

const OptionsBox = styled.div`
	background-color: var(--color-brand-25);
	position: absolute;
	right: 0;
	width: 14rem;
	display: flex;
	flex-direction: column;
	transition: max-height 0.33s ease-in, padding-top 0.33s ease-in, border-top 0.33s ease-in, margin-top 0.33s ease-in;

	max-height: 0;
	overflow: hidden;
	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-sm);

	${(props) =>
		props.$showOptions &&
		css`
			max-height: ${props.$maxHeight};
			border: 1px solid var(--color-grey-200);
			margin-top: 0.8rem;
			padding: 0.4rem 0;
		`}
`;

const StyledButton = styled(Button)`
	justify-content: flex-start;
	height: 3.6rem;

	width: 100%;

	padding-left: 0.8rem;
	font-weight: 450;
	color: var(--color-grey-500);
	border-radius: 0%;

	&:hover&:not(:disabled) {
		background-color: var(--color-grey-200);
	}
`;

function Header() {
	const [showOptions, setShowOptions] = useState(false);
	const [maxHeight, setMaxHeight] = useState("0px");
	const optionsRef = useRef(null);
	const [key, setKey] = useState(0);

	const handler = () => setShowOptions(false);
	const outsideClickRef = useOutsideClick(handler);

	const queryClient = useQueryClient();
	const cachedUserData = queryClient.getQueryData([queryKey_user]);
	const { firstName, lastName, email } = cachedUserData ?? {};

	const isLoggedIn = firstName && lastName && email;

	function handleClick() {
		setShowOptions((so) => !so);
		if (!showOptions) {
			if (optionsRef.current) {
				setMaxHeight(`${optionsRef.current.scrollHeight + 1 + 8 + 8 + 2 + 33}px`);
				// +1px to round up
				// +8px for margin top, +8px padding top & bottom, +2px for border
				// + 2x16.5px for buttons
			}
		}
	}

	return (
		<OutsideBox>
			<ButtonBox ref={outsideClickRef}>
				{!isLoggedIn ? (
					<InitialsButton onClick={() => handleClick()} />
				) : (
					<InitialsButton firstName={firstName} lastName={lastName} onClick={() => handleClick()} />
				)}

				<OptionsBox ref={optionsRef} $showOptions={showOptions} $maxHeight={maxHeight}>
					{!isLoggedIn ? (
						<>
							<NavLink to="/log-in">
								<StyledButton type="transparent">
									<span>Log in</span>
								</StyledButton>
							</NavLink>

							<NavLink to="/sign-up">
								<StyledButton type="transparent">
									<span>Sign up</span>
								</StyledButton>
							</NavLink>
						</>
					) : (
						<>
							<StyledButton type="transparent" disabled={true}>
								<span>{`${email.slice(0, 4)}xxxxxx`}</span>
							</StyledButton>
							<StyledButton
								type="transparent"
								onClick={() => {
									queryClient.removeQueries([queryKey_user]);
									setKey(key + 1);
								}}
							>
								<span>Sign out</span>
							</StyledButton>
						</>
					)}
				</OptionsBox>
			</ButtonBox>
		</OutsideBox>
	);
}

export default Header;
