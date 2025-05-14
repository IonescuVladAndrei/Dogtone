/**
 * @typedef {Object} TickSvg
 * @property {string} width - Width of the svg. Example: "20px"
 * @property {string} height - Height of the svg. Example: "20px"
 * @property {string} color - Color of the svg.
 */

/**
 * Documentation
 * @param {TickSvg} tickSvg - {@link tickSvg} object
 */
function TickSvg({ width, height, color }) {
	return (
		<svg width={width} height={height} fill={color} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
			<path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path>
		</svg>
	);
}

export default TickSvg;
