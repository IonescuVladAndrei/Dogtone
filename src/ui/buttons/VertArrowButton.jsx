import ArrowDown from '../svgs/ArrowDown';
import ArrowUp from '../svgs/ArrowUp';
import Button from './Button';

/**
 * @typedef {Object} VertArrowButton
 * @property {boolean} isUp - if the arrow is pointed up.
 * @property {string} width - Width of the svg(button). Example: "20px"
 * @property {string} height - Height of the svg(button). Example: "20px"
 */

/**
 * Documentation
 * @param {VertArrowButton} vertArrowButton - {@link vertArrowButton} object
 */
function VertArrowButton({ isUp, width, height, ...props }) {
    return (
        <Button type={'transparent'} {...props}>
            {isUp ? <ArrowUp width={width} height={height} /> : <ArrowDown width={width} height={height} />}
        </Button>
    );
}

export default VertArrowButton;
