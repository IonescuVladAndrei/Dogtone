import styled from "styled-components";
import DropDown from "../../../../../ui/DropDown";
import SpinnerMini from "../../../../../ui/spinners/SpinnerMini";
import { useAppEdit } from "../../../../app-context/AppContext";

const SpinnerBox = styled.div`
	margin-left: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

function DogBreed({ data, isFetching, isError }) {
	const { dogBreed, setDogBreed } = useAppEdit();

	if (isFetching)
		return (
			<SpinnerBox>
				<SpinnerMini color="light" />
			</SpinnerBox>
		);

	if (isError) return;

	data = data?.message ? Object.keys(data.message) : [];

	return (
		<DropDown
			initialText="Select breed..."
			options={data.map((breed) => ({ label: breed.charAt(0).toUpperCase() + breed.slice(1), value: breed }))}
			$width="20rem"
			setOption={(index) => setDogBreed(data[index])}
			selectedOptionLabel={dogBreed ? dogBreed.charAt(0).toUpperCase() + dogBreed.slice(1) : ""}
			borderType="2"
		/>
	);
}

export default DogBreed;
