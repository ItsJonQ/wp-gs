import React from "react";
import { Flex, View } from "@itsjonq/elm";

export function StyleHierarchyStack({
	color = "black",
	global = null,
	theme = null,
	document = null,
	showDocument = true,
	blocks = [],
}) {
	const defaultColor = "black";
	const styledColor = theme || defaultColor;
	const globalColor = color || styledColor;
	const documentColor = document || globalColor;

	return (
		<View position="fixed" bottom={30} right={30}>
			<View
				width={460}
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
								level={4}
								label="Block"
								width="100%"
							/>
						</Flex.Block>
					))}
				</Flex>
				{showDocument && (
					<StyleHierarchyTier
						level={3}
						color={documentColor}
						label="Document"
						isFilled={!!document}
					/>
				)}
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
	const transitionDelay = `${(level * 1.25 + 1) * 60}ms`;
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
			padding="3px 6px"
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
