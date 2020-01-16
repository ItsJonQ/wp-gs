import { createBlockData } from "../blocks";
import { createPostData, POSTS_ACTIONS as ACTIONS } from "./posts-actions";
import { merge } from "../utils";

const generateBlocks = collection =>
	collection.map(() =>
		createBlockData({
			type: "p",
			children:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend sollicitudin nisl ac fermentum. Pellentesque fermentum elementum metus in iaculis. Nullam lacinia justo eu mauris consectetur laoreet in nec ante.",
		})
	);

const post1 = createBlockData({
	id: "p1",
	blocks: generateBlocks([1, 2, 3, 4]),
});
const post2 = createBlockData({ id: "p2", blocks: generateBlocks([1, 2, 3]) });

export const initialState = [post1, post2];

export function postsReducer(state = initialState, action) {
	const { payload } = action;

	switch (action.type) {
		case ACTIONS.UPDATE_POST_BLOCK_STYLES:
			return state.map(post => {
				if (post.id === payload.id) {
					const nextBlocks = post.blocks.map(block => {
						if (block.id === payload.blockId) {
							return {
								...block,
								styles: merge(block.styles, payload.styles),
							};
						}
						return block;
					});

					return {
						...post,
						blocks: nextBlocks,
					};
				}
				return post;
			});

		default:
			return state;
	}
}
