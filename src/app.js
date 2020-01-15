import React from "react";
import { Route } from "react-router-dom";
import { Router } from "./components";
import { Home } from "./pages/home";
import { Visualizer } from "./pages/v";
import { Visualizer2 } from "./pages/v2";
import { RDX } from "./pages/rdx";

export function App() {
	return (
		<Router>
			<Route path="/v2/:id?" exact component={Visualizer2} />
			<Route path="/v/:id?" exact component={Visualizer} />
			<Route path="/rdx" exact component={RDX} />
			<Route path="/" component={Home} />
		</Router>
	);
}
