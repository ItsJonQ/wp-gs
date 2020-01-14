import React, { useState } from "react";
import { View } from "@itsjonq/elm";

export function Visualizer() {
	const [state, setState] = useState("blue");

	return (
		<div>
			<input onChange={e => setState(e.target.value)} value={state} />
			<StyleHierarchyStack backgroundColor={state} />
		</div>
	);
}

function StyleHierarchyStack({ backgroundColor = "blue" }) {
	return (
		<View
			width={200}
			display="flex"
			flexDirection="column"
			alignItems="center"
		>
			<StyleHierarchyTier
				level={3}
				backgroundColor={backgroundColor}
				label="Block"
			/>
			<StyleHierarchyTier
				level={2}
				backgroundColor={backgroundColor}
				label="Document"
			/>
			<StyleHierarchyTier
				level={1}
				backgroundColor={backgroundColor}
				label="Theme"
			/>
			<StyleHierarchyTier
				level={0}
				backgroundColor={backgroundColor}
				label="Core"
			/>
		</View>
	);
}

function StyleHierarchyTier({
	level = 0,
	backgroundColor = "blue",
	label = "",
}) {
	const width = `${100 - level * 15}%`;
	const transitionDelay = `${(level * 1.5 + 1) * 100}ms`;
	const transition = `all 200ms ease ${transitionDelay}`;

	return (
		<View
			alignItems="center"
			backgroundColor={backgroundColor}
			color="white"
			display="flex"
			fontSize={11}
			justifyContent="center"
			margin={2}
			minHeight={25}
			padding="3px 10px"
			textAlign="center"
			transition={transition}
			width={width}
		>
			<View>{label}</View>
		</View>
	);
}
