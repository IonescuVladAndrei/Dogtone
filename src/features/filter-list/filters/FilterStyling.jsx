import styled, { css } from "styled-components";

export const CallBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const CallP = styled.p`
	color: var(--color-grey-500);
	line-height: 1.3;
`;

export const FormulaBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 0.5rem;

	${(props) =>
		props.$isSmallScreen &&
		css`
			@media (max-width: ${(props) => props.$maxWidth}) {
				font-size: 1.1rem;
			}
		`}
`;

export const SmallScreenBox = styled.div`
	${(props) =>
		props.$isSmallScreen
			? css`
					display: none;

					@media (max-width: ${(props) => props.$maxWidth}) {
						display: block;
					}
			  `
			: css`
					display: block;

					@media (max-width: ${(props) => props.$maxWidth}) {
						display: none;
					}
			  `}
`;

export const VarSpan = styled.span`
	color: var(--color-brand-600);
	font-weight: 500;
`;