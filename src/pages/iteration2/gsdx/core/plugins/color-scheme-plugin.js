import colorize from "tinycolor2";
import { merge } from "../../utils";

export function colorSchemePlugin(state) {
	const { colors } = state;
	const keys = Object.keys(colors);

	const colorVariants = keys.reduce((colorScheme, key) => {
		const value = colors[key];
		const isDark = colorize.isReadable("white", value);
		const text = isDark ? "#ffffff" : "#000000";

		const variants = {
			base: value,
			rgba10: colorize(value)
				.setAlpha(0.1)
				.toRgbString(),
			rgba20: colorize(value)
				.setAlpha(0.2)
				.toRgbString(),
			rgba50: colorize(value)
				.setAlpha(0.5)
				.toRgbString(),
			rgba70: colorize(value)
				.setAlpha(0.7)
				.toRgbString(),
			light10: colorize(value)
				.lighten(5)
				.toHexString(),
			light20: colorize(value)
				.lighten(10)
				.toHexString(),
			light30: colorize(value)
				.lighten(15)
				.toHexString(),
			dark10: colorize(value)
				.darken(5)
				.toHexString(),
			dark20: colorize(value)
				.darken(10)
				.toHexString(),
			dark30: colorize(value)
				.darken(15)
				.toHexString(),
			text,
		};

		return {
			...colorScheme,
			[key]: variants,
		};
	}, {});

	const enhancedState = {
		color: colorVariants,
	};

	return merge(state, enhancedState);
}
