/**
 * @typedef {Object} ArrowUp
 * @property {string} width - Width of the svg. Example: "20px"
 * @property {string} height - Height of the svg. Example: "20px"
 */

/**
 * Documentation
 * @param {ArrowUp} arrowUp - {@link arrowUp} object
 */
function ArrowUp({ width, height }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"
                fill="var(--color-brand-800)"
            />
        </svg>
    );
}

export default ArrowUp;
