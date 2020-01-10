import { merge, createGlobalStyles } from './global-styles';
import colorize from 'tinycolor2';

const customTheme = {
	colors: {
		primary: 'blue',
		secondary: '#05a',
		accent: '#609',
		muted: '#f6f6f6f',
	},
	button: {
		backgroundColor: 'blue',
	},
};

test('Does a thing', () => {
	const gs = createGlobalStyles();

	gs.apply(customTheme);

	const buttonPlugin = (state) => {
		const nextState = {
			button: {
				backgroundColor: state.colors.primary,
			},
		};

		return merge(state, nextState);
	};

	gs.addPlugin(buttonPlugin);

	const buttonTransformer = (state) => {
		const { backgroundColor } = state.button;

		const enhancement = {
			button: {
				backgroundColor: colorize(backgroundColor).toHexString(),
				backgroundColorHover: colorize(backgroundColor)
					.lighten(5)
					.toHexString(),
				backgroundColorActive: colorize(backgroundColor)
					.darken(5)
					.toHexString(),
			},
		};

		return merge(state, enhancement);
	};

	// Add custom transformer
	gs.addTransformer(buttonTransformer);

	// Make a change
	gs.setProps({
		button: {
			backgroundColor: '#05f',
		},
	});

	gs.unsetProps('button.backgroundColor');
	gs.setProps('button.backgroundColor', 'red');

	console.log(gs.getHTMLString());
});
