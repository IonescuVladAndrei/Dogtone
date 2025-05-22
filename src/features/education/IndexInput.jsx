import { useEffect, useState } from "react";
import Input from "../../ui/inputs/Input";
import styled from "styled-components";

const OutsideBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 35rem;

	@media (max-width: 420px) {
		flex-direction: column;
		width: fit-content;
		align-items: flex-start;
		gap: 0.4rem;
	}
`;

const StyledInput = styled(Input)`
	text-align: center;
`;

function IndexInput({ value, setValue, size, text, disabled, maxSize }) {
	const [inputVal, setInputVal] = useState(value);

	useEffect(() => {
		setInputVal(value);
	}, [value]);

	function handleBlur() {
		const parsed = parseFloat(inputVal);
		if (isNaN(parsed)) {
			setInputVal(value.toString());
		} else if (parsed > size - maxSize) {
			setValue(size - maxSize);
			setInputVal((size - maxSize).toString());
		} else if (parsed < 0) {
			setValue(0);
			setInputVal("0");
		} else {
			setValue(parsed);
			setInputVal(parsed.toString());
		}
	}

	return (
		<OutsideBox>
			<p>
				Starting {text} index {size > maxSize - 1 && `(max ${size - maxSize})`}
			</p>
			<StyledInput
				$width={"8rem"}
				value={inputVal}
				onChange={(e) => setInputVal(e.target.value)}
				onBlur={handleBlur}
				disabled={size < 10 || disabled}
			/>
		</OutsideBox>
	);
}

export default IndexInput;
