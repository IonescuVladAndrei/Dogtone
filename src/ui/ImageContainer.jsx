import { useState } from "react";
import styled from "styled-components";
import Error from "./Error";

const StyledImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;

	display: ${(props) => (props.$isLoading ? "none" : "block")};
`;

/**
 * @typedef {Object} ImageContainer
 * @property {string} src - Source of the image.
 * @property {string} alt - Alternative text.
 * @property {function} onImgError - Function called if the image is broken. Is optional
 */

/**
 * Documentation
 * @param {ImageContainer} imageContainer - {@link imageContainer} object
 */
function ImageContainer({ src, alt, isLoading = false, onImgError = () => {}, onImgLoad = () => {}, ref }) {
	const [imgError, setImgError] = useState(false);

	function handleImgError() {
		setImgError(true);

		onImgError();
	}

	function handleImgLoad() {
		onImgLoad();
	}

	if (imgError) return <Error message={"Error! Failed to load image."} />;

	return (
		<StyledImage $isLoading={isLoading} src={src} alt={alt} onError={handleImgError} onLoad={handleImgLoad} ref={ref} crossOrigin="anonymous" />
	);
}

export default ImageContainer;
