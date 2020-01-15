import uuidv4 from "uuid/v4";
export { default as merge } from "deepmerge";

export function uuid() {
	return uuidv4();
}

export function createActionTypes(values) {
	return values.reduce((actionTypes, value) => {
		return { ...actionTypes, [value]: `@@WPGS/${value}` };
	}, {});
}

export function createCssVariablesStringFromSource(source = {}) {
	const template = [];
	const keys = Object.keys(source);

	template.push(`:root {`);

	keys.forEach(key => {
		const value = source[key];
		template.push(`  ${key}: ${value};`);
	});

	template.push(`}`);

	const css = template.join("\n");

	return css;
}

export function createHtmlStringFromSource(source) {
	const template = [];
	const keys = Object.keys(source);

	template.push(`<style>`);
	template.push(`  :root {`);

	keys.forEach(key => {
		const value = source[key];
		template.push(`    ${key}: ${value};`);
	});

	template.push(`  }`);
	template.push(`</style>`);

	const html = template.join("\n");

	return html;
}
