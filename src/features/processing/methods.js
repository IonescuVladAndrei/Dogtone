/**
 * Tests if the provided value is bounded to the RGB range
 *
 * @param {number} val - Value to be tested.
 * @returns {number} - A value between the range of 0 to 255.
 */
function overLimit(val) {
	if (val > 255) return 255;
	if (val < 0) return 0;
	return val;
}

/**
 * Converts a hue value to RGB.
 *
 * @param {number} h - Hue value of a pixel (0 to 1).
 * @param {number} s - Saturation value of a pixel (0 to 1).
 * @param {number} l - Lightness value of a pixel (0 to 1).
 * @returns {number} - An RGB value clamped to the range of 0 to 1.
 */
function hue2rgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}

/**
 * Converts an RGB color value to HSL.
 *
 * @param {number} r - Red value of a pixel (0 to 255).
 * @param {number} g - Green value of a pixel (0 to 255).
 * @param {number} b - Blue value of a pixel (0 to 255).
 * @returns {[number, number, number]} An array containing the HSL values:
 *  - h (Hue) ranges from 0 to 1
 *  - s (Saturation) ranges from 0 to 1
 *  - l (Lightness) ranges from 0 to 1
 */
function rgbToHsl(r, g, b) {
	r = r / 255;
	g = g / 255;
	b = b / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	let l = (max + min) / 2;
	let h = 0;
	let s;

	if (max === min) {
		s = 0;
	} else {
		const d = max - min;

		if (l > 0.5) {
			s = d / (2 - max - min);
		} else {
			s = d / (max + min);
		}

		if (max === r) {
			h = (g - b) / d + (g < b ? 6 : 0);
		} else if (max === g) {
			h = (b - r) / d + 2;
		} else if (max === b) {
			h = (r - g) / d + 4;
		}

		h = h / 6;
	}

	return [h, s, l];
}

/**
 * Converts an HSL color value to RGB.
 *
 * @param {number} h - Hue value of a pixel (0 to 1).
 * @param {number} s - Saturation value of a pixel (0 to 1).
 * @param {number} l - Lightness value of a pixel (0 to 1).
 * @returns {[number, number, number]} An array containing the RGB values:
 *  - r (Red value) ranges from 0 to 255
 *  - g (Green value) ranges from 0 to 255
 *  - b (Blue value) ranges from 0 to 255
 */
function hslToRgb(h, s, l) {
	let r, g, b;

	if (s === 0) {
		r = g = b = l;
	} else {
		let q;
		if (l < 0.5) q = l * (1 + s);
		else q = l + s - l * s;

		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [r * 255, g * 255, b * 255];
}

/**
 * Applies the Luminance gray-scale algorithm.
 *
 * @param {ImageData} data - The image data.
 */
export function luminanceGrayScaleMethod(data) {
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const grey = 0.3 * r + 0.59 * g + 0.11 * b;
		data[i] = data[i + 1] = data[i + 2] = grey;
	}
}

/**
 * Applies the Desaturation gray-scale algorithm.
 *
 * @param {ImageData} data - The image data.
 */
export function desaturationGrayScaleMethod(data) {
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const grey = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
		data[i] = data[i + 1] = data[i + 2] = grey;
	}
}

/**
 * Applies the Average gray-scale algorithm.
 *
 * @param {ImageData} data - The image data.
 */
export function averageGrayScaleMethod(data) {
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const grey = (r + g + b) / 3;
		data[i] = data[i + 1] = data[i + 2] = grey;
	}
}

/**
 * Applies a contast adjustment.
 *
 * @param {ImageData} data - The image data.
 * @param {number} filterVal - The factor to scale contast by. Is required to be between [-255,255].
 */
export function contrastMethod(data, filterVal) {
	if (filterVal < -255 || filterVal > 255) {
		console.error("Contrast: filterVal is out of bounds.");
		return;
	}

	const factor = (259 * (filterVal + 255)) / (255 * (259 - filterVal));

	for (let i = 0; i < data.length; i += 4) {
		data[i] = overLimit(factor * (data[i] - 128) + 128);
		data[i + 1] = overLimit(factor * (data[i + 1] - 128) + 128);
		data[i + 2] = overLimit(factor * (data[i + 2] - 128) + 128);
	}
}

/**
 * Applies a saturation adjustment.
 *
 * @param {ImageData} data - The image data.
 * @param {number} filterVal - The factor to scale saturation by. Is required to be between [0,200].
 */
export function saturationMethod(data, filterVal) {
	if (filterVal < 0 || filterVal > 200) {
		console.error("Saturation: filterVal is out of bounds.");
		return;
	}

	filterVal = filterVal / 100;

	for (let i = 0; i < data.length; i += 4) {
		let [r, g, b] = [data[i], data[i + 1], data[i + 2]];
		let [h, s, l] = rgbToHsl(r, g, b);

		s = s * filterVal;
		s = Math.min(1, Math.max(0, s));

		[r, g, b] = hslToRgb(h, s, l);

		data[i] = r;
		data[i + 1] = g;
		data[i + 2] = b;
	}
}

/**
 * Applies the Sobel algorithm.
 *
 * @param {ImageData} data - The image data.
 * @returns {ImageData} - The new image data.
 */
export function sobelMethod(imageData) {
	const { data, width, height } = imageData;
	const gray = new Uint8ClampedArray(width * height);

	for (let i = 0; i < data.length; i += 4) {
		const avg = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
		gray[i / 4] = avg;
	}

	const sobelData = new Uint8ClampedArray(data.length);

	const kernelX = [
		[-1, 0, 1],
		[-2, 0, 2],
		[-1, 0, 1],
	];
	const kernelY = [
		[-1, -2, -1],
		[0, 0, 0],
		[1, 2, 1],
	];

	for (let y = 1; y < height - 1; y++) {
		for (let x = 1; x < width - 1; x++) {
			let pixelX = 0,
				pixelY = 0;
			for (let ky = -1; ky <= 1; ky++) {
				for (let kx = -1; kx <= 1; kx++) {
					const val = gray[(y + ky) * width + (x + kx)];
					pixelX = pixelX + val * kernelX[ky + 1][kx + 1];
					pixelY = pixelY + val * kernelY[ky + 1][kx + 1];
				}
			}

			const magnitude = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
			const clamped = Math.min(255, magnitude);
			const i = (y * width + x) * 4;
			sobelData[i] = sobelData[i + 1] = sobelData[i + 2] = clamped;
			sobelData[i + 3] = 255;
		}
	}

	return sobelData;
}
