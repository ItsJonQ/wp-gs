import React from "react";
import { Flex, View } from "@itsjonq/elm";

export function StyleHierarchyStack({
	color = "black",
	global = false,
	theme = null,
	blocks = [],
}) {
	const defaultColor = "black";
	const globalColor = color || theme || defaultColor;
	const styledColor = theme || defaultColor;

	return (
		<View position="fixed" bottom={30} right={30}>
			<View
				width={400}
				display="flex"
				flexDirection="column"
				alignItems="center"
			>
				<Flex justifyContent="center">
					<Flex.Item marginBottom={10} fontSize={11}>
						Style Hierarchy
					</Flex.Item>
				</Flex>
				<Flex>
					{blocks.map(block => (
						<Flex.Block key={block.id}>
							<StyleHierarchyTier
								{...block}
								level={3}
								label="Block"
								width="100%"
							/>
						</Flex.Block>
					))}
				</Flex>
				<StyleHierarchyTier
					level={2}
					color={globalColor}
					label="Global"
					isFilled={!!global}
				/>
				<StyleHierarchyTier
					level={1}
					color={styledColor}
					label="Theme"
					isFilled={!!theme}
				/>

				<StyleHierarchyTier level={0} color="black" label="Core" />
			</View>
		</View>
	);
}

function StyleHierarchyTier({
	level = 0,
	color = "black",
	label = "",
	isFilled = true,
	...props
}) {
	const width = `${100 - level * 15}%`;
	const transitionDelay = `${(level * 1.5 + 1) * 100}ms`;
	const transition = `all 200ms ease ${transitionDelay}`;

	const style = isFilled
		? {
				backgroundColor: color,
				color: "white",
		  }
		: {
				backgroundColor: `rgba(0, 0, 0, 0)`,
				color: "black",
		  };

	return (
		<View
			alignItems="center"
			border={`2px solid ${color}`}
			display="flex"
			fontSize={11}
			justifyContent="center"
			margin={2}
			minHeight={25}
			padding="3px 10px"
			textAlign="center"
			transition={transition}
			width={width}
			{...style}
			{...props}
		>
			<View>{label}</View>
		</View>
	);
}
