import React, { useRef, useEffect } from "react";
import { get } from "lodash";
import { Provider } from "react-redux";
import { useControls, Controls } from "@itsjonq/controls";
import {
	store,
	useSetGlobalStyles,
	useSetDocumentStyles,
	useInjectGlobalStyles,
	useCurrentThemeDocuments,
	useThemeDocumentStyles,
	useThemeDocumentStylesCssVariables,
} from "./gsdx";

function AppProvider({ children }) {
	return <Provider store={store}>{children}</Provider>;
}

export function RDX() {
	return (
		<AppProvider>
			<App />
			<Controls title="Global Styles" />
		</AppProvider>
	);
}

function App() {
	useBootstrapApp();

	const { color, range } = useControls();
	const setGlobalStyles = useSetGlobalStyles();
	const setDocumentStyles = useSetDocumentStyles();
	const [themeDocument] = useCurrentThemeDocuments();

	const textColor = color("colors.text", "black");
	const backgroundColor = color("colors.backgrondColor", "white");
	const primaryColor = color("colors.custom", "#05f");

	const fontSize = range("fontSizes.base", 16, { min: 11, max: 18 });
	const fontScale = range("fontScale", 1.1, { min: 1, max: 1.5, step: 0.1 });

	const documentId = themeDocument ? themeDocument.id : null;
	const documentStyles = useThemeDocumentStyles(documentId);
	const documentTextColor = get(documentStyles, "colors.text") || textColor;

	useEffect(() => {
		const config = {
			colors: {
				background: backgroundColor,
				text: textColor,
				primary: primaryColor,
			},
			fontSizes: {
				base: fontSize,
			},
			fontScale,
		};
		setGlobalStyles(config);
	}, [
		backgroundColor,
		textColor,
		primaryColor,
		fontSize,
		fontScale,
		setGlobalStyles,
	]);

	return (
		<div>
			<div>
				<h1>Global</h1>
				<p>Hello</p>
			</div>

			<hr />

			<DocumentPage>
				<h1>Document</h1>
				<input
					type="color"
					value={documentTextColor}
					onChange={e => {
						setDocumentStyles({
							id: documentId,
							styles: {
								colors: {
									text: e.target.value,
								},
							},
						});
					}}
				/>
				<p>Hello</p>
			</DocumentPage>

			<hr />

			<DocumentPage>
				<h1>Single (Post)</h1>
				<p>Hello</p>
			</DocumentPage>
		</div>
	);
}

function DocumentPage({ children }) {
	const [themeDocument] = useCurrentThemeDocuments();
	const documentId = themeDocument ? themeDocument.id : null;
	const documentCssVariables = useThemeDocumentStylesCssVariables(documentId);

	return <div style={documentCssVariables}>{children}</div>;
}

function useBootstrapApp() {
	useInjectGlobalStyles();
	const didLoadRef = useRef(false);

	useEffect(() => {
		if (!didLoadRef.current) {
			didLoadRef.current = true;
		}
	}, [didLoadRef]);
}
