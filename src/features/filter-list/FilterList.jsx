import { MathJax, MathJaxContext } from "better-react-mathjax";
import styled from "styled-components";
import ListItem from "../../ui/ListItem";
import Slider from "../../ui/Slider";
import { useAppEdit } from "../app-context/AppContext";
import { CallBox, CallP, FormulaBox, VarSpan } from "./filters/FilterStyling";
import SaturationInfo from "./filters/SaturationInfo";
import ContrastInfo from "./filters/ContrastInfo";
import { FILTER_CONTRAST_RANGE, FILTER_SATURATION_RANGE, FiltersType } from "./filtersEnum";

const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const SliderBox = styled.div`
	max-width: 30rem;
	margin-left: 2.6rem;
`;

const StyledHeading = styled.h2`
	margin-bottom: 1rem;
	color: var(--color-brand-600);
`;

const mathJaxConfig = { loader: { load: ["input/tex", "output/chtml"] } };

function FilterList() {
	const { filter, setFilter, filterVal, setFilterVal } = useAppEdit();

	return (
		<MathJaxContext version={3} config={mathJaxConfig}>
			<StyledList>
				<StyledHeading>Step 2: choose the filter</StyledHeading>
				<ListItem
					label={"Average grey-scale."}
					description={"Simply averages the red, green, and blue values. It's fast and basic but can look a bit washed out or flat."}
					isChecked={filter === FiltersType.AVERAGE_GREYSCALE}
					onClick={() => setFilter(FiltersType.AVERAGE_GREYSCALE)}
					withColl={true}
					collComponent={
						<CallBox>
							<CallP>
								The Average Grey-Scale process is a simple method to convert a color image (typically in RGB format) into a grey-scale
								image. In grey-scale, each pixel carries only intensity information (brightness), with no color.
							</CallP>
							<CallP>To convert each pixel to grey-scale, the average method is used:</CallP>
							<FormulaBox>
								<MathJax>{`\\( \\color{#1b4a66}{\\text{Gray} = \\frac{R + G + B}{3}} \\)`}</MathJax>
							</FormulaBox>
						</CallBox>
					}
				/>

				<ListItem
					label={"Luminance grey-scale."}
					description={
						"Uses human visual perception to weight colors more realistically (30% red, 59% green, 11% blue). Produces the most natural-looking greyscale images."
					}
					isChecked={filter === FiltersType.LUMINANCE_GREYSCALE}
					onClick={() => setFilter(FiltersType.LUMINANCE_GREYSCALE)}
					withColl={true}
					collComponent={
						<CallBox>
							<CallP>
								The luminosity method takes into account the fact that the human eye doesn't perceive all colors equally, which means
								we are most sensitive to green, less to red, and least sensitive to blue.
							</CallP>
							<CallP>
								The luminosity formula gives more importance to green and less to blue, resulting in a more natural-looking grey-scale
								image:
							</CallP>
							<FormulaBox $isSmallScreen={true} $maxWidth={"500px"}>
								<MathJax>{"\\( \\color{#1b4a66}{\\text{Gray}} = 0.21 \\times R + 0.72 \\times G + 0.07 \\times B \\)"}</MathJax>
							</FormulaBox>
						</CallBox>
					}
				/>

				<ListItem
					label={"Desaturation grey-scale."}
					description={
						"Takes the average of the lightest and darkest color values in each pixel. This creates a balanced contrast and can preserve detail well."
					}
					isChecked={filter === FiltersType.DESATURATION_GREYSCALE}
					onClick={() => setFilter(FiltersType.DESATURATION_GREYSCALE)}
					withColl={true}
					collComponent={
						<CallBox>
							<CallP>
								The desaturation process is a technique to convert a color image (in RGB format) into a grey-scale image by removing
								the color while preserving brightness contrast. This method is based on finding the mid-range intensity of each pixel.
							</CallP>
							<CallP>The following formula is applied to each pixel:</CallP>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>{"\\( \\color{#1b4a66}{\\text{Gray}} = \\frac{\\max(R, G, B) + \\min(R, G, B)}{2} \\)"}</MathJax>
							</FormulaBox>
						</CallBox>
					}
				/>

				<ListItem
					label={"Sobel-Feldman."}
					description={"Creates an image emphasising edges by using the Irwin Sobel and Gary M. Feldman operator."}
					isChecked={filter === FiltersType.SOBEL}
					onClick={() => setFilter(FiltersType.SOBEL)}
					withColl={true}
					collComponent={
						<CallBox>
							<CallP>
								The Sobel operator uses two 3x3 convolution kernels, one for detecting horizontal changes (<VarSpan>Gₓ</VarSpan>) and
								one for vertical changes (<VarSpan>Gᵧ</VarSpan>). These kernels are applied to the grayscale version of the image to
								approximate the gradient of the pixel intensity.
							</CallP>

							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>
									{`\\( \\color{#1b4a66}{ G_x =
									\\begin{bmatrix}
									-1 & 0 & +1 \\\\
									-2 & 0 & +2 \\\\
									-1 & 0 & +1
									\\end{bmatrix} } \\)`}
								</MathJax>
							</FormulaBox>

							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>
									{`\\( \\color{#1b4a66}{ G_y =
									\\begin{bmatrix}
									-1 & -2 & -1 \\\\
									0 & 0 & 0 \\\\
									+1 & +2 & +1
									\\end{bmatrix} } \\)`}
								</MathJax>
							</FormulaBox>
						</CallBox>
					}
				/>

				<ListItem
					label={"Contrast."}
					description={
						"Contrast adjusts the difference between the light and dark parts of an image. Increasing contrast makes shadows darker and highlights brighter, creating a sharper and more dramatic effect. Reducing contrast flattens the image, making it look softer or faded."
					}
					isChecked={filter === FiltersType.CONTRAST}
					onClick={() => setFilter(FiltersType.CONTRAST, 0)}
					withColl={true}
					collComponent={<ContrastInfo />}
				>
					<SliderBox>
						<Slider min={FILTER_CONTRAST_RANGE.min} max={FILTER_CONTRAST_RANGE.max} value={filterVal} setValue={setFilterVal} />
					</SliderBox>
				</ListItem>

				<ListItem
					label={"Saturation."}
					description={
						"Saturation controls how vivid the colors in your image appear. A higher saturation makes colors more intense and vibrant, while lower saturation fades the colors toward grayscale. This is useful for making an image pop or creating a more muted, vintage look."
					}
					isChecked={filter === FiltersType.SATURATION}
					onClick={() => setFilter(FiltersType.SATURATION, 100)}
					withColl={true}
					collComponent={<SaturationInfo />}
				>
					<SliderBox>
						<Slider min={FILTER_SATURATION_RANGE.min} max={FILTER_SATURATION_RANGE.max} value={filterVal} setValue={setFilterVal} />
					</SliderBox>
				</ListItem>
			</StyledList>
		</MathJaxContext>
	);
}

export default FilterList;
