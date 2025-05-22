import { Fragment } from "react";
import styled, { css } from "styled-components";
import { memo } from "react";
import { MATRIX_LEN, MATRIX_MOBILE_LEN } from "../../constants/matrix-size";

const OutsideBox = styled.div`
	display: grid;
	grid-template-columns: min-content repeat(${(props) => props.$size}, 1fr) min-content;
	width: fit-content;
`;

const BaseBox = styled.div`
	width: 2.5rem;
	${(props) =>
		props.$pos !== props.$size + 1 &&
		props.$pos !== 0 &&
		css`
			width: 5rem;
		`}

	${(props) =>
		props.$rowStartIndex + props.$size > 100 &&
		props.$pos === 0 &&
		css`
			width: 5rem;
		`}
`;

const TopBox = styled(BaseBox)`
	height: 2.5rem;

	display: flex;
	justify-content: center;
	align-items: center;

	${(props) =>
		props.$pos !== props.$size + 1
			? css`
					border-bottom: 1px solid var(--color-grey-500);
					border-right: 1px solid var(--color-grey-500);
			  `
			: css`
					border-bottom: 1px solid var(--color-grey-500);
			  `}
`;

const BottomBox = styled(BaseBox)`
	height: 2.5rem;

	${(props) =>
		props.$pos !== props.$size + 1 &&
		css`
			border-right: 1px solid var(--color-grey-500);
		`}
`;

const PixelBox = styled(BaseBox)`
	height: 5rem;

	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;

	cursor: pointer;

	${(props) =>
		props.$pos !== props.$size + 1
			? css`
					border-bottom: 1px solid var(--color-grey-500);
					border-right: 1px solid var(--color-grey-500);
			  `
			: css`
					border-bottom: 1px solid var(--color-grey-500);
			  `}

	background-color: ${(props) => (props.$withBackground ? "var(--color-purple-600)" : "transparent")};

	transition-property: all;
	transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	transition-duration: 400ms;
`;

const PixelComp = styled.div.attrs((props) => {
	return {
		style: {
			backgroundColor: `rgb(${props.$r}, ${props.$g}, ${props.$b})`,
		},
	};
})`
	width: 4rem;
	height: 4rem;
`;

const RgbHoverBox = styled.div`
	position: absolute;
	z-index: 2;

	width: 6rem;
	height: 8rem;
	background-color: var(--color-brand-400);

	visibility: hidden;
	opacity: 0;

	${(props) =>
		props.$show
			? css`
					visibility: visible;
					opacity: 1;
			  `
			: css`
					visibility: hidden;
					opacity: 0;
			  `}

	bottom: 120%;
	left: 50%;

	display: flex;
	flex-direction: column;

	${PixelComp}:hover & {
		visibility: visible;
		opacity: 1;
	}

	transition-property: all;
	transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	transition-duration: 250ms;

	transform: translate(-50%, 0.5rem);

	pointer-events: none;

	padding: 0.4rem;
	border-radius: var(--border-radius-md);
	border: 1px solid var(--color-brand-600);
	border-bottom: 2px solid var(--color-brand-600);

	& p {
		color: var(--color-brand-50);

		& span {
			font-weight: 450;
		}
	}
`;

const SqBox = styled.div`
	position: absolute;

	width: 1rem;
	height: 1rem;

	${(props) =>
		props.$show
			? css`
					visibility: visible;
					opacity: 1;
			  `
			: css`
					visibility: hidden;
					opacity: 0;
			  `}

	bottom: 110%;
	left: 50%;

	${PixelComp}:hover & {
		visibility: visible;
		opacity: 1;
	}

	background-color: var(--color-brand-300);

	background-image: linear-gradient(to bottom right, var(--color-brand-700) 40%, var(--color-brand-400));

	transition-property: all;
	transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	transition-duration: 250ms;

	transform: translate(-50%, 0.5rem) rotate(45deg);

	border-bottom: 1px solid var(--color-brand-600);
	border-right: 1px solid var(--color-brand-600);
`;

const IndexP = styled.p`
	font-weight: 500;
	width: fit-content;

	color: var(--color-brand-500);
`;

function Matrix({ columnStartIndex = 0, rowStartIndex = 0, rgbArr, highlightPixel = false, size }) {
	if (!Array.isArray(rgbArr)) return;

	if (
		(size === MATRIX_LEN && rgbArr.length !== MATRIX_LEN * MATRIX_LEN) ||
		(size === MATRIX_MOBILE_LEN && rgbArr.length !== MATRIX_MOBILE_LEN * MATRIX_MOBILE_LEN)
	) {
		return;
	}

	return (
		<OutsideBox $size={size}>
			{Array.from({ length: size + 2 }, (_, index) => (
				<TopBox $pos={index} key={`top-${index}`} $size={size} $rowStartIndex={rowStartIndex}>
					{index !== 0 && index !== size + 1 && <IndexP>{columnStartIndex + index - 1}</IndexP>}
				</TopBox>
			))}
			{Array.from({ length: size }, (_, rowIndex) => (
				<Fragment key={`pixel-row-${rowIndex}`}>
					{Array.from({ length: size + 2 }, (_, columnIndex) => {
						const isMatch = highlightPixel === rowIndex * size + columnIndex - 1 && columnIndex !== 0 && columnIndex !== size + 1;

						return (
							<PixelBox
								$pos={columnIndex}
								key={`pixel-${rowIndex}-${columnIndex}`}
								$withBackground={isMatch}
								$size={size}
								$rowStartIndex={rowStartIndex}
							>
								{columnIndex === 0 && <IndexP>{rowStartIndex + rowIndex}</IndexP>}
								{columnIndex !== 0 && columnIndex !== size + 1 && (
									<PixelComp
										$r={rgbArr[rowIndex * size + columnIndex - 1].r}
										$g={rgbArr[rowIndex * size + columnIndex - 1].g}
										$b={rgbArr[rowIndex * size + columnIndex - 1].b}
									>
										<RgbHoverBox $show={isMatch}>
											<p>
												R: <span>{rgbArr[rowIndex * size + columnIndex - 1].r}</span>
											</p>
											<p>
												G: <span>{rgbArr[rowIndex * size + columnIndex - 1].g}</span>
											</p>
											<p>
												B: <span>{rgbArr[rowIndex * size + columnIndex - 1].b}</span>
											</p>
										</RgbHoverBox>
										<SqBox $show={isMatch}></SqBox>
									</PixelComp>
								)}
							</PixelBox>
						);
					})}
				</Fragment>
			))}
			{Array.from({ length: size + 2 }, (_, index) => (
				<BottomBox $pos={index} key={`bottom-${index}`} $size={size} $rowStartIndex={rowStartIndex}></BottomBox>
			))}
		</OutsideBox>
	);
}

export default memo(Matrix);
