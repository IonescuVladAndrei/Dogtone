import styled from "styled-components";
import Button from "../../../../ui/buttons/Button";
import { useAppEdit } from "../../../app-context/AppContext";
import ImageBox from "../ImageBox";
import useRandomImage from "./useRandomImage";
import DogBreed from "./dog-breed/DogBreed";
import useDogBreeds from "./dog-breed/useDogBreeds";

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

	@media (max-width: 400px) {
		flex-direction: column;
		align-items: start;
	}
`;

const SmallScreenBox = styled.div`
	@media (max-width: 720px) {
		width: 100%;
		overflow-x: auto;
		padding-bottom: 0.4rem;
	}
`;

function RandomBreedImage() {
	const { setIsOrigImgValid, setIsOrigImgLoading, dogBreed } = useAppEdit();
	const { data: imageData, isFetching: isFetchingImg, refetch, isError: isErrorImg } = useRandomImage(dogBreed);
	const { data: breedsData, isError: isErrorBreeds, isFetching: isFetchingBreeds } = useDogBreeds();

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
					disabled={isFetchingImg || isFetchingBreeds || !dogBreed}
				>
					<span>Fetch new image</span>
				</Button>
				<DogBreed data={breedsData} isFetching={isFetchingBreeds} isError={isErrorBreeds} />
			</ButtonBox>

			<SmallScreenBox>
				<ImageBox isErrorImg={isErrorImg} isErrorBreeds={isErrorBreeds} isFetching={isFetchingImg} imageData={imageData} />
			</SmallScreenBox>
		</OutsideBox>
	);
}

export default RandomBreedImage;
