import styled from "styled-components";
import { useAppEdit } from "../../app-context/AppContext";
import Spinner from "../../../ui/spinners/Spinner";
import ImageContainer from "../../../ui/ImageContainer";
import Error from "../../../ui/Error";

const OutsideBox = styled.div`
	width: 60rem;
	height: 60rem;
`;

const SpinnerBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60rem;
`;

function ImageBox({ isErrorImg, isErrorBreeds, isFetching, imageData }) {
	const { setIsOrigImgValid, setIsOrigImgLoading, isOrigImgLoading, origImgRef } = useAppEdit();

	return (
		<OutsideBox>
			{isErrorImg ? (
				<Error message={"Error! Failed to fetch a new image link."} />
			) : isErrorBreeds ? (
				<Error message={"Error! Failed to fetch dog breeds. Please try again later."} />
			) : (
				<>
					{(isFetching || isOrigImgLoading) && (
						<SpinnerBox>
							<Spinner />
						</SpinnerBox>
					)}
					{imageData !== undefined && (
						<ImageContainer
							src={imageData.message}
							alt="Picture of a dog"
							onImgError={() => {
								setIsOrigImgValid(false);
								setIsOrigImgLoading(false);
							}}
							onImgLoad={() => {
								setIsOrigImgValid(true);
								setIsOrigImgLoading(false);
							}}
							isLoading={isOrigImgLoading}
							ref={origImgRef}
						/>
					)}
				</>
			)}
		</OutsideBox>
	);
}

export default ImageBox;
