import RadioChecked from '../svgs/RadioChecked';
import RadioUnchecked from '../svgs/RadioUnchecked';
import Button from './Button';

/**
 * @typedef {Object} RadioButton
 * @property {boolean} isChecked - if the option is selected.
 * @property {string} width - Width of the svg(button). Example: "20px"
 * @property {string} height - Height of the svg(button). Example: "20px"
 */

/**
 * Documentation
 * @param {RadioButton} radioButton - {@link radioButton} object
 */
function RadioButton({ isChecked, width, height, ...props }) {
    return (
        <Button type={'transparent'} {...props}>
            {isChecked ? <RadioChecked width={width} height={height} /> : <RadioUnchecked width={width} height={height} />}
        </Button>
    );
}

export default RadioButton;
