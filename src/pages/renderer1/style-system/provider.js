import React from "react";
import {
	initialContext,
	useStyleSystemContext,
	StyleSystemContext,
} from "./context";
import { SE } from "./element";
import { cssVariableTransform } from "../../shared";

export const StyleSystemProvider = ({ as = "div", children, theme = {} }) => {
	const styleSystemContext = useStyleSystemContext() || initialContext;

	const mergedTheme = {
		...styleSystemContext.theme,
		...theme,
	};

	const variables = cssVariableTransform(mergedTheme);

	const contextProps = {
		theme: mergedTheme,
		variables,
	};

	const StyledElementComponent = SE[as] || SE.div;

	return (
		<StyleSystemContext.Provider value={contextProps}>
			<StyledElementComponent css={variables}>
				{children}
			</StyledElementComponent>
		</StyleSystemContext.Provider>
	);
};
