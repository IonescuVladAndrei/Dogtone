import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import VertArrowButton from './buttons/VertArrowButton';

const OutsideBox = styled.div`
    position: relative;
`;

const StyledSelect = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: ${(props) => props.$width};

    gap: 0.4rem;

    padding: 0.8rem 1.2rem;
    ${(props) =>
        props.$borderType === 1
            ? 'border: 1px solid var(--color-grey-300);'
            : props.$borderType === 2
            ? 'border:none'
            : ' border: 1px solid var(--color-grey-100);'}

    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);

    box-shadow: var(--shadow-sm);

    ${(props) =>
        props.$disabled &&
        css`
            background-color: var(--color-grey-200);
        `};

    & p {
        ${(props) =>
            props.$bold &&
            css`
                font-size: 1.5rem;
                font-weight: 500;
            `}

        user-select: none;

        &:hover {
            cursor: pointer;
        }

        ${(props) =>
            props.$noSelection &&
            css`
                color: var(--color-grey-300);
            `}
    }
`;

const UnselectedOptionsBox = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 10;
    top: 4.5rem;
    max-height: 25rem;
    overflow-y: auto;

    width: ${(props) => props.$width};

    ${(props) => (props.$borderType === 1 ? 'border: 1px solid var(--color-grey-300);' : 'border: 1px solid var(--color-grey-100);')}

    border-radius: var(--border-radius-sm);

    box-shadow: var(--shadow-sm);
    padding-bottom: 0.4rem;
    background-color: var(--color-grey-0);
`;

const StyledButton = styled.button`
    ${(props) =>
        props.$bold &&
        css`
            font-size: 1.5rem;
            font-weight: 500;
        `}

    text-align: left;

    padding: 0.8rem 1rem;
    color: var(--color-brand-900);
    background-color: var(--color-grey-0);

    border: none;
    border-bottom: 0.1rem solid var(--color-grey-150);

    transition: color 0.1s, background-color 0.1s;
    &:focus {
        outline: none;
        border: none;
        border-bottom: 0.1rem solid var(--color-grey-150);
    }

    &:active {
        outline: none;
        border: none;
        border-bottom: 0.1rem solid var(--color-grey-150);
    }

    &:hover {
        background-color: var(--color-brand-100);
    }
`;

/**
 * @typedef {Object} DropDown
 * @property {{label: string, value: string}[]} options - Dropdown options
 * - label: The value that gets shown.
 * - value: The value that gets stored.
 * @property {function} setOption - Function called when clicking on a button. Will receive the index of the option from the options array.
 * @property {boolean} disabled - If true, will disable the component. Default: false.
 * @property {string} selectedOptionLabel - The label of the selected option.
 * @property {string} initialText - The text value that gets shown before choosing an option.
 * @property {string} afterSelectionText - The text value that gets placed in front of the selected option. Default: "".
 * @property {boolean} bold - Will make all text bold. Default: true.
 * @property {boolean} boldOnlyForOptions - Will only make options bold. Default: true.
 * @property {1 | 2 | 3} borderType - Will color the border --color-grey-300, remove or --color-grey-100.
 * @property {string} $width - Is optional.
 */

/**
 * Documentation
 * @param {DropDown} dropDown - {@link dropDown} object
 */
function DropDown({
    options,
    setOption,
    disabled = false,
    selectedOptionLabel,
    calcWidth = false,
    initialText,
    afterSelectionText = '',
    bold = true,
    boldOnlyForOptions = true,
    borderType = 1,
    $width,
}) {
    const [showOptions, setShowOptions] = useState(false);
    let width = $width ?? 'fit-content';
    if (calcWidth) {
        let maxNrOfChar = 0;
        options.forEach((option) => {
            if (option.label.length > maxNrOfChar) maxNrOfChar = option.label.length;
        });

        width = `${((maxNrOfChar + 8) * 6.85) / 10 + 2.8 + 2.4 + 1}rem`;
        // padding left, padding right, gap + small icon + 1
    }

    const handler = () => setShowOptions(false);
    const ref = useOutsideClick(handler);

    return (
        <OutsideBox ref={ref}>
            <StyledSelect
                $width={width}
                $bold={bold}
                $borderType={borderType}
                $noSelection={!selectedOptionLabel || selectedOptionLabel === ''}
                $disabled={disabled}
            >
                <p
                    onClick={(e) => {
                        e.preventDefault();
                        if (!disabled) setShowOptions((so) => !so);
                    }}
                >
                    {!selectedOptionLabel || selectedOptionLabel === '' ? initialText : `${afterSelectionText} ${selectedOptionLabel}`}
                </p>
                <VertArrowButton
                    isUp={showOptions}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowOptions((so) => !so);
                    }}
                    height="12px"
                    width="12px"
                />
            </StyledSelect>
            {showOptions && (
                <UnselectedOptionsBox $width={width} $borderType={borderType}>
                    {options.map((option, index) => {
                        if (option.label === selectedOptionLabel) return;
                        return (
                            <StyledButton
                                key={index}
                                disabled={disabled}
                                $bold={bold || boldOnlyForOptions}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOption(index);
                                    setShowOptions(false);
                                }}
                            >{`${afterSelectionText} ${option.label}`}</StyledButton>
                        );
                    })}
                </UnselectedOptionsBox>
            )}
        </OutsideBox>
    );
}

export default DropDown;
