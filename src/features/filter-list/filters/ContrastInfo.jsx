import { MathJax } from "better-react-mathjax";
import { memo } from "react";
import { VarSpan, SmallScreenBox, FormulaBox, CallP, CallBox } from "./FilterStyling";

function ContrastInfo() {
	return (
		<CallBox>
			<CallP>
				This contrast adjustment method uses a scaling factor to stretch or compress the distance between pixel values and the midtone (128).
				A higher filterVal increases contrast by making bright areas brighter and dark areas darker, while a negative value decreases
				contrast, flattening the image. The formula ensures all output values stay within the 0-255 range.
			</CallP>
			<CallP>
				First the factor is determined based on <VarSpan>C</VarSpan> (value between -255 and 255):
			</CallP>
			<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
				<MathJax>{"\\( \\color{#1b4a66}{\\text{factor}} =  \\frac{259 \\times (C + 255)}{255 \\times (259 - C)} \\)"}</MathJax>
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
						{"\\( \\color{#1b4a66}{\\text{clamp}\\left( \\text{factor} \\times (\\text{OldValue} - 128) + 128 \\right)} \\)"}
					</MathJax>
				</FormulaBox>
			</SmallScreenBox>

			<CallP>
				Where <VarSpan>clamp</VarSpan> function ensures that NewValue remains between 0 and 255.
			</CallP>
		</CallBox>
	);
}

export default memo(ContrastInfo);
