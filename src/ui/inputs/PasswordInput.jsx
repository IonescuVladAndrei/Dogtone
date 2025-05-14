import { useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Button from '../buttons/Button';

const StyledInputPassword = styled.div`
    position: relative;
    width: 100%;
`;

const SmallBox = styled.div`
    position: absolute;
    right: 2%;
    top: 16.5%;
`;
/**
 * @typedef {Object} InputPassword
 * @property {boolean} isLoading - If true, will disable the input.
 * @property {function} setValue - Function called to update state.
 */

/**
 * Documentation
 * @param {InputPassword} inputPassword - {@link inputPassword} object
 */
function InputPassword({ isLoading, setValue, ...props }) {
    const [showPass, setShowPass] = useState(false);

    function onChange(val) {
        val = val.replace(' ', '');
        return val;
    }

    return (
        <StyledInputPassword>
            <Input
                type={showPass ? 'text' : 'password'}
                $width={'100%'}
                $padding={'0.8rem 9rem 0.8rem 1.2rem'}
                disabled={isLoading}
                onChange={(e) => setValue(onChange(e.target.value))}
                {...props}
            />
            <SmallBox>
                <Button
                    type="password"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowPass((showPass) => !showPass);
                    }}
                    disabled={isLoading}
                >
                    {showPass ? 'Hide' : 'Show'}
                </Button>
            </SmallBox>
        </StyledInputPassword>
    );
}

export default InputPassword;