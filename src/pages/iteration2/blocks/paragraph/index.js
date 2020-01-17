import React from "react";
import { useStyles } from "../../contexts/style-system-context";

export function ParagraphBlock({ content, withBlockStyles, ...props }) {
	const style = useStyles(props);
	const componentStyles = withBlockStyles ? style : null;

	return <p style={componentStyles}>{content}</p>;
}
