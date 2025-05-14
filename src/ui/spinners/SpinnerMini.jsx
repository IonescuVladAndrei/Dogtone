// inspired by https://uiverse.io/barisdogansutcu/light-rat-32

import styled from 'styled-components';

const StyledSvg = styled.svg`
    width: ${(props) => props.$svgWidth};
    transform-origin: center;
    animation: rotate 2s linear infinite;
`;

const StyledCircle = styled.circle`
    fill: none;
    stroke: ${(props) =>
        props.$strokeColor === 'dark'
            ? 'var(--color-brand-800)'
            : props.$strokeColor === 'light'
            ? 'var(--color-brand-50)'
            : 'var(--color-brand-800)'};
    stroke-width: 2;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0.5rem;
        }

        50% {
            stroke-dasharray: 90, 200;
            stroke-dashoffset: 1.5rem;
        }

        100% {
            stroke-dashoffset: -12.5rem;
        }
    }
`;

/**
 * @typedef {Object} SpinnerMini
 * @property {'dark' | 'light'} color - spinner's color. Default: dark
 * @property {string} width - spinner's width. Default: "2.8rem"
 */

/**
 * Documentation
 * @param {SpinnerMini} spinnerMini - {@link spinnerMini} object
 */
function SpinnerMini({ color = 'dark', width = '2.8rem' }) {
    return (
        <StyledSvg viewBox="25 25 50 50" $svgWidth={width}>
            <StyledCircle r="20" cy="50" cx="50" $strokeColor={color}></StyledCircle>
        </StyledSvg>
    );
}

export default SpinnerMini;
