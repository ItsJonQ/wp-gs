import React from "react";
import { SE, useStyledClassName } from "../style-system";
import "./paragraph.css";

export function ParagraphBlock(props) {
	return (
		<ParagraphWrapper>
			<SE.p
				{...props}
				className="wp-block-paragraph"
				sx={{
					background: "colors.background",
					color: "colors.text",
				}}
			/>
		</ParagraphWrapper>
	);
}

/**
 * An example of an implementation without using StyledElement.primitive.
 */
function ParagraphWrapper({ children, ...props }) {
	const className = useStyledClassName(props);
	return <div className={className}>{children}</div>;
}
