import React from "react";
import { SE, useRegisterBlockCssProperties } from "../../style-system";

const css = {
	border: "1px solid",
};
const sx = {
	borderColor: "card.borderColor",
	background: "card.background",
	borderRadius: "card.borderRadius",
	color: "card.text",
};

/**
 * Concept: A way for a block to register it's default theme values.
 * Typically, theme systems have design tokens registered, and flow top down.
 * We need a way for any child Node to declare (unique) design tokens, which
 * updates the design tokens at the top, and flow downward in an update cycle.
 */
const bx = {
	card: {
		background: "white",
		borderColor: "#eee",
		borderRadius: "8px",
		padding: "20px",
		text: "black",
	},
};

export function CardBlock({ children }) {
	useRegisterBlockCssProperties(bx);

	return (
		<SE.div css={css} sx={sx}>
			<SE.div sx={{ padding: "card.padding" }}>{children}</SE.div>
		</SE.div>
	);
}
