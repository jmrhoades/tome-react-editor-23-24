const LayoutsIconMap = {
	Text: Text,
	CenteredText: CenteredText,
	TextAndTable: TextAndTable,
	TextAndMedia: TextAndMedia,
	TextAndDrawing: TextAndDrawing,
	TextAndChart: TextAndChart,
	Media: Media,
	TwoMedia: TwoMedia,
};

export const LayoutIcon = props => {
	const { name = "Text", theme } = props;
	const Drawing = LayoutsIconMap[name];
	const size = { width: 122, height: 70 };

	return (
		<svg
			width={size.width}
			height={size.height}
			viewBox={`0 0 ${size.width} ${size.height}`}
			fill={"none"}
			style={{
				display: "block",
				position: "relative",
				pointerEvents: "none",
				overflow: "visible",
				flexShrink: 0,
				"--page-background-color": theme.tokens["backgroundColor"],
				"--page-stroke": "var(--t2)",

				"--heading-font": theme.tokens["--heading-font"],
				"--heading-weight": theme.tokens["--heading-weight"],
				"--heading-color": theme.tokens["--heading-color"],

				"--body-font": theme.tokens["--body-font"],
				"--body-weight": theme.tokens["--body-weight"],
				"--body-color": theme.tokens["--body-color"],

				"--table-cell": "var(--t3)",
				"--null-fill": theme.mode === "light" ? "var(--t2)" : "rgba(255,255,255,.06)",
				"--icon-fill": theme.mode === "light" ? "rgba(0,0,0,.2)" : "rgba(255,255,255,.2)",
			}}
		>
			<Drawing />
		</svg>
	);
};

function Text(props) {
	return (
		<>
			<rect x="1" y="1" width="120" height="68" rx="4" fill="var(--page-background-color)" />
			<rect x="0.5" y="0.5" width="121" height="69" rx="4.5" stroke="var(--page-stroke)" />
			<text
				fill="var(--heading-color)"
				style={{ whiteSpace: "pre" }}
				fontFamily="var(--heading-font)"
				fontSize="10"
				fontWeight="var(--heading-weight)"
				letterSpacing="-0.015em"
			>
				<tspan x="7" y="17.065">
					Heading
				</tspan>
			</text>
			<text
				fill="var(--body-color)"
				style={{ whiteSpace: "pre" }}
				fontFamily="var(--body-font)"
				fontWeight="var(--body-weight)"
				fontSize="9"
				letterSpacing="0em"
			>
				<tspan x="7" y="31.2585">
					Paragraph
				</tspan>
			</text>
		</>
	);
}

function CenteredText(props) {
	return (
		<>
			<rect x="1" y="1" width="120" height="68" rx="4" fill="var(--page-background-color)" />
			<rect x="0.5" y="0.5" width="121" height="69" rx="4.5" stroke="var(--page-stroke)" />
			<text
				fill="var(--heading-color)"
				style={{ whiteSpace: "pre" }}
				fontFamily="var(--heading-font)"
				fontSize="14"
				fontWeight="var(--heading-weight)"
				letterSpacing="-0.015em"
			>
				<tspan x="47.1671" y="39.291">
					Title
				</tspan>
			</text>
		</>
	);
}

function TextAndTable(props) {
	return (
		<>
			<rect x="1" y="1" width="120" height="68" rx="4" fill="var(--page-background-color)" />
			<rect x="0.5" y="0.5" width="121" height="69" rx="4.5" stroke="var(--page-stroke)" />
			<text
				fill="var(--heading-color)"
				style={{ whiteSpace: "pre" }}
				fontFamily="var(--heading-font)"
				fontSize="10"
				fontWeight="var(--heading-weight)"
				letterSpacing="-0.015em"
			>
				<tspan x="7" y="17.065">
					Heading
				</tspan>
			</text>
			<rect x="7" y="26" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="34.5" y="26" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="62" y="26" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="89.5" y="26" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="7" y="33.5996" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="34.5" y="33.5996" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="62" y="33.5996" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="89.5" y="33.5996" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="7" y="41.1992" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="34.5" y="41.1992" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="62" y="41.1992" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="89.5" y="41.1992" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="7" y="48.8008" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="34.5" y="48.8008" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="62" y="48.8008" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="89.5" y="48.8008" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="7" y="56.4004" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="34.5" y="56.4004" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="62" y="56.4004" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
			<rect x="89.5" y="56.4004" width="25.5" height="5.6" rx="1" fill="var(--table-cell)" />
		</>
	);
}

function TextAndMedia(props) {
	return (
		<>
			<rect x="1" y="1" width="120" height="68" rx="4" fill="var(--page-background-color)" />
			<rect x="0.5" y="0.5" width="121" height="69" rx="4.5" stroke="var(--page-stroke)" />
			<text
				fill="var(--heading-color)"
				style={{ whiteSpace: "pre" }}
				fontFamily="var(--heading-font)"
				fontSize="10"
				fontWeight="var(--heading-weight)"
				letterSpacing="-0.015em"
			>
				<tspan x="7" y="17.065">
					Heading
				</tspan>
			</text>
			<text
				fill="var(--body-color)"
				style={{ whiteSpace: "pre" }}
				fontFamily="var(--body-font)"
				fontWeight="var(--body-weight)"
				fontSize="9"
				letterSpacing="0em"
			>
				<tspan x="7" y="31.2585">
					Paragraph
				</tspan>
			</text>
			<rect x="62" y="3" width="57" height="64" rx="2" fill="var(--null-fill)" />
			<path
				d="M88.5 32.5C88.5 33.8807 87.3807 35 86 35C84.6193 35 83.5 33.8807 83.5 32.5C83.5 31.1193 84.6193 30 86 30C87.3807 30 88.5 31.1193 88.5 32.5Z"
				fill="var(--icon-fill)"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M82.5 25C80.2909 25 78.5 26.7909 78.5 29V41C78.5 43.2091 80.2909 45 82.5 45H98.5C100.709 45 102.5 43.2091 102.5 41V29C102.5 26.7909 100.709 25 98.5 25H82.5ZM98.5 27H82.5C81.3954 27 80.5 27.8954 80.5 29V41C80.5 42.1046 81.3954 43 82.5 43H84.5707L92.5774 34.5719C93.6076 33.4875 95.2791 33.3276 96.4961 34.1969L100.5 37.0568V29C100.5 27.8954 99.6046 27 98.5 27ZM100.5 39.5146L95.3337 35.8244C94.928 35.5346 94.3708 35.5879 94.0274 35.9494L87.3293 43H98.5C99.6046 43 100.5 42.1046 100.5 41V39.5146Z"
				fill="var(--icon-fill)"
			/>
		</>
	);
}

function TextAndDrawing(props) {
	return (
		<>
			<rect x="1" y="1" width="120" height="68" rx="4" fill="var(--page-background-color)" />
			<rect x="0.5" y="0.5" width="121" height="69" rx="4.5" stroke="var(--page-stroke)" />
			<text
				fill="var(--heading-color)"
				style={{ whiteSpace: "pre" }}
				fontFamily="var(--heading-font)"
				fontSize="10"
				fontWeight="var(--heading-weight)"
				letterSpacing="-0.015em"
			>
				<tspan x="7" y="17.065">
					Heading
				</tspan>
			</text>
			<path
				d="M20.6946 53.7687L30.3689 38.1651C31.0044 37.1401 32.4956 37.1401 33.1311 38.1651L42.8054 53.7687C43.4765 54.8512 42.698 56.25 41.4243 56.25H22.0757C20.802 56.25 20.0235 54.8512 20.6946 53.7687Z"
				fill="var(--icon-fill)"
			/>
			<path
				d="M70.2384 47.2071C70.6289 46.8166 70.6289 46.1834 70.2384 45.7929L63.8744 39.4289C63.4839 39.0384 62.8507 39.0384 62.4602 39.4289C62.0697 39.8195 62.0697 40.4526 62.4602 40.8431L68.117 46.5L62.4602 52.1569C62.0697 52.5474 62.0697 53.1805 62.4602 53.5711C62.8507 53.9616 63.4839 53.9616 63.8744 53.5711L70.2384 47.2071ZM52.4688 45.5C51.9165 45.5 51.4688 45.9477 51.4688 46.5C51.4687 47.0523 51.9165 47.5 52.4687 47.5L52.4688 45.5ZM69.5313 45.5L52.4688 45.5L52.4687 47.5L69.5312 47.5L69.5313 45.5Z"
				fill="var(--icon-fill)"
			/>
			<circle cx="90.25" cy="46.5" r="10.3594" fill="var(--icon-fill)" />
		</>
	);
}

function TextAndChart(props) {
	return (
		<>
			<rect x="1" y="1" width="120" height="68" rx="4" fill="var(--page-background-color)" />
			<rect x="0.5" y="0.5" width="121" height="69" rx="4.5" stroke="var(--page-stroke)" />
			<text
				fill="var(--heading-color)"
				style={{ whiteSpace: "pre" }}
				fontFamily="var(--heading-font)"
				fontSize="10"
				fontWeight="var(--heading-weight)"
				letterSpacing="-0.015em"
			>
				<tspan x="7" y="17.065">
					Heading
				</tspan>
			</text>
			<text
				fill="var(--body-color)"
				style={{ whiteSpace: "pre" }}
				fontFamily="var(--body-font)"
				fontWeight="var(--body-weight)"
				fontSize="9"
				letterSpacing="0em"
			>
				<tspan x="7" y="31.2585">
					Paragraph
				</tspan>
			</text>
			<rect x="62" y="3" width="57" height="64" rx="2" fill="var(--null-fill)" />
			<path
				d="M81.5 25C81.5 24.4477 81.0523 24 80.5 24C79.9477 24 79.5 24.4477 79.5 25V44C79.5 45.1046 80.3954 46 81.5 46H100.5C101.052 46 101.5 45.5523 101.5 45C101.5 44.4477 101.052 44 100.5 44H81.5V37.077L85.8225 38.806C86.3796 39.0289 87.0159 38.8983 87.4402 38.474L91.7408 34.1734L95.7519 35.7778C96.4105 36.0412 97.1636 35.8073 97.5571 35.2171L101.332 29.5547C101.638 29.0952 101.514 28.4743 101.055 28.1679C100.595 27.8616 99.9743 27.9858 99.6679 28.4453L96.118 33.7702L92.1775 32.194C91.6204 31.9711 90.9841 32.1017 90.5598 32.526L86.2592 36.8266L81.5 34.923V25Z"
				fill="var(--icon-fill)"
			/>
		</>
	);
}

function Media(props) {
	return (
		<>
			<rect x="1" y="1" width="120" height="68" rx="4" fill="var(--page-background-color)" />
			<rect x="0.5" y="0.5" width="121" height="69" rx="4.5" stroke="var(--page-stroke)" />
			<rect x="3" y="3" width="116" height="64" rx="2" fill="var(--null-fill)" />
			<path
				d="M59 32.5C59 33.8807 57.8807 35 56.5 35C55.1193 35 54 33.8807 54 32.5C54 31.1193 55.1193 30 56.5 30C57.8807 30 59 31.1193 59 32.5Z"
				fill="var(--icon-fill)"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M53 25C50.7909 25 49 26.7909 49 29V41C49 43.2091 50.7909 45 53 45H69C71.2091 45 73 43.2091 73 41V29C73 26.7909 71.2091 25 69 25H53ZM69 27H53C51.8954 27 51 27.8954 51 29V41C51 42.1046 51.8954 43 53 43H55.0707L63.0774 34.5719C64.1076 33.4875 65.7791 33.3276 66.9961 34.1969L71 37.0568V29C71 27.8954 70.1046 27 69 27ZM71 39.5146L65.8337 35.8244C65.428 35.5346 64.8708 35.5879 64.5274 35.9494L57.8293 43H69C70.1046 43 71 42.1046 71 41V39.5146Z"
				fill="var(--icon-fill)"
			/>
		</>
	);
}

function TwoMedia(props) {
	return (
		<>
			<rect x="1" y="1" width="120" height="68" rx="4" fill="var(--page-background-color)" />
			<rect x="0.5" y="0.5" width="121" height="69" rx="4.5" stroke="var(--page-stroke)" />
			<rect x="3" y="3" width="57" height="64" rx="2" fill="var(--null-fill)" />
			<path
				d="M29.5 32.5C29.5 33.8807 28.3807 35 27 35C25.6193 35 24.5 33.8807 24.5 32.5C24.5 31.1193 25.6193 30 27 30C28.3807 30 29.5 31.1193 29.5 32.5Z"
				fill="var(--icon-fill)"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M23.5 25C21.2909 25 19.5 26.7909 19.5 29V41C19.5 43.2091 21.2909 45 23.5 45H39.5C41.7091 45 43.5 43.2091 43.5 41V29C43.5 26.7909 41.7091 25 39.5 25H23.5ZM39.5 27H23.5C22.3954 27 21.5 27.8954 21.5 29V41C21.5 42.1046 22.3954 43 23.5 43H25.5707L33.5774 34.5719C34.6076 33.4875 36.2791 33.3276 37.4961 34.1969L41.5 37.0568V29C41.5 27.8954 40.6046 27 39.5 27ZM41.5 39.5146L36.3337 35.8244C35.928 35.5346 35.3708 35.5879 35.0274 35.9494L28.3293 43H39.5C40.6046 43 41.5 42.1046 41.5 41V39.5146Z"
				fill="var(--icon-fill)"
			/>
			<rect x="62" y="3" width="57" height="64" rx="2" fill="var(--null-fill)" />
			<path
				d="M88.5 32.5C88.5 33.8807 87.3807 35 86 35C84.6193 35 83.5 33.8807 83.5 32.5C83.5 31.1193 84.6193 30 86 30C87.3807 30 88.5 31.1193 88.5 32.5Z"
				fill="var(--icon-fill)"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M82.5 25C80.2909 25 78.5 26.7909 78.5 29V41C78.5 43.2091 80.2909 45 82.5 45H98.5C100.709 45 102.5 43.2091 102.5 41V29C102.5 26.7909 100.709 25 98.5 25H82.5ZM98.5 27H82.5C81.3954 27 80.5 27.8954 80.5 29V41C80.5 42.1046 81.3954 43 82.5 43H84.5707L92.5774 34.5719C93.6076 33.4875 95.2791 33.3276 96.4961 34.1969L100.5 37.0568V29C100.5 27.8954 99.6046 27 98.5 27ZM100.5 39.5146L95.3337 35.8244C94.928 35.5346 94.3708 35.5879 94.0274 35.9494L87.3293 43H98.5C99.6046 43 100.5 42.1046 100.5 41V39.5146Z"
				fill="var(--icon-fill)"
			/>
		</>
	);
}
