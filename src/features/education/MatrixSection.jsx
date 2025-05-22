import { useRef, useState } from "react";
import Button from "../../ui/buttons/Button";
import Formula from "./Formula";
import Matrix from "./Matrix";
import styled, { css } from "styled-components";
import { memo } from "react";
import { MATRIX_LEN, MATRIX_MOBILE_LEN } from "../../constants/matrix-size";

const OutsideBox = styled.div`
	@media (max-width: 1280px) {
		overflow-x: auto;
		max-width: calc(100vw - 7.5rem);
		padding-bottom: 2rem;
	}

	@media (max-width: 900px) {
		max-width: calc(100vw - 3.5rem);
	}
`;

const ButtonsBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	width: fit-content;
	margin-top: 2rem;
`;

const MatrixBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;

	row-gap: 2rem;
	justify-items: center;

	margin-top: 7rem;

	@media (max-width: 1280px) {
		column-gap: 3rem;
	}

	${(props) =>
		props.$isMobile
			? css`
					@media (min-width: 600px) {
						& > :nth-child(3) {
							grid-column: span 2;
						}
					}

					@media (max-width: 600px) {
						grid-template-columns: 1fr;

						& > :nth-child(1) {
							order: 1;
						}

						& > :nth-child(2) {
							order: 3;
						}

						& > :nth-child(3) {
							order: 2;
						}
					}
			  `
			: css`
					& > :nth-child(3) {
						grid-column: span 2;
					}
			  `}
`;

function MatrixSection({ pixArr, rowStartIndex, columnStartIndex, filPixArr, filter, isAnimating, setIsAnimating, size }) {
	const [highlightPixel, setHighlightPixel] = useState(null);
	const [highlightPixel_final, setHighlightPixel2_final] = useState(null);
	const [formulaVal, setFormulaVal] = useState({ r: "R", g: "G", b: "B" });
	const timeoutsRef = useRef([]);

	const handleHighlight = () => {
		handleReset();
		setIsAnimating(true);

		for (let i = 0; i < pixArr.length; i++) {
			const outerTimeout = setTimeout(() => {
				setHighlightPixel(i);
				const innerTimeout_r = setTimeout(() => setFormulaVal((val) => ({ ...val, r: pixArr[i].r })), 1000);
				const innerTimeout_g = setTimeout(() => setFormulaVal((val) => ({ ...val, g: pixArr[i].g })), 2000);
				const innerTimeout_b = setTimeout(() => setFormulaVal((val) => ({ ...val, b: pixArr[i].b })), 3000);
				const innerTimeout_matrix = setTimeout(() => setHighlightPixel2_final(i), 4000);
				const innerTimeout_res = setTimeout(() => {
					setHighlightPixel(null);
					setHighlightPixel2_final(null);
					setFormulaVal({ r: "R", g: "G", b: "B" });

					if (i === pixArr.length - 1) {
						setIsAnimating(false);
					}
				}, 5000);

				timeoutsRef.current.push(innerTimeout_r);
				timeoutsRef.current.push(innerTimeout_g);
				timeoutsRef.current.push(innerTimeout_b);
				timeoutsRef.current.push(innerTimeout_matrix);
				timeoutsRef.current.push(innerTimeout_res);
			}, i * 6000);

			timeoutsRef.current.push(outerTimeout);
		}
	};

	const handleReset = () => {
		timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
		timeoutsRef.current = [];

		setHighlightPixel(false);
		setHighlightPixel2_final(false);
		setIsAnimating(false);
		setFormulaVal({ r: "R", g: "G", b: "B" });
	};

	const showButtons =
		Array.isArray(pixArr) && (pixArr.length === MATRIX_LEN * MATRIX_LEN || pixArr.length === MATRIX_MOBILE_LEN * MATRIX_MOBILE_LEN);

	return (
		<OutsideBox>
			{showButtons && (
				<ButtonsBox>
					<Button type="secondary" onClick={handleHighlight} disabled={isAnimating}>
						<span>Start animation</span>
					</Button>
					<Button type="secondary" onClick={handleReset}>
						<span>Reset</span>
					</Button>
				</ButtonsBox>
			)}

			<MatrixBox $isMobile={size === MATRIX_MOBILE_LEN}>
				<Matrix
					rgbArr={pixArr}
					rowStartIndex={rowStartIndex}
					columnStartIndex={columnStartIndex}
					highlightPixel={highlightPixel}
					size={size}
				/>
				<Matrix
					rgbArr={filPixArr}
					rowStartIndex={rowStartIndex}
					columnStartIndex={columnStartIndex}
					highlightPixel={highlightPixel_final}
					size={size}
				/>
				{showButtons && <Formula filter={filter} formulaVal={formulaVal} isMobile={size === MATRIX_MOBILE_LEN} />}
			</MatrixBox>
		</OutsideBox>
	);
}

export default memo(MatrixSection);
