import React, { useRef, useEffect } from "react";
import { get, isUndefined } from "lodash";
import { Provider } from "react-redux";
import { useControls, Controls } from "@itsjonq/controls";
import { Flex, View } from "@itsjonq/elm";
import { ParagraphBlock } from "./blocks";
import { StyleSystemContextProvider, useStyleProp } from "./contexts";
import "./rdx.css";

import {
	store,
	useChangeSiteTheme,
	useCurrentTheme,
	useCurrentThemeDocuments,
	useInjectGlobalStyles,
	usePostBlocks,
	usePostBlockStylesData,
	useSetDocumentStyles,
	useSetGlobalStyles,
	useThemeDocumentStylesCssVariables,
	useThemes,
	useUpdatePostBlockStyles,
} from "./gsdx";

function AppProvider({ children }) {
	return <Provider store={store}>{children}</Provider>;
}

export function Iteration2() {
	return (
		<AppProvider>
			<StyleSystemContextProvider>
				<App />
			</StyleSystemContextProvider>
			<Controls title="Global Styles" />
		</AppProvider>
	);
}

function App() {
	useBootstrapApp();
	useGlobalFontControls();

	return (
		<View padding={30}>
			<ThemeSwitcher />

			<hr />

			<GlobalExample />

			<hr />

			<StyleSystemContextProvider documentId="d1">
				<DocumentExample />
			</StyleSystemContextProvider>

			<hr />

			<BlockExample />
		</View>
	);
}

function GlobalExample() {
	const setGlobalStyles = useSetGlobalStyles();

	const globalTextColor = useStyleProp("colors.text");
	const globalBackgroundColor = useStyleProp("colors.background");

	const handleOnGlobalTextColorChange = event => {
		setGlobalStyles({
			colors: {
				text: event.target.value,
			},
		});
	};

	const handleOnGlobalBackgroundColorChange = event => {
		setGlobalStyles({
			colors: {
				background: event.target.value,
			},
		});
	};

	return (
		<View>
			<Flex maxWidth={600}>
				<Flex.Block>
					<h1>Global</h1>
				</Flex.Block>
				<InputColorControls
					textColor={globalTextColor}
					backgroundColor={globalBackgroundColor}
					onChangeTextColor={handleOnGlobalTextColorChange}
					onChangeBackgroundColor={
						handleOnGlobalBackgroundColorChange
					}
				/>
			</Flex>
			<BlockComponents withBlockStyles={false} blockLimit={1} />
		</View>
	);
}

function DocumentExample() {
	const setDocumentStyles = useSetDocumentStyles();
	const documentId = "d1";

	const documentTextColor = useStyleProp("colors.text");
	const documentBackgroundColor = useStyleProp("colors.background");

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
		<DocumentPage>
			<Flex maxWidth={600}>
				<Flex.Block>
					<h1>Template</h1>
				</Flex.Block>
				<InputColorControls
					textColor={documentTextColor}
					backgroundColor={documentBackgroundColor}
					onChangeTextColor={handleOnDocumentTextColorChange}
					onChangeBackgroundColor={
						handleOnDocumentBackgroundColorChange
					}
				/>
			</Flex>
			<BlockComponents withBlockStyles={false} blockLimit={1} />
		</DocumentPage>
	);
}

function BlockExample() {
	return (
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
	);
}

function BlockComponents({
	showColorPicker = false,
	withBlockStyles = true,
	blockLimit = undefined,
	postId = "p1",
}) {
	const blocks = usePostBlocks(postId);

	return (
		<>
			{blocks.map((block, index) => {
				const shouldRenderBlock = !isUndefined(blockLimit)
					? index + 1 === blockLimit
					: true;

				if (!shouldRenderBlock) {
					return null;
				}

				return (
					<BlockItem
						{...block}
						showColorPicker={showColorPicker}
						postId={postId}
						blockId={block.id}
						withBlockStyles={withBlockStyles}
						key={block.id}
					/>
				);
			})}
		</>
	);
}

function BlockItem({
	styles,
	withBlockStyles,
	type,
	showColorPicker,
	blockId,
	postId,
	...props
}) {
	const updateBlockStyles = useUpdatePostBlockStyles();

	const blockIdentificationProps = {
		id: postId,
		blockId,
	};

	const textColor = useStyleProp("colors.text", blockIdentificationProps);
	const backgroundColor = useStyleProp(
		"colors.background",
		blockIdentificationProps
	);

	const handleOnTextColorChange = event => {
		updateBlockStyles({
			id: postId,
			blockId: blockId,
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
			blockId: blockId,
			styles: {
				colors: {
					background: event.target.value,
				},
			},
		});
	};

	return (
		<Flex alignItems="top" maxWidth={600}>
			<Flex.Block>
				<ParagraphBlock
					withBlockStyles={withBlockStyles}
					blockId={blockId}
					postId={postId}
					key={blockId}
					content={props.children}
				/>
			</Flex.Block>
			{showColorPicker && (
				<InputColorControls
					textColor={textColor}
					backgroundColor={backgroundColor}
					onChangeTextColor={handleOnTextColorChange}
					onChangeBackgroundColor={handleOnBackgroundColorChange}
				/>
			)}
		</Flex>
	);
}

function DocumentPage({ children }) {
	const [themeDocument] = useCurrentThemeDocuments();
	const documentId = themeDocument ? themeDocument.id : null;
	const documentCssVariables = useThemeDocumentStylesCssVariables(documentId);

	return (
		<StyleSystemContextProvider documentId={documentId}>
			<View style={documentCssVariables}>{children}</View>
		</StyleSystemContextProvider>
	);
}

function InputColorControls({
	textColor,
	backgroundColor,
	onChangeTextColor,
	onChangeBackgroundColor,
	onResetTextColor,
	onResetBackgroundColor,
	showResetButtons = false,
}) {
	return (
		<View>
			<Flex justifyContents="left" marginBottom={5}>
				<Flex.Item>
					<View>
						<View fontSize={10}>TEXT</View>
						<input
							type="color"
							onChange={onChangeTextColor}
							value={textColor}
						/>
					</View>
					{showResetButtons && (
						<button onClick={onResetTextColor}>Reset</button>
					)}
				</Flex.Item>
				<Flex.Item>
					<View>
						<View fontSize={10}>BG</View>
						<input
							type="color"
							onChange={onChangeBackgroundColor}
							value={backgroundColor}
						/>
					</View>
					{showResetButtons && (
						<button onClick={onResetBackgroundColor}>Reset</button>
					)}
				</Flex.Item>
			</Flex>
		</View>
	);
}

function ThemeSwitcher() {
	const themes = useThemes();
	const currentTheme = useCurrentTheme();
	const changeSiteTheme = useChangeSiteTheme();

	return (
		<View>
			<h2>{`Theme Switcher (Currently: ${currentTheme.name})`}</h2>
			<Flex alignItems="left" maxWidth={500}>
				{themes.map(theme => {
					const colors = theme.styles.colors || {};
					const backgroundColor = colors.background;
					const textColor = colors.text;

					return (
						<Flex.Block key={theme.id}>
							<View
								display="block"
								padding={8}
								width="100%"
								as="button"
								backgroundColor={backgroundColor}
								color={textColor}
								onClick={() => changeSiteTheme(theme.name)}
							>
								{theme.name}
							</View>
						</Flex.Block>
					);
				})}
			</Flex>
		</View>
	);
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

function useGlobalFontControls() {
	const { range } = useControls();
	const setGlobalStyles = useSetGlobalStyles();

	const fontSize = range("fontSizes.base", 16, { min: 11, max: 18 });

	useEffect(() => {
		const config = {
			fontSizes: {
				base: fontSize,
			},
		};
		setGlobalStyles(config);
	}, [fontSize, setGlobalStyles]);
}
