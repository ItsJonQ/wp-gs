import React from "react";
import {
	initialContext,
	useStyleSystemContext,
	StyleSystemContext,
} from "./context";
import { SE } from "./element";
import { cssVariableTransform } from "../../shared";

export const StyleSystemProvider = ({ children, theme = {} }) => {
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

	return (
		<StyleSystemContext.Provider value={contextProps}>
			<SE.div css={variables}>{children}</SE.div>
		</StyleSystemContext.Provider>
	);
};
