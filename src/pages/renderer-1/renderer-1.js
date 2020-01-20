import React from "react";
import {
	RootStyleSystemProvider,
	StyleSystemProvider,
	globalStylesManager,
	useGlobalStylesSheetCssString,
} from "./style-system";
import { StatsGraph } from "@helpscout/stats";
import { Flex, View } from "@itsjonq/elm";
import { ParagraphBlock, CardBlock } from "./blocks";

const theme = {
	colors: {
		text: "black",
	},
};

window.gsm = globalStylesManager;

export function Renderer1() {
	const css = useGlobalStylesSheetCssString();

	return (
		<RootStyleSystemProvider>
			<StatsGraph />
			<StyleSystemProvider theme={theme}>
				<View maxWidth={720} padding={20} margin="auto">
					<h3>Scope Test</h3>
					<View>
						<p>
							Same paragraph block. Being rendered into a "themed"
							node, and an unthemed node.
						</p>
						<hr />
						<CardBlock>Card</CardBlock>
						<hr />
						<Flex minHeight={100} margin="auto" alignItems="top">
							<Flex.Block>
								<SomeDocumentWithCustomStyles>
									<ParagraphBlock>
										Paragraph, within custom scope styled
										document
									</ParagraphBlock>
									<ParagraphBlock>
										Paragraph, within custom scope styled
										document
									</ParagraphBlock>
									<ParagraphBlock>
										Paragraph, within custom scope styled
										document
									</ParagraphBlock>
									<ParagraphBlock>
										Paragraph, within custom scope styled
										document
									</ParagraphBlock>
									<ParagraphBlock>
										Paragraph, within custom scope styled
										document
									</ParagraphBlock>
									<CardBlock>Card</CardBlock>
								</SomeDocumentWithCustomStyles>
							</Flex.Block>
							<Flex.Item width="30%">
								<ParagraphBlock>
									Paragraph OUTSIDE
								</ParagraphBlock>
								<ParagraphBlock>
									Paragraph OUTSIDE
								</ParagraphBlock>
								<ParagraphBlock>
									Paragraph OUTSIDE
								</ParagraphBlock>
								<ParagraphBlock>
									Paragraph OUTSIDE
								</ParagraphBlock>
								<ParagraphBlock>
									Paragraph OUTSIDE
								</ParagraphBlock>
							</Flex.Item>
						</Flex>
						<p>
							For Block elements, this solution works with regular
							CSS classes, as well as the global style
							StyledElement components.
						</p>
					</View>
					<View>
						<hr />
						<h3>CSS Output</h3>
						<p>
							Generated CSS HTML output by the Renderer. Hashed
							classNames are consistent. The hash is generated
							based on the style value. As long as the style value
							is the same, the hash is the same.
						</p>
						<p>
							This can be saved to the DB, and injected into the
							head during SSR. No hydration required on the
							front-end.
						</p>
						<View
							as="pre"
							{...{
								fontSize: 11,
								wordBreak: "break-word",
							}}
						>
							<View as="code" whiteSpace="pre-wrap">
								{css}
							</View>
						</View>
					</View>
				</View>
			</StyleSystemProvider>
		</RootStyleSystemProvider>
	);
}

function SomeDocumentWithCustomStyles({ children }) {
	const theme = {
		card: {
			background: "#222",
			text: "#eee",
		},
		colors: {
			background: "#333",
			text: "#eee",
		},
	};

	/**
	 * NOTE: From a container perspective, there's a difference between declaring
	 * scoped Design Tokens (DT) for blocks, and setting CSS rules on the container
	 * itself.
	 *
	 * For example, setting a DT for color, and adding a CSS rule for color.
	 * The color DT will ONLY affect blocks using the theme.
	 * However, setting the CSS rule will effective everything within, obeying
	 * the default browser CSS rendering rule.
	 */

	return <StyleSystemProvider theme={theme}>{children}</StyleSystemProvider>;
}
