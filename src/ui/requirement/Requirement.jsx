import styled from "styled-components";

import TickSvg from "../svgs/TickSvg";
import CloseSvg from "../svgs/CloseSvg";

const StyledSpan = styled.span`
	user-select: none;
	line-height: 1.3;
	color: ${(props) => (props.$isCorrect ? "var(--color-green-700)" : "var(--color-red-700)")};
`;

const StyledRequirement = styled.div`
	user-select: none;
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 1rem;
`;

/**
 * @typedef {Object} Requirement
 * @property {string} text - The text that gets rendered.
 * @property {boolean} isCorrect - If the requirement is met.
 */

/**
 * Documentation
 * @param {Requirement} requirement - {@link requirement} object
 */
function Requirement({ isCorrect, text }) {
	return (
		<StyledRequirement>
			{isCorrect ? (
				<TickSvg color={"var(--color-green-700)"} height="24px" width="24px" />
			) : (
				<CloseSvg color={"var(--color-red-700)"} height="24px" width="24px" />
			)}
			<StyledSpan $isCorrect={isCorrect}>{text}</StyledSpan>
		</StyledRequirement>
	);
}

export default Requirement;
