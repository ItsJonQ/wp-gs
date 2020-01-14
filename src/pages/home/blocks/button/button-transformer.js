import colorize from "tinycolor2";
import { merge } from "../../../../global-styles";

export function buttonBlockTransformer(state) {
	const { button, colors } = state;

	const backgroundColor = button.backgroundColor || colors.primary;
	const isDark = colorize(backgroundColor).isDark();
	const textColor = isDark ? "#ffffff" : "#000000";
	const multiplier = isDark ? 5 : 2.5;

	const backgroundColorHover = colorize(backgroundColor)
		.lighten(multiplier)
		.toHexString();
	const backgroundColorActive = colorize(backgroundColor)
		.darken(multiplier)
		.toHexString();

	const basePadding = button.padding / 5;
	const verticalPadding = basePadding * 0.75;
	const horizontalPadding = basePadding;

	const padding = `calc(${verticalPadding} * 1rem) calc(${horizontalPadding} * 1rem)`;

	const baseDropShadow = button.dropShadow;
	const dropShadow = `0 calc(${baseDropShadow} * 1px) calc(${baseDropShadow} * 4px) rgba(0, 0, 0, 0.3)`;

	const enhancedButton = {
		...button,
		backgroundColor,
		backgroundColorHover,
		backgroundColorActive,
		borderSize: toPx(button.borderSize),
		borderRadius: toPx(button.borderRadius),
		dropShadow,
		padding,
		textColor,
	};

	return merge(state, { button: enhancedButton });
}

function toPx(value) {
	return `${value}px`;
}
