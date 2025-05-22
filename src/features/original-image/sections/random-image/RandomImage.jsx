import styled from "styled-components";
import Button from "../../../../ui/buttons/Button";
import { useAppEdit } from "../../../app-context/AppContext";
import ImageBox from "../ImageBox";
import useRandomImage from "./useRandomImage";

const OutsideBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-sm);

	width: 68rem;

	background-color: var(--color-brand-200);
	padding: 2.4rem 4rem;

	@media (max-width: 980px) {
		padding: 1.2rem 2rem;
	}

	@media (max-width: 720px) {
		width: 100%;
		overflow-x: hidden;
	}

	@media (max-width: 500px) {
		padding: 1.2rem 1rem;
	}
`;

const ButtonBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid var(--color-brand-300);
`;

const SmallScreenBox = styled.div`
	@media (max-width: 720px) {
		width: 100%;
		overflow-x: auto;
        padding-bottom: 0.4rem;
	}
`;

function RandomImage() {
	const { data, isFetching, refetch, isError } = useRandomImage();
	const { setIsOrigImgValid, setIsOrigImgLoading } = useAppEdit();

	return (
		<OutsideBox>
			<ButtonBox>
				<Button
					type={"space"}
					onClick={() => {
						setIsOrigImgValid(false);
						setIsOrigImgLoading(true);
						refetch();
					}}
					disabled={isFetching}
				>
					<span>Fetch new image</span>
				</Button>
			</ButtonBox>
			<SmallScreenBox>
				<ImageBox isErrorImg={isError} isFetching={isFetching} imageData={data} />
			</SmallScreenBox>
		</OutsideBox>
	);
}

export default RandomImage;
