import React from "react";
import { Flex, View } from "@itsjonq/elm";

export function ParagraphBlock({
	color = "black",
	onChange,
	onReset,
	showColorPicker = true,
}) {
	const handleOnChange = event => {
		if (onChange) {
			onChange(event.target.value);
		}
	};

	return (
		<Flex
			maxWidth={600}
			alignItems="top"
			paddingTop={10}
			paddingBottom={10}
		>
			<Flex.Block marginBottom={20}>
				<View
					as="p"
					color={color}
					margin={0}
					transition="all 200ms ease 200ms"
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Vivamus eleifend elit eu velit laoreet facilisis. Integer at
					est interdum, fringilla est a, ultrices elit. In hac
					habitasse platea dictumst.
				</View>
			</Flex.Block>
			{showColorPicker && (
				<Flex.Item>
					<input
						type="color"
						value={color}
						onChange={handleOnChange}
					/>
				</Flex.Item>
			)}

			<Flex.Item width={80}>
				{onReset && <button onClick={onReset}>Reset</button>}
			</Flex.Item>
		</Flex>
	);
}
