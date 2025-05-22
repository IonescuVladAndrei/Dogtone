import { useRef, useState } from "react";
import { useAppEdit } from "../app-context/AppContext";
import { FiltersType } from "../filter-list/filtersEnum";
import {
	averageGrayScaleMethod,
	contrastMethod,
	desaturationGrayScaleMethod,
	luminanceGrayScaleMethod,
	saturationMethod,
	sobelMethod,
} from "./methods";
import styled from "styled-components";
import Button from "../../ui/buttons/Button";

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

	@media (max-width: 560px) {
		display: grid;
		grid-template-columns: 1fr 1fr;

		& > :nth-child(3) {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 350px) {
		grid-template-columns: 1fr;
	}
`;

const SmallScreenBox = styled.div`
	@media (max-width: 720px) {
		width: 100%;
		overflow-x: auto;
		padding-bottom: 0.4rem;
		height: 62rem;
	}
`;

const CanvasBox = styled.div`
	width: 60rem;
	height: 60rem;
`;

const StyledCanvas = styled.canvas`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const ProcessingP = styled.p`
	font-weight: 450;
	font-size: 1.6rem;

	& span {
		font-weight: 500;
		color: var(--color-brand-700);
	}
`;

function Processing() {
	const [processingTime, setProcessingTime] = useState(null);
	const [canDownloadImg, setCanDownloadImg] = useState(false);
	const canvasRef = useRef(null);
	const { isOrigImgValid, origImgRef, filter, filterVal } = useAppEdit();

	function convertImage() {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		const img = origImgRef.current;

		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

		const start = performance.now();
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;

		if (filter === FiltersType.AVERAGE_GREYSCALE) {
			averageGrayScaleMethod(data);
		} else if (filter === FiltersType.DESATURATION_GREYSCALE) {
			desaturationGrayScaleMethod(data);
		} else if (filter === FiltersType.LUMINANCE_GREYSCALE) {
			luminanceGrayScaleMethod(data);
		} else if (filter === FiltersType.CONTRAST) {
			contrastMethod(data, filterVal);
		} else if (filter === FiltersType.SATURATION) {
			saturationMethod(data, filterVal);
		}

		if (filter !== FiltersType.SOBEL) {
			ctx.putImageData(imageData, 0, 0);
		} else {
			ctx.putImageData(new ImageData(sobelMethod(imageData), imageData.width, imageData.height), 0, 0);
		}

		const end = performance.now();

		setProcessingTime((end - start).toFixed(2));
		setCanDownloadImg(true);
	}

	const downloadImage = () => {
		const link = document.createElement("a");

		const dateNow = new Date();
		const localeTime = dateNow.toLocaleTimeString([], { hour12: false }).replaceAll(":", "_");

		let imageName = `dogtone_${filter}`;
		if (filter === FiltersType.CONTRAST || filter === FiltersType.SATURATION) {
			imageName = `${imageName}_${filterVal}_`;
		}
		imageName = `${imageName}_${localeTime}.png`;

		link.download = imageName;
		link.href = canvasRef.current.toDataURL();
		link.click();
	};

	return (
		<OutsideBox>
			<ButtonBox>
				<Button
					type={"space"}
					disabled={!isOrigImgValid}
					onClick={() => {
						setCanDownloadImg(false);
						convertImage();
					}}
				>
					<span>Process image</span>
				</Button>

				<Button
					type={"space"}
					onClick={() => {
						downloadImage();
					}}
					disabled={!canDownloadImg}
				>
					<span>Download</span>
				</Button>
				{processingTime && (
					<ProcessingP>
						Processing time: <span>{processingTime}</span> ms
					</ProcessingP>
				)}
			</ButtonBox>

			<SmallScreenBox>
				<CanvasBox>
					<StyledCanvas ref={canvasRef} />
				</CanvasBox>
			</SmallScreenBox>
		</OutsideBox>
	);
}

export default Processing;
