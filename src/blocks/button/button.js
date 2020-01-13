import React, { useEffect } from "react";
import { useControls } from "@itsjonq/controls";
import { globalStyles, useGlobalStylesState } from "../../global-styles";
import { buttonBlockTransformer } from "./button-transformer";
import { defaultStyles } from "./styles";
import "./button.css";

// Register
globalStyles.addTransformer(buttonBlockTransformer);

export function ButtonBlock({ children = "Hello", ...props }) {
	useButtonControls();

	return (
		<div className="wp-block-buttons" {...props}>
			<div className="wp-block-button">
				<a href="#" className="wp-block-button__link">
					{children}
				</a>
			</div>
		</div>
	);
}

function useButtonControls() {
	const globalStylesState = useGlobalStylesState();
	const { boolean, range, color } = useControls();

	const { backgroundColor } = globalStylesState.button || {};

	const config = {
		// backgroundColor: color("button.backgroundColor", backgroundColor),
		borderRadius: range("button.borderRadius", defaultStyles.borderRadius, {
			min: 0,
			max: 20,
		}),
		dropShadow: range("button.dropShadow", defaultStyles.dropShadow, {
			min: 0,
			max: 10,
		}),
		padding: range("button.padding", defaultStyles.padding, {
			min: 1,
			max: 10,
		}),
		borderSize: boolean("button.showBorder", defaultStyles.showBorder)
			? 1
			: 0,
	};

	useEffect(() => {
		globalStyles.setProps({
			button: config,
		});
	}, [config]);
}
