import React, { useCallback } from "react";
import { get, isPlainObject } from "lodash";

import {
	useCoreThemeStyles,
	useCurrentThemeStyles,
	useCurrentThemeGlobalStyles,
	useThemeDocumentStyles,
	usePostBlockStylesData,
} from "../gsdx";

export const StyleSystemContext = React.createContext({});
export const useStyleSystemContext = () => React.useContext(StyleSystemContext);

export function StyleSystemContextProvider({ children, documentId }) {
	const coreStyles = useCoreThemeStyles();
	const themeStyles = useCurrentThemeStyles();
	const themeGlobalStyles = useCurrentThemeGlobalStyles();

	const documentStyles = useThemeDocumentStyles(documentId);

	const combinedStylesProps = {
		core: coreStyles,
		theme: themeStyles,
		global: themeGlobalStyles,
		document: documentStyles,
	};

	const getStyleProp = useCallback(
		getProp => {
			const coreProp = get(combinedStylesProps.core, getProp);
			const themeProp = get(combinedStylesProps.theme, getProp);
			const globalProp = get(combinedStylesProps.global, getProp);
			const documentProp = get(combinedStylesProps.document, getProp);

			return documentProp || globalProp || themeProp || coreProp;
		},
		[combinedStylesProps]
	);

	const contextProps = {
		...combinedStylesProps,
		documentId,
		getStyleProp,
	};

	return (
		<StyleSystemContext.Provider value={contextProps}>
			{children}
		</StyleSystemContext.Provider>
	);
}

export function useStyleProp(getProp, blockIdentificationProps = {}) {
	const { getStyleProp } = useStyleSystemContext();
	const blockStyleData = usePostBlockStylesData(blockIdentificationProps);
	const localBlockProp = get(blockStyleData.styles, getProp);
	const systemProp = getStyleProp(getProp);

	return localBlockProp || systemProp;
}

export function useStyles(props) {
	const { postId, blockId, style } = props;

	/**
	 * TODO: Need to figure out a way do to this.
	 * Currently, it's using the mock data storage of blocks x themes
	 * within the store.
	 *
	 * We need a way to save/access data directly on the "block".
	 * Perhaps as attribute?
	 * attributes.__style, that is internally added
	 */
	const blockStyleData = usePostBlockStylesData({
		id: postId,
		blockId,
	});

	if (!postId || !blockId) return {};

	const blockCssVariables = blockStyleData.variables;
	const componentStyles = isPlainObject(style) ? style : {};

	const mergedStyles = {
		...blockCssVariables,
		...componentStyles,
	};

	return mergedStyles;
}
