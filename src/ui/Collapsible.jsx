import { useRef, useState } from "react";
import VertArrowButton from "./buttons/VertArrowButton";
import styled, { css } from "styled-components";
import { memo } from "react";

const OutsideBox = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-200);
	border-radius: var(--border-radius-md);
	padding: 1.2rem 2rem;
	box-shadow: var(--shadow-sm);

	height: fit-content;

	@media (max-width: 500px) {
		padding: 1.2rem 0.8rem;
	}
`;

const TextBox = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: space-between;
`;

const TextP = styled.p`
	color: var(--color-grey-500);
	line-height: 1.3;
`;

const ChildrenBox = styled.div`
	transition: max-height 0.5s ease-in, padding-top 0.5s ease-in, border-top 0.5s ease-in, margin-top 0.5s ease-in;

	max-height: 0;
	overflow: hidden;

	${(props) =>
		props.$isOpened &&
		css`
			max-height: ${props.$maxHeight};
			padding-top: 1.2rem;
			border-top: 1px solid var(--color-grey-200);
			margin-top: 1.2rem;
		`}
`;

/**
 * @typedef {Object} Collapsible
 * @property {string} text - Informative text.
 */

/**
 * Documentation
 * @param {Collapsible} collapsible - {@link collapsible} object
 */
function Collapsible({ text, children }) {
	const [isOpened, setIsOpened] = useState(false);
	const [maxHeight, setMaxHeight] = useState("0px");
	const childrenRef = useRef(null);

	function handleClick() {
		setIsOpened((so) => !so);
		if (!isOpened) {
			if (childrenRef.current) {
				setMaxHeight(`${childrenRef.current.scrollHeight + 1 + 25}px`);
				// +1px to round up
				// +25px for margin top, border top & padding top
			}
		}
	}

	return (
		<OutsideBox>
			<TextBox $isOpened={isOpened}>
				<TextP>{text}</TextP>
				<VertArrowButton isUp={isOpened} onClick={handleClick} height="14px" width="14px" />
			</TextBox>
			<ChildrenBox ref={childrenRef} $maxHeight={maxHeight} $isOpened={isOpened}>
				{children}
			</ChildrenBox>
		</OutsideBox>
	);
}

export default memo(Collapsible);
