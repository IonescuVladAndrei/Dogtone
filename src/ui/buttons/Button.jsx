import styled from "styled-components";

const TransparentButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	height: fit-content;
	background-color: transparent;
	border: none;

	border-radius: 100%;

	&:focus {
		outline: none;
	}
`;

const PrimaryButton = styled.button`
	font-size: 1.4rem;
	padding: 1.2rem 1.6rem;
	font-weight: 500;

	border: none;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);

	color: var(--color-brand-50);
	background-color: var(--color-brand-500);

	&:hover&:not(:disabled) {
		background-color: var(--color-brand-700);
	}

	&:disabled {
		background-color: var(--color-grey-0);
		border: 1px solid var(--color-grey-200);
		color: var(--color-grey-400);
	}
`;

const SpaceButton = styled.button`
	/* inspired by Squarespace */
	border: none;
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	font-size: 1.4rem;
	padding: 1.2rem 1.6rem;
	font-weight: 500;

	background: var(--color-grey-0);
	margin: 0;
	position: relative;
	transition: opacity 300ms cubic-bezier(0.694, 0, 0.335, 1), background-color 100ms cubic-bezier(0.694, 0, 0.335, 1),
		color 200ms cubic-bezier(0.694, 0, 0.335, 1);

	&::before {
		animation: opacityFallbackOut 0.5s step-end forwards;
		backface-visibility: hidden;
		background-color: var(--color-brand-700);
		color: var(--color-grey-0);
		clip-path: polygon(-1% 0%, -50% 0%, -1% 101%, -1% 101%);
		content: "";
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		transform: translateZ(0);
		transition: clip-path 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
		width: 100%;
		border-radius: var(--border-radius-sm);
	}

	&:not(:disabled)&:hover::before {
		animation: opacityFallbackIn 0s step-start forwards;
		clip-path: polygon(0% 0%, 101% 0%, 101% 101%, 0% 101%);
		border-radius: var(--border-radius-sm);
	}

	&:hover&:not(:disabled) {
		color: var(--color-grey-0);
	}

	&::after {
		background: var(--color-grey-0);
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		color: var(--color-grey-400);
	}

	& span {
		z-index: 1;
		position: relative;
	}
`;

const PasswordButton = styled.button`
	background-color: transparent;
	border: none;
	width: 5.5rem;
	padding: 0.4rem 0;
	box-shadow: none;
	border-radius: var(--border-radius-sm);

	&:hover&:not(:disabled) {
		background-color: var(--color-grey-200);
	}

	&:focus {
		outline: none;
	}

	&:before {
		position: absolute;
		content: "";
		left: -1.1rem;
		top: 0;
		height: 100%;
		width: 0.1rem;
		background: var(--color-grey-200);
	}
`;

/**
 * @typedef {Object} Button
 * @property {'primary' | 'transparent' | 'space' | 'password'} type - The type of button.
 */

/**
 * Documentation
 * @param {Button} button - {@link button} object
 */
function Button({ type, children, ...props }) {
	if (type === "transparent") return <TransparentButton {...props}>{children}</TransparentButton>;

	if (type === "space") return <SpaceButton {...props}>{children}</SpaceButton>;

	if (type === "password") return <PasswordButton {...props}>{children}</PasswordButton>;

	if (type === "primary") return <PrimaryButton {...props}>{children}</PrimaryButton>;

	return <button {...props}>{children}</button>;
}

export default Button;
