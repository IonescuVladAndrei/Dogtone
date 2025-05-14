import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/buttons/Button";
import sad_dog from "../public/sad_dog.png";

const StyledPageNotFound = styled.main`
	height: 100dvh;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 3rem;

	padding: 0rem 3rem;

	@media (max-width: 950px) {
		grid-template-columns: 1fr;
	}
`;

const Image = styled.img`
	width: 100%;
	max-height: 500px;
	object-fit: cover;
	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-sm);
`;

const StyledHeading = styled.h1`
	font-size: 5rem;
	font-weight: 600;
	line-height: 1.3;

	@media (max-width: 500px) {
		font-size: 4rem;
		text-align: center;
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	gap: 3rem;
`;

const ImageBox = styled.div`
	display: flex;
	align-items: center;

	@media (max-width: 950px) {
		display: none;
	}
`;

const ContentBox = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	gap: 4rem;
	padding-left: 2rem;

	@media (max-width: 950px) {
		align-items: center;
		padding-left: 0rem;
	}
`;

function PageNotFound() {
	const navigate = useNavigate();

	return (
		<StyledPageNotFound>
			<ImageBox>
				<Image src={sad_dog}></Image>
			</ImageBox>

			<ContentBox>
				<StyledHeading>Page not found!</StyledHeading>
				<ButtonGroup>
					<Button type="primary" onClick={useMoveBack()}>
						<span>Go Back</span>
					</Button>
					<Button type="primary" onClick={() => navigate("homepage")}>
						<span>Return Home</span>
					</Button>
				</ButtonGroup>
			</ContentBox>
		</StyledPageNotFound>
	);
}

export default PageNotFound;
