import styled from "styled-components";

const Form = styled.form`
	padding: 2.4rem 4rem;
	overflow: hidden;
	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-sm);

	@media (max-width: 980px) {
		padding: 1.2rem 2rem;
		gap: 2rem;
	}

	@media (max-width: 500px) {
		padding: 1.2rem 1rem;
	}
`;

export default Form;
