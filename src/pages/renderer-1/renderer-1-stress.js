import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { StatsGraph } from "@helpscout/stats";
import colorize from "tinycolor2";
import {
	RootStyleSystemProvider,
	StyleSystemProvider,
	globalStylesManager,
	SE,
} from "./style-system";

const ITEM_COUNT = 100;
const TIMEOUT_DURATION = 16;

/**
 * This experiment combines concepts from Emotion (internals) and Theme-UI spec.
 */

export function Renderer1Stress() {
	const { enableTick, tick, toggleTick } = useUpdateTick(false);
	const [scoping, setScoping] = useState(false);

	const getStyle = () => {
		return {
			"--text": "white",
			"--bg": !scoping
				? tick
					? colorize.random().toHexString()
					: "#bbb"
				: null,
		};
	};

	if (!enableTick) {
		globalStylesManager.flush();
	}

	const toggleScope = () => setScoping(!scoping);

	const theme = {
		bg: "black",
		bgHover: "red",
		color: "white",
	};

	const totalGeneratedClassNames = Object.keys(
		globalStylesManager.cache.inserted
	).length;

	return (
		<RootStyleSystemProvider>
			<StyleSystemProvider theme={theme}>
				<StatsGraph />
				<div className="App">
					<h1>Safe Enhanced Emotion (Stress) Test</h1>
					<SE.h3 css={{ color: "red" }}>
						(WARNING: FLASHING COLOURS)
					</SE.h3>
					<hr />
					<div>
						<button onClick={toggleTick}>{`Toggle Tick ${
							enableTick ? "OFF" : "ON"
						}`}</button>
						{" || "}
						<button onClick={toggleScope}>{`Toggle Scoping ${
							scoping ? "OFF" : "ON"
						}`}</button>
						{" || "}
						(Scope: Black)
						{" || "}
						{`(Update Count: ${totalGeneratedClassNames})`}
						{" || "}
						{`(Update Every: ${TIMEOUT_DURATION / 1000}ms)`}
					</div>
					<hr />
					<SE.div
						sx={{
							background: "bg",
							color: "color",
							"&:hover": { background: "bgHover" },
						}}
					>
						Tapping into StyleSystemProvider
					</SE.div>
					<SE.div
						css={{
							"--bg": "black",
							display: "flex",
							flexWrap: "wrap",
						}}
					>
						{Array(ITEM_COUNT)
							.fill("")
							.map((_, index) => (
								<SE.span
									key={`item-${index}`}
									className="custom-span"
									css={[
										getStyle(),
										{
											background: "var(--bg)",
										},
										{
											color: "var(--text)",
											fontSize: 11,
											width: "5%",
											padding: 5,
										},
									]}
								>
									{index}
								</SE.span>
							))}
					</SE.div>
					<SE.div
						css={`
							background: blue;
							color: white;
						`}
					>
						SE.div: Hello
					</SE.div>
					<RandomStyledComponent>
						@emotion/styled: Hello
					</RandomStyledComponent>
				</div>
			</StyleSystemProvider>
		</RootStyleSystemProvider>
	);
}

function useUpdateTick(initialState = false) {
	const [tick, setTick] = useState(initialState);
	const timeRef = useRef();
	const [enableTick, setEnableTick] = useState(initialState);

	useEffect(() => {
		if (timeRef.current) {
			window.clearTimeout(timeRef.current);
		}

		const updateTick = () => setTick(!tick);

		if (enableTick) {
			timeRef.current = window.setTimeout(
				() => updateTick(),
				TIMEOUT_DURATION
			);
		}

		return () => {
			if (timeRef.current) {
				window.clearTimeout(timeRef.current);
			}
		};
	}, [enableTick, tick, timeRef]);

	const toggleTick = () => setEnableTick(!enableTick);

	return { tick, enableTick, toggleTick };
}

const RandomStyledComponent = styled.div`
	background: purple;
	padding: 20px;
`;
