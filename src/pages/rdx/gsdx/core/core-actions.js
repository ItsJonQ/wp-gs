import { createActionTypes } from "../utils";

const ACTION_TYPES = ["ADD_PLUGIN", "ADD_TRANSFORM"];

export const CORE_ACTIONS = createActionTypes(ACTION_TYPES);
