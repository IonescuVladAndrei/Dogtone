import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledNavLink = styled(NavLink)`
	${(props) =>
		props.$withUnderline &&
		css`
			text-decoration: underline;
		`}

	font-weight: 450;
	&:hover,
	&:active {
		color: var(--color-brand-500);
		text-decoration: underline;
	}
`;

/**
 * @typedef {Object} NavigLink
 * @property {string} to - New path. Example: "/signup".
 * @property {boolean} $withUnderline - If true, will underline the link. True by default.
 */

/**
 * Documentation
 * @param {NavigLink} navigLink - {@link navigLink} object
 */
function NavigLink({ to, withUnderline = true, children, ...props }) {
	return (
		<StyledNavLink to={to} $withUnderline={withUnderline} {...props}>
			{children}
		</StyledNavLink>
	);
}

export default NavigLink;
