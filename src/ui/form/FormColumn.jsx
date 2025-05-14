import styled from "styled-components";

const StyledFormColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem 0;
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.5rem;
	color: var(--color-red-700);
`;

function FormColumn({ label, error, children }) {
	return (
		<StyledFormColumn>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormColumn>
	);
}

export default FormColumn;
