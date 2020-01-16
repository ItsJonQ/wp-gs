import React, { useRef, useEffect } from "react";
import { get, isUndefined } from "lodash";
import { Provider } from "react-redux";
import { useControls, Controls } from "@itsjonq/controls";
import { Flex, View } from "@itsjonq/elm";
import "./rdx.css";

import {
	store,
	useBlocks,
	useSetGlobalStyles,
	useSetDocumentStyles,
	useInjectGlobalStyles,
	useCurrentThemeDocuments,
	useThemeDocumentStyles,
	useThemeDocumentStylesCssVariables,
	useBlockStylesCssVariables,
	useUpdateBlockStyles,
	usePostBlocks,
	useUpdatePostBlockStyles,
	usePostBlockStylesCssVariables,
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
	const primaryColor = color("colors.primary", "#05f");

	const fontSize = range("fontSizes.base", 16, { min: 11, max: 18 });
	const fontScale = range("fontScale", 1.1, { min: 1, max: 1.5, step: 0.1 });

	const documentId = themeDocument ? themeDocument.id : null;
	const documentStyles = useThemeDocumentStyles(documentId);
	const documentTextColor = get(documentStyles, "colors.text") || textColor;
	const documentBackgroundColor =
		get(documentStyles, "colors.background") || backgroundColor;

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

	const handleOnDocumentTextColorChange = event => {
		setDocumentStyles({
			id: documentId,
			styles: {
				colors: {
					text: event.target.value,
				},
			},
		});
	};

	const handleOnDocumentBackgroundColorChange = event => {
		setDocumentStyles({
			id: documentId,
			styles: {
				colors: {
					background: event.target.value,
				},
			},
		});
	};

	return (
		<View padding={30}>
			<View>
				<h1>Global</h1>
				<BlockComponents withBlockStyles={false} blockLimit={1} />
			</View>

			<hr />

			<DocumentPage>
				<Flex maxWidth={600}>
					<Flex.Block>
						<h1>Template</h1>
					</Flex.Block>
					<Flex.Item>
						Text
						<br />
						<input
							type="color"
							value={documentTextColor}
							onChange={handleOnDocumentTextColorChange}
						/>
					</Flex.Item>
					<Flex.Item>
						BG
						<br />
						<input
							type="color"
							value={documentBackgroundColor}
							onChange={handleOnDocumentBackgroundColorChange}
						/>
					</Flex.Item>
				</Flex>
				<BlockComponents withBlockStyles={false} blockLimit={1} />
			</DocumentPage>

			<hr />

			<Flex alignItems="top">
				<Flex.Block>
					<DocumentPage>
						<h1>Single (Post, within Template)</h1>
						<BlockComponents showColorPicker />
					</DocumentPage>
				</Flex.Block>

				<Flex.Block>
					<View>
						<h1>Single (Post, NOT within Template)</h1>
						<BlockComponents showColorPicker postId="p2" />
					</View>
				</Flex.Block>
			</Flex>
		</View>
	);
}

function BlockComponents({
	showColorPicker = false,
	withBlockStyles = true,
	blockLimit = undefined,
	postId = "p1",
}) {
	const blocks = usePostBlocks(postId);
	const updateBlockStyles = useUpdatePostBlockStyles();

	return (
		<>
			{blocks.map((block, index) => {
				const { type, styles, ...props } = block;
				const shouldRenderBlock = !isUndefined(blockLimit)
					? index + 1 === blockLimit
					: true;

				if (!shouldRenderBlock) {
					return null;
				}

				const blockMarkup = React.createElement(type, {
					...props,
					key: block.id,
				});

				const handleOnTextColorChange = event => {
					updateBlockStyles({
						id: postId,
						blockId: block.id,
						styles: {
							colors: {
								text: event.target.value,
							},
						},
					});
				};

				const handleOnBackgroundColorChange = event => {
					updateBlockStyles({
						id: postId,
						blockId: block.id,
						styles: {
							colors: {
								background: event.target.value,
							},
						},
					});
				};

				return (
					<BlockItemWrapper
						id={postId}
						blockId={block.id}
						withBlockStyles={withBlockStyles}
						key={block.id}
					>
						<Flex alignItems="top" maxWidth={600}>
							<Flex.Block>{blockMarkup}</Flex.Block>
							{showColorPicker && (
								<>
									<Flex.Item>
										Text
										<br />
										<input
											type="color"
											onChange={handleOnTextColorChange}
										/>
									</Flex.Item>
									<Flex.Item>
										BG
										<br />
										<input
											type="color"
											onChange={
												handleOnBackgroundColorChange
											}
										/>
									</Flex.Item>
								</>
							)}
						</Flex>
					</BlockItemWrapper>
				);
			})}
		</>
	);
}

function BlockItemWrapper({ children, styles, withBlockStyles, ...props }) {
	const { blockId, id } = props;
	const blockCssVariables = usePostBlockStylesCssVariables({ id, blockId });
	const style = withBlockStyles ? blockCssVariables : null;

	return React.cloneElement(children, { style, ...props });
}

function DocumentPage({ children }) {
	const [themeDocument] = useCurrentThemeDocuments();
	const documentId = themeDocument ? themeDocument.id : null;
	const documentCssVariables = useThemeDocumentStylesCssVariables(documentId);

	return <View style={documentCssVariables}>{children}</View>;
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
