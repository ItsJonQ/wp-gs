import { useEffect } from "react";
import { useControls } from "@itsjonq/controls";
import { globalStyles, useGlobalStylesState } from "./global-styles";

function useFontControls() {
	const globalStylesState = useGlobalStylesState();
	const { range } = useControls();
	const {
		fontScale,
		fontSizes: { base },
	} = globalStylesState;

	const config = {
		fontSizes: {
			base: range("fontSizes.base", base, {
				min: 11,
				max: 21,
			}),
		},
		fontScale: range("fontScale", fontScale, {
			min: 1.1,
			max: 1.45,
			step: 0.05,
		}),
	};

	useEffect(() => {
		globalStyles.setProps(config);
	}, [config]);
}

function useColorControls() {
	const globalStylesState = useGlobalStylesState();
	const { color } = useControls();
	const colors = globalStylesState.colors || {};

	const configColors = Object.keys(colors).reduce((collection, key) => {
		const value = globalStylesState.colors[key];
		return {
			...collection,
			[key]: color(`colors.${key}`, value),
		};
	}, {});

	useEffect(() => {
		globalStyles.setProps({
			colors: configColors,
		});
	}, [color, configColors]);
}

export function useKnobs() {
	useColorControls();
	useFontControls();
}
