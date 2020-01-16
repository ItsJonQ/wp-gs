import { useSelector } from "react-redux";
import { useSiteCurrentTheme } from "../site";
import { useStyleDataFromSource } from "../core";

export const themesSelector = state => state.themes;

export const useThemes = () => {
	return useSelector(themesSelector);
};

export const useCurrentTheme = () => {
	const themes = useThemes();
	const siteCurrentTheme = useSiteCurrentTheme();

	return themes.find(theme => theme.name === siteCurrentTheme);
};

export const useCurrentThemeDocuments = () => {
	const currentTheme = useCurrentTheme();

	return currentTheme ? currentTheme.documents : [];
};

export const useThemeDocumentStyles = id => {
	const themeDocuments = useCurrentThemeDocuments();
	const themeDoc = themeDocuments.find(doc => doc.id === id);

	if (!themeDoc) return {};

	return themeDoc.styles;
};

export const useThemeDocumentStylesData = id => {
	const documentStyles = useThemeDocumentStyles(id);
	const styleData = useStyleDataFromSource(documentStyles);

	return styleData;
};

export const useThemeDocumentStylesCssVariables = id => {
	const styleData = useThemeDocumentStylesData(id);

	return styleData.variables;
};
