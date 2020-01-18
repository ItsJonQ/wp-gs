import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import { is } from "@itsjonq/is";
import { domElements, getCssVariableValue } from "../../shared";
import { globalStylesManager } from "./manager";
import { useStyleSystemContext } from "./context";

const filterUnstyledClassName = css => !!css && css !== "wp-gs-0";

export const useStyledClassName = ({ className, css, sx }) => {
	let cssToCompile = [];
	const { theme } = useStyleSystemContext();
	const themeStyles = getCompiledThemeStyles({ sx, theme });
	const themeCss = globalStylesManager.css(themeStyles);

	if (css) {
		if (is.array(css)) {
			cssToCompile = css;
		} else if (is.string(css) || is.plainObject(css)) {
			cssToCompile.push(css);
		}
	}

	const compiledCss = cssToCompile.map(precompiledCss => {
		try {
			return globalStylesManager.css(precompiledCss);
		} catch {
			return undefined;
		}
	});

	const classes = globalStylesManager.cx(
		[className, ...compiledCss, themeCss].filter(filterUnstyledClassName)
	);

	return classes || undefined;
};

const getVariableFromTheme = prop => {
	const key = getCssVariableValue(prop);

	return `var(${key})`;
};

const getCompiledThemeStyles = ({ sx, theme }) => {
	if (!sx) return "";

	const styles = Object.keys(sx).reduce((styles, key) => {
		const value = sx[key];
		const nextValue = is.plainObject(value)
			? getCompiledThemeStyles({ sx: value, theme })
			: getVariableFromTheme(value);

		return { ...styles, [key]: nextValue };
	}, {});

	return styles;
};

const sanitizeProps = props => {
	return Object.keys(props).reduce((sanitized, key) => {
		const value = props[key];
		if (isPropValid(key)) {
			return { ...sanitized, [key]: value };
		}
		return value;
	}, {});
};

const createStyledElement = tag => {
	return React.forwardRef(({ className, css, sx, ...props }, ref) => {
		const classes = useStyledClassName({ className, css, sx });

		return React.createElement(tag, {
			...sanitizeProps(props),
			className: classes,
			ref,
		});
	});
};

export const StyledElement = domElements.reduce((primitives, tag) => {
	return {
		...primitives,
		[tag]: createStyledElement(tag),
	};
}, {});

export const SE = StyledElement;
