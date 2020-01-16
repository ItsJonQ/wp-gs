import { createStore, combineReducers, applyMiddleware } from "redux";
import { useStore } from "react-redux";
import { createLogger } from "redux-logger";

import { blocksReducer } from "./blocks";
import { coreReducer } from "./core";
import { postsReducer } from "./posts";
import { siteReducer } from "./site";
import { themesReducer } from "./themes";

const logger = createLogger({
	collapsed: true,
});

export const rootReducer = combineReducers({
	blocks: blocksReducer,
	core: coreReducer,
	posts: postsReducer,
	site: siteReducer,
	themes: themesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(logger));

export const useStoreState = () => useStore().getState();
