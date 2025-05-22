import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DropDown from "../../ui/DropDown";
import Button from "../../ui/buttons/Button";
import { useAppEdit } from "../app-context/AppContext";
import { queryKey_randomImage } from "../original-image/sections/random-image/useRandomImage";
import IndexInput from "./IndexInput";
import MatrixSection from "./MatrixSection";
import { EducationFiltersType } from "./educationFiltersEnum";
import ToggleSwitch from "../../ui/ToggleSwitch";
import { MATRIX_LEN, MATRIX_MOBILE_LEN } from "../../constants/matrix-size";

const OutsideBox = styled.div``;

const StyledHeading = styled.h2`
	margin-bottom: 1rem;
	color: var(--color-brand-600);
`;

const StyledCanvas = styled.canvas`
	width: 100%;
	height: 100%;
	object-fit: contain;
	display: none;
`;

const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 1rem;
	border-left: 0.1rem solid var(--color-grey-300);
	border-radius: var(--border-radius-sm);

	& > :nth-child(2) {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 0.1rem solid var(--color-grey-300);
	}

	margin-top: 2rem;
`;

const RunBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	width: fit-content;

	margin-top: 3rem;

	@media (max-width: 350px) {
		flex-direction: column;
	}
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	& > p {
		font-weight: 450;
		font-size: 1.8rem;

		line-height: 1.2;

		text-indent: 3rem;
	}
`;

const ToggleBox = styled.div`
	margin-top: 2rem;
	display: flex;
	align-items: center;
	gap: 2rem;

	& > p {
		font-weight: 450;
		font-size: 1.8rem;
	}
`;

const RunButtonBox = styled.div`
	width: 100%;
	& > button {
		width: 100% !important;
	}
`;

const DROPDOWN_DATA = Object.values(EducationFiltersType);

function Education() {
	const { isOrigImgValid } = useAppEdit();

	const hiddenCanvasRef = useRef(null);
	const queryClient = useQueryClient();

	const [rowStartIndex, setRowStartIndex] = useState(0);
	const [columnStartIndex, setColumnStartIndex] = useState(0);
	const [rowStartInputIndex, setRowStartInputIndex] = useState(0);
	const [columnStartInputIndex, setColumnStartInputIndex] = useState(0);

	const [isMobileModeInput, setIsMobileModeInput] = useState(false);
	const [isMobileMode, setIsMobileMode] = useState(false);

	const [imageWidth, setImageWidth] = useState(0);
	const [imageHeight, setImageHeight] = useState(0);
	const [filter, setFilter] = useState(EducationFiltersType.AVERAGE_GREYSCALE);
	const [isAnimating, setIsAnimating] = useState(false);

	const { message: cachedImgUrl } = queryClient.getQueryData([queryKey_randomImage]) ?? {};

	const [pixArr, setPixArr] = useState([]);
	const [filPixArr, setFilPixArr] = useState([]);

	useEffect(() => {
		if (cachedImgUrl) {
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.src = cachedImgUrl;

			setImageWidth(img.width);
			setImageHeight(img.height);
			setRowStartInputIndex(0);
			setColumnStartInputIndex(0);
		}
	}, [cachedImgUrl]);

	function onClick() {
		setRowStartIndex(rowStartInputIndex);
		setColumnStartIndex(columnStartInputIndex);
		setIsMobileMode(isMobileModeInput);

		const canvas = hiddenCanvasRef.current;
		const ctx = canvas.getContext("2d", { willReadFrequently: true });

		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = cachedImgUrl;

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(img, 0, 0);

			let imageData = [];
			if (isMobileModeInput) imageData = ctx.getImageData(columnStartInputIndex, rowStartInputIndex, MATRIX_MOBILE_LEN, MATRIX_MOBILE_LEN).data;
			else imageData = ctx.getImageData(columnStartInputIndex, rowStartInputIndex, MATRIX_LEN, MATRIX_LEN).data;

			const pixelArray = [];
			const filPixelArray = [];

			for (let i = 0; i < imageData.length; i += 4) {
				pixelArray.push({
					r: imageData[i],
					g: imageData[i + 1],
					b: imageData[i + 2],
				});

				let grey = 0;
				if (filter === EducationFiltersType.AVERAGE_GREYSCALE) {
					grey = Math.floor((imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3);
				} else if (filter === EducationFiltersType.LUMINANCE_GREYSCALE) {
					grey = Math.floor(0.3 * imageData[i] + 0.59 * imageData[i + 1] + 0.11 * imageData[i + 2]);
				} else if (filter === EducationFiltersType.DESATURATION_GREYSCALE) {
					grey = Math.floor(
						(Math.max(imageData[i], imageData[i + 1], imageData[i + 2]) + Math.min(imageData[i], imageData[i + 1], imageData[i + 2])) / 2
					);
				}

				filPixelArray.push({
					r: grey,
					g: grey,
					b: grey,
				});
			}

			setPixArr(pixelArray);
			setFilPixArr(filPixelArray);
		};
	}

	return (
		<OutsideBox>
			<StyledCanvas ref={hiddenCanvasRef} />
			<StyledHeading>What is a pixel?</StyledHeading>
			<TextBox>
				<p>
					In digital imaging, a pixel is the smallest addressable element in a raster image, or the smallest addressable element in a dot
					matrix display device. In most digital display devices, pixels are the smallest element that can be manipulated through software.
				</p>
				<p>
					Each pixel is a sample of an original image; more samples typically provide more accurate representations of the original. The
					intensity of each pixel is variable. In color imaging systems, a color is typically represented by three or four component
					intensities such as red, green, and blue, or cyan, magenta, yellow, and black.
				</p>
				<p>
					In this section, you are able to visualize how individual pixels look up-close in a {MATRIX_LEN}x{MATRIX_LEN} matrix. First, make
					sure a dog picture has successfully been fetched and displayed. Then you can choose the starting row and column indexes and press
					run. Additionally, you can hover over the pixels and see the red, green and blue values or play the animation. Mobile mode will
					render less pixels and be less resource demanding.
				</p>
			</TextBox>

			<InputBox>
				<IndexInput
					value={rowStartInputIndex}
					setValue={setRowStartInputIndex}
					size={imageHeight}
					text={"row"}
					disabled={isAnimating}
					maxSize={isMobileModeInput ? MATRIX_LEN : MATRIX_MOBILE_LEN}
				/>

				<IndexInput
					value={columnStartInputIndex}
					setValue={setColumnStartInputIndex}
					size={imageWidth}
					text={"column"}
					disabled={isAnimating}
					maxSize={isMobileModeInput ? MATRIX_LEN : MATRIX_MOBILE_LEN}
				/>
			</InputBox>

			<ToggleBox>
				<ToggleSwitch
					checked={isMobileModeInput}
					onChange={() => {
						setIsMobileModeInput((prev) => !prev);
						setColumnStartInputIndex(0);
						setRowStartInputIndex(0);
					}}
					isDisabled={isAnimating}
				/>
				<p>Mobile mode</p>
			</ToggleBox>

			<RunBox>
				<DropDown
					initialText="Select filter..."
					$width="23rem"
					options={DROPDOWN_DATA.map((filter) => ({ label: filter, value: filter }))}
					setOption={(index) => setFilter(DROPDOWN_DATA[index])}
					selectedOptionLabel={filter ?? ""}
					disabled={!isOrigImgValid || isAnimating}
				/>
				<RunButtonBox>
					<Button type="primary" disabled={!isOrigImgValid || isAnimating} onClick={onClick}>
						<span>Run</span>
					</Button>
				</RunButtonBox>
			</RunBox>

			<MatrixSection
				pixArr={pixArr}
				rowStartIndex={rowStartIndex}
				columnStartIndex={columnStartIndex}
				filPixArr={filPixArr}
				filter={filter}
				isAnimating={isAnimating}
				setIsAnimating={setIsAnimating}
				size={isMobileMode ? MATRIX_MOBILE_LEN : MATRIX_LEN}
			/>
		</OutsideBox>
	);
}

export default Education;
