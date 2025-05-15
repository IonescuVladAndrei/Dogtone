import { MathJax } from "better-react-mathjax";
import { memo } from "react";
import { VarSpan, SmallScreenBox, FormulaBox, CallP, CallBox } from "./FilterStyling";

function SaturationInfo() {
	return (
		<CallBox>
			<CallP>
				Saturation is adjusted by converting each pixel's color from RGB to HSL (Hue, Saturation, Lightness), modifying the saturation (S)
				component, and converting it back to RGB.
			</CallP>
			<CallP>
				First the factor is determined based on <VarSpan>S</VarSpan> (value between 0 and 200):
			</CallP>
			<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
				<MathJax>{"\\( \\color{#1b4a66}{\\text{factor}} =  \\frac{S}{100} \\)"}</MathJax>
			</FormulaBox>
			<CallP>Then each pixel is converted from RGB to HSL using the following formula:</CallP>
			<FormulaBox $isSmallScreen={true} $maxWidth={"350px"}>
				<MathJax>{"\\( \\color{#1b4a66}{ r' = \\frac{r}{255},\\quad g' = \\frac{g}{255},\\quad b' = \\frac{b}{255} } \\)"}</MathJax>
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
					{"\\( \\color{#1b4a66}{ \\text{if} \\; t < \\frac{1}{6}, \\; \\text{Return} \\; p + (q - p) \\times 6 \\times t } \\)"}
				</MathJax>
			</FormulaBox>
			<FormulaBox $isSmallScreen={true} $maxWidth={"400px"}>
				<MathJax>{"\\( \\color{#1b4a66}{ \\text{if} \\; \\frac{1}{6} \\leq t < \\frac{1}{2}, \\; \\text{Return} \\; q } \\)"}</MathJax>
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
					<MathJax>{"\\( \\color{#1b4a66}{ \\text{Return} \\; p + (q - p) \\times (\\frac{2}{3} - t) \\times 6 } \\)"}</MathJax>
				</FormulaBox>
			</SmallScreenBox>
			<FormulaBox $isSmallScreen={true} $maxWidth={"400px"}>
				<MathJax> {"\\( \\color{#1b4a66}{ \\text{Otherwise, Return} \\; p } \\)"}</MathJax>
			</FormulaBox>
		</CallBox>
	);
}

export default memo(SaturationInfo);
