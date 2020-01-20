import React, {
	useRef,
	useEffect,
	useReducer,
	createContext,
	useCallback,
} from "react";
import merge from "deepmerge";
import equals from "fast-deep-equal";
import { globalStylesManager } from "./manager";
import { cssVariableTransform } from "../../shared";

const initialRootStyleSystemContext = { className: "", theme: {} };

export const RootStyleSystemStateContext = createContext(
	initialRootStyleSystemContext
);
export const RootStyleSystemDispatchContext = createContext(
	initialRootStyleSystemContext
);

const rootStyleSystemReducer = (state, action) => {
	switch (action.type) {
		case "SET_BLOCK_PROPS":
			const nextState = merge(state, { ...action.payload });
			if (!equals(state, nextState)) {
				return nextState;
			}
			return state;
		default:
			return state;
	}
};

export const RootStyleSystemProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		rootStyleSystemReducer,
		initialRootStyleSystemContext
	);
	const htmlClassName = state.className;

	useEffect(() => {
		if (document.documentElement && htmlClassName) {
			document.documentElement.classList.add(htmlClassName);
		}
	}, [htmlClassName]);

	return (
		<RootStyleSystemStateContext.Provider value={state}>
			<RootStyleSystemDispatchContext.Provider value={dispatch}>
				{children}
			</RootStyleSystemDispatchContext.Provider>
		</RootStyleSystemStateContext.Provider>
	);
};

export const useRootStyleSystemState = () =>
	React.useContext(RootStyleSystemStateContext);
export const useRootStyleSystemDispatch = () =>
	React.useContext(RootStyleSystemDispatchContext);

export const useRootStyleSystem = () => [
	useRootStyleSystemState(),
	useRootStyleSystemDispatch(),
];

export const useSetBlockProps = () => {
	const dispatch = useRootStyleSystemDispatch();
	const setBlockProps = useCallback(
		(theme = {}) => {
			const className = globalStylesManager.css(
				cssVariableTransform(theme)
			);
			dispatch({
				type: "SET_BLOCK_PROPS",
				payload: { className, theme },
			});
		},
		[dispatch]
	);

	return setBlockProps;
};

export const useBlockProps = () => {
	const state = useRootStyleSystemState();

	return state;
};

export const useRegisterBlockCssProperties = bx => {
	const didRegisterRef = useRef();
	const setBlockProps = useSetBlockProps();

	if (!bx) return;
	if (didRegisterRef.current) return;

	setBlockProps(bx);
	didRegisterRef.current = true;
};
