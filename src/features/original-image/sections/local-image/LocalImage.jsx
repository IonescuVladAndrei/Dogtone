import { useState } from "react";
import styled from "styled-components";
import Button from "../../../../ui/buttons/Button";
import ImageSvg from "../../../../ui/svgs/ImageSvg";
import ImageBox from "../ImageBox";
import { useAppEdit } from "../../../app-context/AppContext";

const OutsideBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	width: 68rem;
	height: 70.5rem;

	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-sm);

	background-color: var(--color-brand-200);
	padding: 2.4rem 4rem;

	@media (max-width: 980px) {
		padding: 1.2rem 2rem;
	}

	@media (max-width: 690px) {
		width: 100%;
		overflow-x: hidden;
	}

	@media (max-width: 500px) {
		padding: 1.2rem 1rem;
	}
`;

const UploadBox = styled.div`
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FileInput = styled.input`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip-path: inset(50%);
	white-space: nowrap;
	border-width: 0;
`;

const DragDropBox = styled.div`
	border: 1px dashed var(--color-brand-700);
	border-radius: var(--border-radius-md);

	display: flex;
	gap: 2rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	transition: background-color 100ms cubic-bezier(0.694, 0, 0.335, 1);
	background-color: ${(props) => (props.$isDragOver ? "var(--color-brand-300)" : "transparent")};

	padding: 2.4rem 4rem;

	@media (max-width: 980px) {
		padding: 1.2rem 2rem;
	}

	@media (max-width: 500px) {
		padding: 1.2rem 1rem;
	}
`;

const UploadSpan = styled.span`
	color: var(--color-brand-700);
	transition: color 200ms cubic-bezier(0.694, 0, 0.335, 1);
	font-weight: 500;
	&:hover {
		color: var(--color-brand-400);
	}
`;

const StyledLabel = styled.label`
	display: flex;
	gap: 0.4rem;
`;

const ButtonBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 2rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid var(--color-brand-300);
`;

const FileSizeP = styled.p`
	font-size: 1.6rem;
	font-weight: 450;

	& span {
		font-weight: 500;
		color: var(--color-brand-700);
	}
`;

const SmallScreenBox = styled.div`
	@media (max-width: 690px) {
		width: 100%;
		overflow-x: auto;
		padding-bottom: 0.4rem;
	}
`;

function LocalImage() {
	const [fileSize, setFileSize] = useState(null);
	const [imageSrc, setImageSrc] = useState(null);
	const [isDragOver, setIsDragOver] = useState(false);
	const { setIsOrigImgValid } = useAppEdit();

	const handleFile = (file) => {
		if (!file) return;

		setFileSize((file.size / 1024).toFixed(2));

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result;
			setImageSrc(result);
			//   onImageLoad(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const handleFileUpload = (e) => {
		handleFile(e.target.files[0]);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragOver(false);
		if (e.dataTransfer.files.length) {
			handleFile(e.dataTransfer.files[0]);
		}
	};

	const resetUpload = () => {
		setFileSize(null);
		setImageSrc(null);
		setIsOrigImgValid(false);
	};

	return (
		<OutsideBox>
			<ButtonBox>
				<Button onClick={resetUpload} type={"space"}>
					<span>Reset</span>
				</Button>

				{fileSize && (
					<FileSizeP>
						File size: <span>{fileSize}</span> KB
					</FileSizeP>
				)}
			</ButtonBox>

			{!imageSrc ? (
				<UploadBox>
					<DragDropBox
						onDrop={handleDrop}
						onDragOver={(e) => {
							e.preventDefault();
							setIsDragOver(true);
						}}
						onDragLeave={() => setIsDragOver(false)}
						$isDragOver={isDragOver}
					>
						<ImageSvg width="40px" height="40px" color="var(--color-brand-600)" />
						<StyledLabel htmlFor="image-upload">
							<UploadSpan>Upload a file</UploadSpan>
							<FileInput id="image-upload" name="image-upload" type="file" accept="image/*" onChange={handleFileUpload} />
							<p>or drag and drop</p>
						</StyledLabel>
					</DragDropBox>
				</UploadBox>
			) : (
				<SmallScreenBox>
					<ImageBox isErrorImg={false} isFetching={false} imageData={{ message: imageSrc }} />
				</SmallScreenBox>
			)}
		</OutsideBox>
	);
}

export default LocalImage;
