import React, { useEffect } from "react";
import { useControls } from "@itsjonq/controls";
import { globalStyles, useGlobalStylesState } from "../../../../global-styles";
import { buttonBlockTransformer } from "./button-transformer";
import { defaultStyles } from "./styles";
import "./button.css";

// Register
globalStyles.setProps({ button: defaultStyles });
globalStyles.addTransformer(buttonBlockTransformer);

export function ButtonBlock({ href = "", children = "Hello", ...props }) {
	useButtonControls();

	return (
		<div className="wp-block-buttons" {...props}>
			<div className="wp-block-button">
				<a href={href} tabIndex={0} className="wp-block-button__link">
					{children}
				</a>
			</div>
		</div>
	);
}

function useButtonControls() {
	const globalStylesState = useGlobalStylesState();
	const { colors } = globalStylesState;
	const { boolean, range, color } = useControls();

	const button = globalStylesState.button || {};

	const config = {
		backgroundColor: color(
			"button.backgroundColor",
			button.backgroundColor || colors.primary
		),
		borderRadius: range("button.borderRadius", button.borderRadius, {
			min: 0,
			max: 20,
		}),
		dropShadow: range("button.dropShadow", button.dropShadow, {
			min: 0,
			max: 10,
		}),
		padding: range("button.padding", button.padding, {
			min: 1,
			max: 10,
		}),
		borderSize: boolean("button.showBorder", button.showBorder) ? 1 : 0,
	};

	useEffect(() => {
		globalStyles.setProps({
			button: config,
		});
	}, [config]);
}
