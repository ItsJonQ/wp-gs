import React, { useState } from "react";
import { Route, NavLink } from "react-router-dom";
import { Flex, View } from "@itsjonq/elm";
import { ParagraphBlock, StyleHierarchyStack, useQuery } from "../shared";

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
