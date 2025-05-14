/**
 * @typedef {Object} ArrowDown
 * @property {string} width - Width of the svg. Example: "20px"
 * @property {string} height - Height of the svg. Example: "20px"
 */

/**
 * Documentation
 * @param {ArrowDown} arrowDown - {@link arrowDown} object
 */
function ArrowDown({ width, height }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"
                fill="var(--color-brand-800)"
            />
        </svg>
    );
}

export default ArrowDown;
