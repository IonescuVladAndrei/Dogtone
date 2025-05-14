import styled from 'styled-components';

const OutsideBox = styled.div`
    background-image: radial-gradient(var(--color-brand-300) 1px, transparent 1px);
    background-size: calc(10 * 1px) calc(10 * 1px);
    height: 30dvh;
    display: flex;
    justify-content: center;

    @media (max-width: 900px) {
        height: 20dvh;
    }

    @media (max-width: 600px) {
        height: 10dvh;
    }
`;

const InsideBox = styled.div`
    background-image: linear-gradient(to right, var(--color-brand-25) 15%, rgba(255, 0, 0, 0), var(--color-brand-25) 85%),
        linear-gradient(to top, var(--color-brand-25) 15%, rgba(255, 0, 0, 0), var(--color-brand-25) 85%);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const P = styled.p`
    color: var(--color-brand-700);
    font-weight: 800;
    font-size: 7rem;
    text-align: center;
    line-height: 1;

    @media (max-width: 900px) {
        font-size: 5rem;
    }

    @media (max-width: 600px) {
        font-size: 3rem;
    }
`;

const FindP = styled.p`
    color: var(--color-brand-500);
    font-weight: 600;
    font-size: 3rem;
    text-align: center;
    line-height: 1;
    margin-top: 2rem;

    @media (max-width: 900px) {
        font-size: 2rem;
    }

    @media (max-width: 600px) {
        font-size: 1.5rem;
    }
`;

function MainHeading() {
    return (
        <OutsideBox>
            <InsideBox>
                <P>DOGTONE</P>
                <FindP>Give your pup a pixel makeover.</FindP>
            </InsideBox>
        </OutsideBox>
    );
}

export default MainHeading;
