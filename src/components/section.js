import React from "react";
import { View } from "@itsjonq/elm";

export function Section({ title, children }) {
	return (
		<View marginBottom={20} padding={20}>
			<View
				as="h2"
				borderBottom="1px solid rgba(0, 0, 0, 0.2)"
				paddingBottom={10}
			>
				{title}
			</View>
			<View>{children}</View>
		</View>
	);
}
