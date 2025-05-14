import { useEffect, useState } from "react";
import styled from "styled-components";

const OutsideBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 2rem;
	align-items: center;
`;

const StyledSlider = styled.input`
	appearance: none;
	width: 100%;
	height: 0.7rem;
	background: var(--color-brand-0);
	outline: none;
	border: 0.1rem solid var(--color-brand-700);
	border-radius: var(--border-radius-sm);

	&:focus {
		outline: none;
	}

	&::-moz-range-thumb {
		width: 1rem;
		height: 4rem;

		background: var(--color-brand-700);
		cursor: pointer;

		border: none;
		border-radius: var(--border-radius-sm);
	}

	&::-webkit-slider-thumb {
		appearance: none;

		width: 1rem;
		height: 4rem;

		background: var(--color-brand-700);
		cursor: pointer;
		border-radius: var(--border-radius-sm);
	}
`;

const StyledInput = styled.input`
	border: 0.1rem solid var(--color-grey-300);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-sm);
	padding: 0.8rem 1.2rem;
	box-shadow: var(--shadow-sm);
	width: 7rem;
	text-align: center;
`;

/**
 * @typedef {Object} Slider
 * @property {number} value - The state value.
 * @property {function} setValue - Function called to set state value.
 * @property {number} min - The minimum value.
 * @property {number} max - The maximum value.
 */

/**
 * Documentation
 * @param {Slider} slider - {@link slider} object
 */
function Slider({ value, setValue, min, max, ...props }) {
	const [inputVal, setInputVal] = useState(value);

	useEffect(() => {
		setInputVal(value);
	}, [value]);

	function handleBlur() {
		if (!isNaN(inputVal)) {
			const localNr = +inputVal;

			if (localNr > max) {
				setValue(max);
			} else if (localNr < min) {
				setValue(min);
			} else {
				setValue(Math.floor(localNr));
			}
		} else {
			setInputVal(value);
		}
	}

	return (
		<OutsideBox>
			<StyledSlider type="range" min={min} max={max} value={inputVal} 
			onChange={(e) => setInputVal(+e.target.value)} 
			onMouseUp={(e) => setValue(+e.target.value)}
			onTouchEnd={(e) => setValue(+e.target.value)}
			{...props} />
			<StyledInput value={inputVal} onChange={(e) => setInputVal(e.target.value)} onBlur={handleBlur} />
		</OutsideBox>
	);
}

export default Slider;
