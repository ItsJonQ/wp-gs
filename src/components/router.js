import React from "react";
import { HashRouter, Switch } from "react-router-dom";

export function Router({ children }) {
	return (
		<HashRouter>
			<Switch>{children}</Switch>
		</HashRouter>
	);
}
