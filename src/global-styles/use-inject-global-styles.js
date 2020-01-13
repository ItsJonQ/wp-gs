import { useEffect } from "react";
import { useGlobalStylesCssString } from "./use-global-styles";

export function useInjectGlobalStyles() {
	const html = useGlobalStylesCssString();

	useEffect(() => {
		let node = document.querySelector("style[data-wp-gs");
		if (!node) {
			node = document.createElement("style");
			node.setAttribute("data-wp-gs", "");

			document.getElementsByTagName("head")[0].appendChild(node);
		}
		node.innerHTML = html;
	}, [html]);

	useEffect(() => {
		return () => {
			const node = document.querySelector("style[data-wp-gs");

			if (node) {
				node.parentElement.removeChild(node);
			}
		};
	}, []);
}
