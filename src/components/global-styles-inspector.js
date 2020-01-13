import React, { useState } from "react";
import { useControls } from "@itsjonq/controls";
import { View } from "@itsjonq/elm";
import {
	useGlobalStylesCssString,
	useGlobalStylesState,
	useGlobalStyles,
	defaultTheme,
} from "../global-styles";

export function GlobalStylesInspector() {
	const [show, setShow] = useState(false);
	const toggle = () => setShow(!show);

	return (
		<>
			<View position="fixed" top={8} right={8} zIndex={301}>
				<button onClick={toggle}>Toggle Inspector</button>
			</View>
			{show && (
				<View
					display="flex"
					position="fixed"
					top={0}
					bottom={0}
					left={0}
					right={0}
					zIndex={300}
				>
					<View
						flex={1}
						height="100%"
						display="flex"
						flexDirection="column"
					>
						<DefaultThemePanel />
						<ThemePanel />
						<UserConfigPanel />
					</View>
					<View
						flex={1}
						height="100%"
						display="flex"
						flexDirection="column"
					>
						<StatePanel />
						<CssVariablePanel />
					</View>
				</View>
			)}
		</>
	);
}

function JSONPanel({ data, title, actions }) {
	return (
		<Panel title={title} actions={actions}>
			{JSON.stringify(data, null, 2)}
		</Panel>
	);
}

function Panel({ children, title, actions }) {
	return (
		<View
			padding={8}
			backgroundColor="#eee"
			fontSize={11}
			position="relative"
			flex={1}
			overflowY="auto"
			maxHeight="100%"
			boxShadow="0 0 0 1px rgba(0, 0, 0, 0.1)"
		>
			<View as="h3" fontSize={11} margin={0}>
				{title}
			</View>
			{actions && (
				<View position="absolute" top={2} right={2}>
					{actions}
				</View>
			)}
			<pre>{children}</pre>
		</View>
	);
}

function DefaultThemePanel() {
	return <JSONPanel title="Default: Theme" data={defaultTheme} />;
}

function ThemePanel() {
	const globalStyles = useGlobalStyles();
	const themeData = globalStyles.__getThemeState();

	return <JSONPanel data={themeData} title="Theme: Custom" />;
}

function UserConfigPanel() {
	const { attributes } = useControls();

	return <JSONPanel data={attributes} title="user: Overrides" />;
}

function StatePanel() {
	const globalStylesState = useGlobalStylesState();

	return <JSONPanel title="Merged Config" data={globalStylesState} />;
}

function CssVariablePanel() {
	const css = useGlobalStylesCssString();

	return <Panel title="CSS Variable Output">{css}</Panel>;
}
