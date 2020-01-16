import { useSelector } from "react-redux";
import { useStyleDataFromSource } from "../core";

export const blocksSelector = state => state.blocks;

export const useBlocks = () => {
	return useSelector(blocksSelector);
};

export const useBlockStyles = id => {
	const blocks = useBlocks();
	const block = blocks.find(block => block.id === id);

	if (!block) return {};

	return block.styles;
};

export const useBlockStylesData = id => {
	const blockStyles = useBlockStyles(id);
	const styleData = useStyleDataFromSource(blockStyles);

	return styleData;
};

export const useBlockStylesCssVariables = id => {
	const styleData = useBlockStylesData(id);

	return styleData.variables;
};
