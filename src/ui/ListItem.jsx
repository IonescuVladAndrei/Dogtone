import styled, { css } from "styled-components";
import RadioButton from "./buttons/RadioButton";
import Collapsible from "./Collapsible";

const StyledLi = styled.li`
	display: flex;
	gap: 2rem;
	flex-direction: column;
`;

const InsideBox = styled.div`
	display: flex;
	gap: 1rem;

	${(props) =>
		props.$withColl &&
		css`
			margin-bottom: 1rem;
		`}
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.span`
	font-weight: 500;
	cursor: pointer;
	width: fit-content;

	${(props) =>
		props.$withColl &&
		css`
			margin-bottom: 1rem;
		`}
`;

const Description = styled.span`
	color: var(--color-grey-500);
	line-height: 1.3;
`;

const RadioBox = styled.div`
	height: 2.4rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

/**
 * @typedef {Object} ListItem
 * @property {string} label - Label text.
 * @property {string} description - Description text.
 * @property {function} onClick - Function called when the radio button or label is clicked.
 * @property {boolean} isChecked - If the option is selected.
 * @property {boolean} withColl - Will replace the description with a collapsible. Default: false.
 * @property {function} collComponent - The component rendered by the collapsible.
 */

/**
 * Documentation
 * @param {ListItem} listItem - {@link listItem} object
 */
function ListItem({ label, description, onClick, isChecked, withColl = false, collComponent, children }) {
	return (
		<StyledLi>
			<InsideBox $withColl={withColl}>
				<RadioBox>
					<RadioButton isChecked={isChecked} onClick={onClick} height="16px" width="16px" />
				</RadioBox>
				<TextBox>
					<Label onClick={onClick} $withColl={withColl}>
						{label}
					</Label>
					{withColl ? <Collapsible text={description}>{collComponent}</Collapsible> : <Description>{description}</Description>}
				</TextBox>
			</InsideBox>
			{isChecked && children}
		</StyledLi>
	);
}

export default ListItem;
