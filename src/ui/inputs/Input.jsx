import styled from "styled-components";

const Input = styled.input`
	border: 0.1rem solid var(--color-grey-300);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-sm);
	padding: ${(props) => props.$padding ?? "0.8rem 1.2rem"};
	box-shadow: var(--shadow-sm);
	width: ${(props) => props.$width ?? "auto"};

	&::placeholder {
		color: var(--color-grey-300);
	}
`;

export default Input;
