import React from "react";
import { Route } from "react-router-dom";
import { Router } from "./components";
import { Home } from "./pages/home";
import { Visualizer } from "./pages/v";

export function App() {
	return (
		<Router>
			<Route path="/v/:id?" exact component={Visualizer} />
			<Route path="/" component={Home} />
		</Router>
	);
}
