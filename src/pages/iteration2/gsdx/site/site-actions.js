import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createActionTypes } from "../utils";

const ACTION_TYPES = ["CHANGE_THEME"];

export const SITE_ACTIONS = createActionTypes(ACTION_TYPES);

export function useChangeSiteTheme() {
	const dispatch = useDispatch();

	const changeSiteTheme = useCallback(
		theme => {
			dispatch({
				type: SITE_ACTIONS.CHANGE_THEME,
				payload: {
					theme,
				},
			});
		},
		[dispatch]
	);

	return changeSiteTheme;
}
