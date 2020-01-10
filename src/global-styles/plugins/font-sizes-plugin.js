import { merge } from '../utils';

export function fontSizePlugin(state) {
	const { fontSizes, fontScale } = state;
	const baseFontSize = fontSizes.base;

	const enhancedFontSizes = {
		h1: toPx(Math.round(Math.pow(fontScale, 5) * baseFontSize)),
		h2: toPx(Math.round(Math.pow(fontScale, 4) * baseFontSize)),
		h3: toPx(Math.round(Math.pow(fontScale, 3) * baseFontSize)),
		h4: toPx(Math.round(Math.pow(fontScale, 2) * baseFontSize)),
		h5: toPx(Math.round(Math.pow(fontScale, 1) * baseFontSize)),
		h6: toPx(baseFontSize),
		body: toPx(baseFontSize),
	};

	const enhancedState = {
		fontSizes: enhancedFontSizes,
	};

	return merge(state, enhancedState);
}

function toPx(value) {
	return `${value}px`;
}
