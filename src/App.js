import React from 'react';
import { useGlobalStyles, useInjectGlobalStyles } from './global-styles';

function App() {
	const globalStyles = useGlobalStyles();
	useInjectGlobalStyles();

	const update = () => {
		globalStyles.setProps({ button: { backgroudColor: 'red' } });
	};

	return (
		<div className="App">
			<button onClick={update}>Update</button>
		</div>
	);
}

export default App;
