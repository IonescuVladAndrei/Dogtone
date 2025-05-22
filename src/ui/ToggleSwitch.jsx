import styled from "styled-components";

const Switch = styled.label`
	font-size: 1.7rem;
	position: relative;
	display: inline-block;
	width: 5.6rem;
	height: 3.2rem;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
	opacity: 0;
	width: 0;
	height: 0;

	&:focus + span {
		box-shadow: 0 0 1px var(--color-brand-500);
	}

	&:checked + span {
		background-color: var(--color-brand-500);
		border: 1px solid var(--color-brand-500);
	}

	&:checked + span:before {
		transform: translateX(2.2rem);
		background-color: #fff;
	}
`;

const Slider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	border: 1px solid var(--color-grey-300);
	transition: 0.4s;
	border-radius: 3rem;

	&:before {
		position: absolute;
		content: "";
		height: 2.2rem;
		width: 2.2rem;
		border-radius: 2rem;
		left: 4.5px;
		bottom: 4px;
		background-color: var(--color-grey-300);
		transition: 0.4s;
	}
`;

const ToggleSwitch = ({ checked, onChange, isDisabled = false }) => (
	<Switch>
		<Checkbox checked={checked} onChange={onChange} disabled={isDisabled} />
		<Slider />
	</Switch>
);

export default ToggleSwitch;
