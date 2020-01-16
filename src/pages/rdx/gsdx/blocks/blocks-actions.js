import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createActionTypes, merge, uuid } from "../utils";

const ACTION_TYPES = ["UPDATE_BLOCK_STYLES"];

export const BLOCKS_ACTIONS = createActionTypes(ACTION_TYPES);

export function createBlockData(props = {}) {
	const data = {
		id: uuid(),
		styles: {},
		type: "div",
	};

	return merge(data, props);
}

export function useUpdateBlockStyles() {
	const dispatch = useDispatch();

	const updateBlockStyles = useCallback(
		({ id, styles }) => {
			dispatch({
				type: BLOCKS_ACTIONS.UPDATE_BLOCK_STYLES,
				payload: {
					id,
					styles,
				},
			});
		},
		[dispatch]
	);

	return updateBlockStyles;
}
