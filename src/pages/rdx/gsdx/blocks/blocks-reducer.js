import { createBlockData } from "./blocks-actions";
import { BLOCKS_ACTIONS as ACTIONS } from "./blocks-actions";
import { merge } from "../utils";

const blocks = [0, 1, 2, 3, 4];

const initialBlocks = blocks.map(() =>
	createBlockData({
		type: "p",
		children:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend sollicitudin nisl ac fermentum. Pellentesque fermentum elementum metus in iaculis. Nullam lacinia justo eu mauris consectetur laoreet in nec ante.",
	})
);

export const initialState = initialBlocks;

export function blocksReducer(state = initialState, action) {
	const { payload } = action;
	switch (action.type) {
		case ACTIONS.UPDATE_BLOCK_STYLES:
			return state.map(block => {
				if (block.id === payload.id) {
					return {
						...block,
						styles: merge(block.styles, payload.styles),
					};
				}
				return block;
			});

		default:
			return state;
	}
}
