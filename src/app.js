import React from "react";
import { Route } from "react-router-dom";
import { Router } from "./components";
import { Home } from "./pages/home";
import { Visualizer } from "./pages/v";
import { Visualizer2 } from "./pages/v2";
import { Iteration2 } from "./pages/iteration2";
import { Renderer1 } from "./pages/renderer1";

export function App() {
	return (
		<Router>
			<Route path="/v2/:id?" exact component={Visualizer2} />
			<Route path="/v/:id?" exact component={Visualizer} />
			<Route path="/i2" component={Iteration2} />
			<Route path="/r1" component={Renderer1} />
			<Route path="/" component={Home} />
		</Router>
	);
}
