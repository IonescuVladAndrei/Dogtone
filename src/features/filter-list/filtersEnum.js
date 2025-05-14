export const FiltersType = Object.freeze({
	AVERAGE_GREYSCALE: "average_GrayScale",
	DESATURATION_GREYSCALE: "desaturation_GrayScale",
	LUMINANCE_GREYSCALE: "luminance_GrayScale",
	CONTRAST: "contrast",
	SATURATION: "saturation",
	SOBEL: "sobel",
});

export const FILTER_CONTRAST_RANGE = { min: -255, max: 255 };
export const FILTER_SATURATION_RANGE = { min: 0, max: 200 };
