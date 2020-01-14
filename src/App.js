import React from "react";
import { Route } from "react-router-dom";
import { Router } from "./components";
import { Home } from "./pages/home";
import { Visualizer } from "./pages/visualizer";

export function App() {
	return (
		<Router>
			<Route path="/visualizer" component={Visualizer} />
			<Route path="/v" exact component={Visualizer} />
			<Route path="/" component={Home} />
		</Router>
	);
}
