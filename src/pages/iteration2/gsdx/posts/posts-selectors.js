import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { useStyleDataFromSource } from "../core";

export const postsSelector = state => state.posts;

const postSelector = id => {
	return createSelector(postsSelector, posts =>
		posts.find(post => post.id === id)
	);
};

const postBlocksSelector = id => {
	return createSelector(postSelector(id), post => post.blocks || []);
};

const postBlockSelector = ({ id, blockId }) => {
	return createSelector(
		postBlocksSelector(id),
		blocks => blocks.find(block => block.id === blockId) || {}
	);
};

export const usePosts = () => {
	return useSelector(postsSelector);
};

export const usePost = id => {
	const post = useSelector(postSelector(id));

	return post || {};
};

export const usePostBlocks = id => {
	const blocks = useSelector(postBlocksSelector(id));

	return blocks || [];
};

export const usePostBlock = ({ id, blockId }) => {
	const block = useSelector(postBlockSelector({ id, blockId }));

	return block || {};
};

export const usePostBlockStyles = ({ id, blockId }) => {
	const block = usePostBlock({ id, blockId });

	return block.styles || {};
};

export const usePostBlockStylesData = ({ id, blockId }) => {
	const blockStyles = usePostBlockStyles({ id, blockId });
	const styleData = useStyleDataFromSource(blockStyles);

	return styleData;
};

export const usePostBlockStylesCssVariables = ({ id, blockId }) => {
	const styleData = usePostBlockStylesData({ id, blockId });

	return styleData.variables;
};
