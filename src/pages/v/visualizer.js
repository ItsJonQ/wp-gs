import React, { useState } from "react";
import { Route, NavLink, useLocation } from "react-router-dom";
import { Flex, View } from "@itsjonq/elm";

export function Visualizer() {
	return (
		<View padding={30}>
			<BreadcrumbNav />
			<Route path="/v" component={RouteSwitcher} />
		</View>
	);
}

function BreadcrumbNav() {
	return (
		<View paddingBottom={10}>
			<NavLink to="/v?page=global">Global</NavLink> /{" "}
			<NavLink to="/v?page=document">Document</NavLink>
		</View>
	);
}

function RouteSwitcher() {
	const [color, _setColor] = useState();
	const [colors, setColors] = useState({});
	const [themeColor, _setThemeColor] = useState();
	const [global, setGlobal] = useState(false);

	const id = useQuery().get("page");

	const setColor = nextColor => {
		_setColor(nextColor);
		const nextGlobal = !!nextColor;
		setGlobal(nextGlobal);
	};

	const setThemeColor = nextColor => {
		_setThemeColor(nextColor);
	};

	const componentProps = {
		color: color || themeColor,
		global,
		colors,
		setColors,
		setColor,
		themeColor,
		setThemeColor,
	};

	const isDoc = id === "document";
	const Component = isDoc ? DocumentStylesPage : GlobalStylesPage;
	const title = isDoc ? "Document" : "Global";

	return (
		<View>
			<View margin="30px 0">
				<Flex justifyContent="left">
					<Flex.Item>
						<View
							as="button"
							padding={10}
							color="black"
							backgroundColor="white"
							border="2px solid black"
							onClick={() => setThemeColor()}
						>
							Apply Base Theme
						</View>
					</Flex.Item>
					<Flex.Item>
						<View
							as="button"
							padding={10}
							color="white"
							backgroundColor="blue"
							onClick={() => setThemeColor("blue")}
						>
							Apply Blue Theme
						</View>
					</Flex.Item>
					<Flex.Item>
						<View
							as="button"
							padding={10}
							color="white"
							backgroundColor="red"
							onClick={() => setThemeColor("red")}
						>
							Apply Red Theme
						</View>
					</Flex.Item>
				</Flex>
			</View>
			<h2>{title}</h2>
			<Component {...componentProps} />
		</View>
	);
}

function DocumentStylesPage({
	color,
	colors,
	setColors,
	themeColor,
	...props
}) {
	const ids = ["a", "b", "c", "d"];

	const blocks = ids.map(id => ({
		id,
		color: colors[id] || color,
		isFilled: !!colors[id],
	}));

	return (
		<>
			{blocks.map(block => (
				<ParagraphBlock
					key={block.id}
					{...block}
					onChange={color => {
						setColors({
							...colors,
							[block.id]: color,
						});
					}}
					onReset={() => {
						setColors({
							...colors,
							[block.id]: undefined,
						});
					}}
				/>
			))}
			<StyleHierarchyStack
				{...{
					blocks,
					color,
					theme: themeColor,
					...props,
				}}
			/>
		</>
	);
}

function GlobalStylesPage({ color, setColor, themeColor, ...props }) {
	const handleOnChange = nextColor => {
		setColor(nextColor);
	};

	const blocks = [
		{
			id: "a",
			color,
			isFilled: false,
		},
	];

	return (
		<>
			{blocks.map(block => (
				<ParagraphBlock
					key={block.id}
					{...block}
					onChange={handleOnChange}
					onReset={() => setColor()}
				/>
			))}
			<StyleHierarchyStack
				{...{ blocks, color, theme: themeColor, ...props }}
			/>
		</>
	);
}

function ParagraphBlock({ color = "black", onChange, onReset }) {
	const handleOnChange = event => {
		if (onChange) {
			onChange(event.target.value);
		}
	};

	return (
		<Flex
			maxWidth={600}
			alignItems="top"
			paddingTop={10}
			paddingBottom={10}
		>
			<Flex.Block marginBottom={20}>
				<View
					as="p"
					color={color}
					margin={0}
					transition="all 200ms ease 200ms"
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Vivamus eleifend elit eu velit laoreet facilisis. Integer at
					est interdum, fringilla est a, ultrices elit. In hac
					habitasse platea dictumst.
				</View>
			</Flex.Block>
			<Flex.Item>
				<input type="color" value={color} onChange={handleOnChange} />
			</Flex.Item>
			<Flex.Item width={80}>
				{onReset && <button onClick={onReset}>Reset</button>}
			</Flex.Item>
		</Flex>
	);
}

function StyleHierarchyStack({
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
				<StyleHierarchyTier level={0} color="black" label="Core" />
				<StyleHierarchyTier
					level={1}
					color={styledColor}
					label="Theme"
					isFilled={!!theme}
				/>
				<StyleHierarchyTier
					level={2}
					color={globalColor}
					label="Global"
					isFilled={!!global}
				/>
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

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
	return new URLSearchParams(useLocation().search);
}
