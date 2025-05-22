import styled, { css } from "styled-components";
import { EducationFiltersType } from "./educationFiltersEnum";

const OutsideBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;

	${(props) =>
		props.$isMobile &&
		css`
			span {
				@media (max-width: 600px) {
					font-size: 2rem;
				}
			}

			@media (max-width: 600px) {
				flex-direction: column;
			}
		`}
`;

const Span = styled.span`
	font-weight: 500;
	font-size: 2.5rem;

	color: var(--color-brand-500);
	line-height: 1;
`;

const FormulaBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const DenominatorBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	margin-top: 0.1rem;
	padding-top: 0.1rem;
	border-top: 3px solid var(--color-brand-600);
`;

const ValueSpan = styled.span`
	color: ${(props) => (props.$isNumber ? "var(--color-purple-600)" : "inherit")};
`;

function Formula({ filter, formulaVal, isMobile }) {
	return (
		<OutsideBox $isMobile={isMobile}>
			<div>
				<Span>R' = G' = B' =</Span>
			</div>
			{filter === EducationFiltersType.AVERAGE_GREYSCALE ? (
				<FormulaBox>
					<Span>
						<ValueSpan $isNumber={!isNaN(formulaVal.r)}>{formulaVal.r}</ValueSpan> +{" "}
						<ValueSpan $isNumber={!isNaN(formulaVal.g)}>{formulaVal.g}</ValueSpan> +{" "}
						<ValueSpan $isNumber={!isNaN(formulaVal.b)}>{formulaVal.b}</ValueSpan>
					</Span>
					<DenominatorBox>
						<Span>3</Span>
					</DenominatorBox>
				</FormulaBox>
			) : filter === EducationFiltersType.DESATURATION_GREYSCALE ? (
				<FormulaBox>
					<Span>
						max(<ValueSpan $isNumber={!isNaN(formulaVal.r)}>{formulaVal.r}</ValueSpan>,{" "}
						<ValueSpan $isNumber={!isNaN(formulaVal.g)}>{formulaVal.g}</ValueSpan>,{" "}
						<ValueSpan $isNumber={!isNaN(formulaVal.b)}>{formulaVal.b}</ValueSpan>) + min(
						<ValueSpan $isNumber={!isNaN(formulaVal.r)}>{formulaVal.r}</ValueSpan>,{" "}
						<ValueSpan $isNumber={!isNaN(formulaVal.g)}>{formulaVal.g}</ValueSpan>,{" "}
						<ValueSpan $isNumber={!isNaN(formulaVal.b)}>{formulaVal.b}</ValueSpan>){" "}
					</Span>
					<DenominatorBox>
						<Span>2</Span>
					</DenominatorBox>
				</FormulaBox>
			) : (
				<Span>
					0.3 * <ValueSpan $isNumber={!isNaN(formulaVal.r)}>{formulaVal.r}</ValueSpan> + 0.59 *{" "}
					<ValueSpan $isNumber={!isNaN(formulaVal.g)}>{formulaVal.g}</ValueSpan> + 0.11 *{" "}
					<ValueSpan $isNumber={!isNaN(formulaVal.b)}>{formulaVal.b}</ValueSpan>
				</Span>
			)}
		</OutsideBox>
	);
}

export default Formula;
