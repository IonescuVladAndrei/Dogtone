import styled from 'styled-components';
import WarningTriangle from './svgs/WarningTriangle';

const OutsideBox = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1.2rem 1rem;
    background-color: var(--color-red-600);
    border-radius: var(--border-radius-md);
`;

const ErrorP = styled.p`
    color: var(--color-grey-100);
`;

/**
 * @typedef {Object} Error
 * @property {string} message - The error message.
 */

/**
 * Documentation
 * @param {Error} Error - {@link Error} object
 */
function Error({ message }) {
    return (
        <OutsideBox>
            <WarningTriangle height="24px" width="24px" color="var(--color-grey-100)" />
            <ErrorP>{message}</ErrorP>
        </OutsideBox>
    );
}

export default Error;
