import React from "react";
import {
	StyleSystemProvider,
	useGlobalStylesSheetCssString,
} from "./style-system";
import { Flex, View } from "@itsjonq/elm";
import { ParagraphBlock } from "./blocks";

const theme = {
	colors: {
		text: "black",
	},
};

export function Renderer1() {
	const css = useGlobalStylesSheetCssString();
	return (
		<StyleSystemProvider theme={theme}>
			<View maxWidth={720} padding={20} margin="auto">
				<h3>Scope Test</h3>
				<View>
					<p>
						Same paragraph block. Being rendered into a "themed"
						node, and an unthemed node.
					</p>
					<Flex minHeight={100} margin="auto" alignItems="top">
						<Flex.Block>
							<SomeDocumentWithCustomStyles>
								<ParagraphBlock>
									Paragraph, within custom scope styled
									document
								</ParagraphBlock>
							</SomeDocumentWithCustomStyles>
						</Flex.Block>
						<Flex.Item width="30%">
							<ParagraphBlock>Paragraph OUTSIDE</ParagraphBlock>
						</Flex.Item>
					</Flex>
					<p>
						For Block elements, this solution works with regular CSS
						classes, as well as the global style StyledElement
						components.
					</p>
				</View>
				<View>
					<hr />
					<h3>CSS Output</h3>
					<p>
						Generated CSS HTML output by the Renderer. Hashed
						classNames are consistent. The hash is generated based
						on the style value. As long as the style value is the
						same, the hash is the same.
					</p>
					<p>
						This can be saved to the DB, and injected into the head
						during SSR. No hydration required on the front-end.
					</p>
					<View as="pre" {...{ fontSize: 11, maxWidth: 300 }}>
						<code>{css}</code>
					</View>
				</View>
			</View>
		</StyleSystemProvider>
	);
}

function SomeDocumentWithCustomStyles({ children }) {
	const theme = {
		colors: {
			background: "#333",
			text: "#eee",
		},
	};

	return <StyleSystemProvider theme={theme}>{children}</StyleSystemProvider>;
}
