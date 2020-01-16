import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createActionTypes, merge, uuid } from "../utils";

const ACTION_TYPES = ["UPDATE_POST_BLOCK_STYLES"];

export const POSTS_ACTIONS = createActionTypes(ACTION_TYPES);

export function createPostData(props = {}) {
	const data = {
		id: uuid(),
		blocks: [],
	};

	return merge(data, props);
}

export function useUpdatePostBlockStyles() {
	const dispatch = useDispatch();

	const updatePostBlockStyles = useCallback(
		({ id, blockId, styles }) => {
			dispatch({
				type: POSTS_ACTIONS.UPDATE_POST_BLOCK_STYLES,
				payload: {
					id,
					styles,
					blockId,
				},
			});
		},
		[dispatch]
	);

	return updatePostBlockStyles;
}
