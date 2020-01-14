import React from "react";
import styled from "@emotion/styled";
import { useGlobalStylesState } from "../../../global-styles";

export function SwatchesBlock() {
	const { color } = useGlobalStylesState();
	const colors = Object.keys(color);

	return (
		<>
			{colors.map(color => (
				<SwatchExamples color={color} key={color} />
			))}
		</>
	);
}

function SwatchExamples({ color }) {
	const state = useGlobalStylesState();
	const colorData = state.color[color];

	if (!colorData) return null;

	return (
		<Wrapper>
			<Title>{color}</Title>
			<SwatchContainer>
				<Swatch
					background={`var(--wp-gs-color-${color}-light30)`}
					color={colorData.light30}
				/>
				<Swatch
					background={`var(--wp-gs-color-${color}-light20)`}
					color={colorData.light20}
				/>
				<Swatch
					background={`var(--wp-gs-color-${color}-light10)`}
					color={colorData.light10}
				/>
				<Swatch
					background={`var(--wp-gs-color-${color}-base)`}
					color={colorData.base}
				/>
				<Swatch
					background={`var(--wp-gs-color-${color}-dark10)`}
					color={colorData.dark10}
				/>
				<Swatch
					background={`var(--wp-gs-color-${color}-dark20)`}
					color={colorData.dark20}
				/>
				<Swatch
					background={`var(--wp-gs-color-${color}-dark30)`}
					color={colorData.dark30}
				/>
			</SwatchContainer>
		</Wrapper>
	);
}

function Swatch({ color, background }) {
	return (
		<SwatchWrapper>
			<SwatchView style={{ background }} />
			{color}
		</SwatchWrapper>
	);
}

const Wrapper = styled.div`
	margin-bottom: 12px;
`;

const SwatchContainer = styled.div`
	display: flex;
	justify-content: flex-start;
`;

const SwatchWrapper = styled.div`
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	padding: 2px;
	margin-right: 8px;
	font-size: 8px;
	border-radius: 4px;
`;

const SwatchView = styled.div`
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
	width: 40px;
	height: 24px;
	border-radius: 4px;
`;

const Title = styled.h5`
	font-size: 13px;
	margin: 0 0 4px;
`;
