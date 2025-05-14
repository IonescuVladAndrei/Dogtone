import styled, { css } from "styled-components";
import { useAppEdit } from "../app-context/AppContext";
import ListItem from "../../ui/ListItem";
import { FILTER_CONTRAST_RANGE, FILTER_SATURATION_RANGE, FiltersType } from "./filtersEnum";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import Slider from "../../ui/Slider";

const mathJaxConfig = {
	loader: { load: ["input/tex", "output/chtml"] },
};

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

const CallBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const CallP = styled.p`
	color: var(--color-grey-500);
	line-height: 1.3;
`;

const FormulaBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 0.5rem;

	${(props) =>
		props.$isSmallScreen &&
		css`
			@media (max-width: ${(props) => props.$maxWidth}) {
				font-size: 1.1rem;
			}
		`}
`;

const SmallScreenBox = styled.div`
	${(props) =>
		props.$isSmallScreen
			? css`
					display: none;

					@media (max-width: ${(props) => props.$maxWidth}) {
						display: block;
					}
			  `
			: css`
					display: block;

					@media (max-width: ${(props) => props.$maxWidth}) {
						display: none;
					}
			  `}
`;

const VarSpan = styled.span`
	color: var(--color-brand-600);
	font-weight: 500;
`;

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
					collComponent={
						<CallBox>
							<CallP>
								This contrast adjustment method uses a scaling factor to stretch or compress the distance between pixel values and the
								midtone (128). A higher filterVal increases contrast by making bright areas brighter and dark areas darker, while a
								negative value decreases contrast, flattening the image. The formula ensures all output values stay within the 0-255
								range.
							</CallP>
							<CallP>
								First the factor is determined based on <VarSpan>C</VarSpan> (value between -255 and 255):
							</CallP>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>
									{"\\( \\color{#1b4a66}{\\text{factor}} =  \\frac{259 \\times (C + 255)}{255 \\times (259 - C)} \\)"}
								</MathJax>
							</FormulaBox>
							<CallP>Then following formula is applied to each pixel:</CallP>

							<SmallScreenBox $isSmallScreen={false} $maxWidth={"500px"}>
								<FormulaBox $isSmallScreen={true} $maxWidth={"550px"} $withOverflow={true}>
									<MathJax>
										{
											"\\( \\color{#1b4a66}{\\text{NewValue} = \\text{clamp}\\left( \\text{factor} \\times (\\text{OldValue} - 128) + 128 \\right)} \\)"
										}
									</MathJax>
								</FormulaBox>
							</SmallScreenBox>

							<SmallScreenBox $isSmallScreen={true} $maxWidth={"500px"}>
								<FormulaBox $isSmallScreen={true} $maxWidth={"550px"} $withOverflow={true}>
									<MathJax>{"\\( \\color{#1b4a66}{\\text{NewValue} = } \\)"}</MathJax>
								</FormulaBox>

								<FormulaBox $isSmallScreen={true} $maxWidth={"550px"} $withOverflow={true}>
									<MathJax>
										{
											"\\( \\color{#1b4a66}{\\text{clamp}\\left( \\text{factor} \\times (\\text{OldValue} - 128) + 128 \\right)} \\)"
										}
									</MathJax>
								</FormulaBox>
							</SmallScreenBox>

							<CallP>
								Where <VarSpan>clamp</VarSpan> function ensures that NewValue remains between 0 and 255.
							</CallP>
						</CallBox>
					}
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
					collComponent={
						<CallBox>
							<CallP>
								Saturation is adjusted by converting each pixel's color from RGB to HSL (Hue, Saturation, Lightness), modifying the
								saturation (S) component, and converting it back to RGB.
							</CallP>
							<CallP>
								First the factor is determined based on <VarSpan>S</VarSpan> (value between 0 and 200):
							</CallP>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>
									{"\\( \\color{#1b4a66}{\\text{factor}} =  \\frac{S}{100} \\)"}
								</MathJax>
							</FormulaBox>
							<CallP>Then each pixel is converted from RGB to HSL using the following formula:</CallP>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>
									{"\\( \\color{#1b4a66}{ r' = \\frac{r}{255},\\quad g' = \\frac{g}{255},\\quad b' = \\frac{b}{255} } \\)"}
								</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{ \\text{max} = \\max(r', g', b') } \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{ \\text{min} = \\min(r', g', b') } \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{ l = \\frac{\\text{max} + \\text{min}}{2} } \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{ \\text{if } \\text{max} = \\text{min}:\\quad s = 0,\\quad h = 0 } \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{ \\text{Else:} } \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{ d = \\text{max} - \\text{min} } \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>
									{"\\( \\color{#1b4a66}{s = " +
										"\\begin{cases} " +
										"\\frac{d}{2 - \\text{max} - \\text{min}}, & \\text{if } l > 0.5 \\\\ " +
										"\\frac{d}{\\text{max} + \\text{min}}, & \\text{if } l \\leq 0.5 " +
										"\\end{cases}} \\)"}
								</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"550px"}>
								<MathJax>
									{"\\( \\color{#1b4a66}{h = " +
										"\\begin{cases} " +
										"\\frac{g' - b'}{d} + (6 \\text{ if } g' < b' \\text{ else } 0), & \\text{if } \\text{max} = r' \\\\ " +
										"\\frac{b' - r'}{d} + 2, & \\text{if } \\text{max} = g' \\\\ " +
										"\\frac{r' - g'}{d} + 4, & \\text{if } \\text{max} = b' " +
										"\\end{cases}} \\)"}
								</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{ h = \\frac{h}{6} } \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>{"\\( \\color{#1b4a66}{s = s \\times \\text{factor}} \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>{"\\( \\color{#1b4a66}{s = \\min(1,\\max(0, s))} \\)"}</MathJax>
							</FormulaBox>
							<CallP>Then each pixel is converted from HSL back RGB using the following formula:</CallP>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax>{"\\( \\color{#1b4a66}{q = l \\times (1 + s) \\quad \\text{(if } l < 0.5 \\text{)}} \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{q = l + s - l \\times s \\quad \\text{(if } l \\geq 0.5 \\text{)}} \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{r = \\text{hue2rgb}(p, q, h + \\frac{1}{3})} \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{g = \\text{hue2rgb}(p, q, h)} \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
								<MathJax> {"\\( \\color{#1b4a66}{b = \\text{hue2rgb}(p, q, h - \\frac{1}{3})} \\)"}</MathJax>
							</FormulaBox>
							<CallP>
								Where <VarSpan>hue2rgb</VarSpan> is calculated using:
							</CallP>
							<FormulaBox $isSmallScreen={true} $maxWidth={"400px"}>
								<MathJax> {"\\( \\color{#1b4a66}{ t = t < 0 ? t + 1 : t > 1 ? t - 1 : t } \\)"}</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"400px"}>
								<MathJax>
									{
										"\\( \\color{#1b4a66}{ \\text{if} \\; t < \\frac{1}{6}, \\; \\text{Return} \\; p + (q - p) \\times 6 \\times t } \\)"
									}
								</MathJax>
							</FormulaBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"400px"}>
								<MathJax>
									{"\\( \\color{#1b4a66}{ \\text{if} \\; \\frac{1}{6} \\leq t < \\frac{1}{2}, \\; \\text{Return} \\; q } \\)"}
								</MathJax>
							</FormulaBox>
							<SmallScreenBox $isSmallScreen={false} $maxWidth={"350px"}>
								<FormulaBox $isSmallScreen={true} $maxWidth={"500px"}>
									<MathJax>
										{
											"\\( \\color{#1b4a66}{ \\text{if} \\; \\frac{1}{2} \\leq t < \\frac{2}{3}, \\; \\text{Return} \\; p + (q - p) \\times (\\frac{2}{3} - t) \\times 6 } \\)"
										}
									</MathJax>
								</FormulaBox>
							</SmallScreenBox>
							<SmallScreenBox $isSmallScreen={true} $maxWidth={"350px"}>
								<FormulaBox $isSmallScreen={true} $maxWidth={"500px"}>
									<MathJax>{"\\( \\color{#1b4a66}{ \\text{if} \\; \\frac{1}{2} \\leq t < \\frac{2}{3}, } \\)"}</MathJax>
								</FormulaBox>
								<FormulaBox $isSmallScreen={true} $maxWidth={"500px"}>
									<MathJax>
										{"\\( \\color{#1b4a66}{ \\text{Return} \\; p + (q - p) \\times (\\frac{2}{3} - t) \\times 6 } \\)"}
									</MathJax>
								</FormulaBox>
							</SmallScreenBox>
							<FormulaBox $isSmallScreen={true} $maxWidth={"400px"}>
								<MathJax> {"\\( \\color{#1b4a66}{ \\text{Otherwise, Return} \\; p } \\)"}</MathJax>
							</FormulaBox>
						</CallBox>
					}
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
