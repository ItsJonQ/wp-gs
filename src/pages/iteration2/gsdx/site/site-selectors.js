import { useSelector } from "react-redux";

export const siteSelector = state => state.site;
export const currentThemeSelector = state => state.site.currentTheme;

export const useSite = () => {
	return useSelector(siteSelector);
};

export const useSiteCurrentTheme = () => {
	return useSelector(currentThemeSelector);
};
