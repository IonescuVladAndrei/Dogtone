import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useAppEdit } from "../app-context/AppContext";
import { ImageOriginType } from "../app-context/imageOriginEnum";
import { queryKey_randomImage } from "../original-image/sections/random-image/useRandomImage";
import ListItem from "../../ui/ListItem";

const OutsideBox = styled.div``;

const StyledList = styled.ul`
	top: 0;
	position: sticky;

	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: fit-content;
`;

const StyledHeading = styled.h2`
	margin-bottom: 1rem;
	color: var(--color-brand-600);
`;

function ImageOriginList() {
	const { imageOrigin, setImageOrigin } = useAppEdit();
	const queryClient = useQueryClient();

	return (
		<OutsideBox>
			<StyledList>
				<StyledHeading>Step 1: choose your image</StyledHeading>
				<ListItem
					label={"Random dog image."}
					description={"A random dog image will be used from the dog.ceo API."}
					isChecked={imageOrigin === ImageOriginType.RANDOM}
					onClick={() => {
						setImageOrigin(ImageOriginType.RANDOM);
						queryClient.removeQueries({ queryKey: [queryKey_randomImage] });
					}}
				/>
				<ListItem
					label={"Radom dog image from selected breed."}
					description={"A random dog image of the chosen breed will be used from the dog.ceo API."}
					isChecked={imageOrigin === ImageOriginType.RANDOM_WITH_BREED}
					onClick={() => {
						setImageOrigin(ImageOriginType.RANDOM_WITH_BREED);
						queryClient.removeQueries({ queryKey: [queryKey_randomImage] });
					}}
				/>
				<ListItem
					label={"Image from local storage."}
					description={"You can choose the image used for processing."}
					value={ImageOriginType.LOCAL}
					isChecked={imageOrigin === ImageOriginType.LOCAL}
					onClick={() => {
						setImageOrigin(ImageOriginType.LOCAL);
						queryClient.removeQueries({ queryKey: [queryKey_randomImage] });
					}}
				/>
			</StyledList>
		</OutsideBox>
	);
}

export default ImageOriginList;
