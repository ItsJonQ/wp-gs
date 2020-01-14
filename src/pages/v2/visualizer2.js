import React, {
	useCallback,
	useRef,
	useEffect,
	useState,
	useContext,
} from "react";
import { Route, NavLink } from "react-router-dom";
import { View } from "@itsjonq/elm";
import { ParagraphBlock, StyleHierarchyStack, useQuery } from "../shared";

const baseTheme = {
	color: "black",
	global: "",
	document: "",
};

const blueTheme = {
	color: "blue",
	global: "",
	document: "",
};

const redTheme = {
	color: "red",
	global: "",
	document: "",
};

const initialState = {
	base: baseTheme,
	blue: blueTheme,
	red: redTheme,
};

const Rdx = React.createContext({});
const useAppContext = () => useContext(Rdx);

function Provider({ children }) {
	const [theme, setTheme] = useState("base");
	const [themes, setThemes] = useState(initialState);
	const [blockData, setBlockData] = useState([]);
	const [blockChanges, setBlockChanges] = useState({});

	const updateTheme = (prop, value = "") => {
		const currentTheme = themes[theme];
		setThemes({
			...themes,
			[theme]: {
				...currentTheme,
				[prop]: value,
			},
		});
	};

	const setGlobalColor = nextColor => {
		updateTheme("global", nextColor);
	};

	const resetGlobalColor = () => {
		updateTheme("global", "");
	};

	const setDocumentColor = nextColor => {
		if (nextColor) {
			updateTheme("document", nextColor);
		}
	};

	const resetDocumentColor = () => {
		updateTheme("document", "");
	};

	const updateBlock = useCallback(
		(id, color) => {
			const nextBlockData = blockData.map(block => {
				if (block.id === id) {
					return { ...block, color };
				}
				return block;
			});

			setBlockData(nextBlockData);

			if (!blockChanges[id]) {
				setBlockChanges({ ...blockChanges, [id]: true });
			}
		},
		[blockChanges, blockData]
	);

	const resetBlockData = useCallback(() => {
		setBlockData([]);
		setBlockChanges({});
	}, []);

	const themeProps = themes[theme];
	const isBaseTheme = theme === "base";
	const themeColor = themeProps.color;
	const globalColor = themeProps.global;
	const documentColor = themeProps.document;

	const contextProps = {
		blockChanges,
		blockData,
		documentColor,
		globalColor,
		isBaseTheme,
		resetBlockData,
		resetDocumentColor,
		resetGlobalColor,
		setBlockData,
		setDocumentColor,
		setGlobalColor,
		setTheme,
		theme,
		themeColor,
		themeProps,
		themes,
		updateBlock,
	};

	return <Rdx.Provider value={contextProps}>{children}</Rdx.Provider>;
}

function BreadcrumbNav() {
	return (
		<View paddingBottom={20}>
			<NavLink to="/v2/global">Global</NavLink> /{" "}
			<NavLink to="/v2/document">Document</NavLink> /{" "}
			<NavLink to="/v2/post">Post (Single)</NavLink>
		</View>
	);
}

export function Visualizer2() {
	return (
		<Provider>
			<View padding={40} maxWidth={720}>
				<BreadcrumbNav />
				<ThemeSwitcher />
				<Route path="/v2/post" component={PostPage} />
				<Route path="/v2/document" component={DocumentPage} />
				<Route path="/v2/global" component={GlobalPage} />
				<Route path="/v2/" exact component={GlobalPage} />
				<HierarchyStack />
			</View>
		</Provider>
	);
}

function Page({ children, title }) {
	return (
		<View>
			<View marginBottom={10} as="h1">
				{title}
			</View>
			{children}
		</View>
	);
}

function GlobalPage() {
	const {
		themeColor,
		globalColor,
		setGlobalColor,
		resetGlobalColor,
	} = useAppContext();
	const color = globalColor || themeColor;

	return (
		<Page title="Global">
			<ParagraphBlock
				color={color}
				onChange={setGlobalColor}
				onReset={resetGlobalColor}
			/>
		</Page>
	);
}

function DocumentPage() {
	const {
		themeColor,
		documentColor,
		globalColor,
		setDocumentColor,
		resetDocumentColor,
	} = useAppContext();

	const color = documentColor || globalColor || themeColor;

	return (
		<Page title="Document">
			<ParagraphBlock
				color={color}
				onChange={setDocumentColor}
				onReset={resetDocumentColor}
			/>
			<ParagraphBlock color={color} showColorPicker={false} />
			<ParagraphBlock color={color} showColorPicker={false} />
			<ParagraphBlock color={color} showColorPicker={false} />
		</Page>
	);
}

function PostPage() {
	const {
		documentColor,
		globalColor,
		setBlockData,
		blockData,
		blockChanges,
		updateBlock,
		resetBlockData,
		themeColor,
	} = useAppContext();
	const baseColor = documentColor || themeColor || globalColor;

	useEffect(() => {
		const nextBlocks = ["a", "b", "c", "d"].reduce((nextBlocks, id) => {
			return [
				...nextBlocks,
				{
					id,
					color: undefined,
				},
			];
		}, []);
		setBlockData(nextBlocks);

		return () => {
			resetBlockData();
		};
	}, [setBlockData, resetBlockData]);

	const createHandleOnChange = id => nextColor => {
		updateBlock(id, nextColor);
	};

	return (
		<Page title="Post (Single)">
			{blockData.map(block => {
				const onChange = createHandleOnChange(block.id);
				const color = block.color || baseColor;
				const isFilled = !!blockChanges[block.id];

				return (
					<ParagraphBlock
						key={block.id}
						color={color}
						onChange={onChange}
						isFilled={isFilled}
					/>
				);
			})}
		</Page>
	);
}

function ThemeSwitcher() {
	const { themes, setTheme, theme } = useAppContext();
	const themeKeys = Object.keys(themes);

	return (
		<View paddingBottom={10} maxWidth={640}>
			<hr />
			<View padding="10px 0">
				<View as="h5" margin={0}>
					{`Theme Switcher (Current: ${theme})`}
				</View>
				{themeKeys.map(key => {
					const value = themes[key];
					return (
						<ThemeButton
							color={value.color}
							key={key}
							onClick={() => {
								setTheme(key);
							}}
						>
							{key}
						</ThemeButton>
					);
				})}
			</View>
			<hr />
		</View>
	);
}

function ThemeButton({ onClick, children, color }) {
	return (
		<View
			as="button"
			padding={10}
			color="white"
			backgroundColor={color}
			{...{ onClick, children }}
		/>
	);
}

function HierarchyStack() {
	const {
		isBaseTheme,
		themeProps,
		globalColor,
		documentColor,
		blockData,
		blockChanges,
	} = useAppContext();
	const themeColor = themeProps.color;
	const theme = !isBaseTheme ? themeColor : null;

	const enhancedBlockData = blockData.map(block => ({
		...block,
		isFilled: !!blockChanges[block.id],
	}));

	return (
		<StyleHierarchyStack
			blocks={enhancedBlockData}
			theme={theme}
			color={globalColor}
			global={globalColor}
			document={documentColor}
		/>
	);
}
