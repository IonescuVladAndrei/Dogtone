/**
 * @typedef {Object} ImageSvg
 * @property {string} width - Width of the svg. Example: "20px"
 * @property {string} height - Height of the svg. Example: "20px"
 * @property {string} color - Color of the svg.
 */

/**
 * Documentation
 * @param {ImageSvg} imageSvg - {@link imageSvg} object
 */
function ImageSvg({ width, height, color }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M21,4H3A1,1,0,0,0,2,5V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V5A1,1,0,0,0,21,4ZM7,7A2,2,0,1,1,5,9,2,2,0,0,1,7,7ZM20,18H4V16.333L8,13l2.857,2.143L16,10l4,5.333Z" />
        </svg>
    );
}

export default ImageSvg;
