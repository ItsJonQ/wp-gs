import React from "react";
import { SE } from "../../components";

export function ParagraphBlock({ content, withBlockStyles, ...props }) {
	return (
		<SE.p {...props} withBlockStyles={withBlockStyles}>
			{content}
		</SE.p>
	);
}
