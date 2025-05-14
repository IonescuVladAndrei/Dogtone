// inspired by https://uiverse.io/mrpumps31232/strange-dragonfly-94

import styled from "styled-components";

const StyledSpinner = styled.div`
	margin: 5rem auto;
	width: 9.5rem;
	height: ${(props) => props.$height};
	display: flex;
	justify-content: center;
	align-items: flex-end;
	gap: 0.5rem;
`;

const Bar = styled.div`
	width: 2rem;
	height: ${(props) => props.$height};
	background-color: ${(props) =>
		props.$backgroundColor === "dark"
			? "var(--color-brand-700)"
			: props.$backgroundColor === "light"
			? "var(--color-brand-50)"
			: "var(--color-brand-700)"};
	border-radius: var(--border-radius-sm);
	animation: loading 1s ease-in-out infinite;
	animation-delay: ${(props) => `${0.1 * props.$index}s`};

	@keyframes loading {
		0% {
			height: 0rem;
		}

		50% {
			height: ${(props) => props.$height};
		}

		100% {
			height: 0rem;
		}
	}
`;

/**
 * @typedef {Object} Spinner
 * @property {string} height - The height of the spinner. Default:"5rem"
 * @property {number} nrOfBars - The number of bars. Must be between 1 and 4. Default: 4
 * @property {'light' | 'dark'} color - The color of the spinner. Default: "dark"
 */

/**
 * Documentation
 * @param {Spinner} spinner - {@link spinner} object
 */
function Spinner({ nrOfBars = 4, color = "dark", height = "5rem" }) {
	if (nrOfBars > 4) nrOfBars = 4;
	else if (nrOfBars < 1) nrOfBars = 1;

	return (
		<StyledSpinner $height={height}>
			{Array.from({ length: nrOfBars }, (_, index) => (
				<Bar key={index} $backgroundColor={color} $height={height} $index={index} />
			))}
		</StyledSpinner>
	);
}

export default Spinner;
