import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { suggestionsList } from "../PromptConstants";
import { uniqueId } from "lodash";

const Wrap = styled(motion.div)`
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`;

const ChildLabel = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
`;

const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

export const PlaceholderScoped = React.forwardRef(function Placeholder(props, ref) {
	const [placeholders, setPlaceholders] = React.useState([" "]);
	const [placeholderIndex, setPlaceholderIndex] = React.useState(0);
	const words = placeholders[placeholderIndex].split(" ");

	// Initialize a shuffled list only on component load
	React.useEffect(() => {
		const id = props.scope.id;
		let obj = suggestionsList.find(l => l.id === id);
		const list = obj.suggestions;
		shuffleArray(list);
		setPlaceholders([...list]);
	}, []);

	// Listen for keydown events, keep updated with latest placeholder value
	React.useEffect(() => {
		//console.log("mount placeholders");
		const onKeyDown = e => {
			console.log("onKeyDown ", e.key);
			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				e.preventDefault();
				e.stopPropagation();
			}
			if (e.key === "Tab" || e.key === "ArrowRight") {
				props.setValue(placeholders[placeholderIndex]);
				e.preventDefault();
				e.stopPropagation();
			}
		};
		document.body.addEventListener("keydown", onKeyDown);
		return function cleanup() {
			//	console.log("unmount placeholders");
			document.body.removeEventListener("keydown", onKeyDown);
		};
	}, [placeholders, placeholderIndex]);

	const showNextPlaceholder = () => {
		setPlaceholderIndex(t => {
			if (t >= placeholders.length - 1) {
				return 0;
			} else {
				return t + 1;
			}
		});
	};

	return (
		<Wrap
			ref={ref}
			style={{
				...props.style,
				color: props.theme.colors.promptbar.placeholder,
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<AnimatePresence>
				<ChildLabel
					key={placeholderIndex}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{
						opacity: 0,
						transition: {
							opacity: {
								ease: "easeOut",
								duration: 0.75,
							},
						},
					}}
				>
					{words.map((w, i) => (
						<motion.span
							key={uniqueId("word")}
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							transition={{
								opacity: {
									ease: "easeOut",
									duration: 0.75,
									delay: 0.5 + i * 0.25,
								},
							}}
							onAnimationComplete={definition => {
								if (i === words.length - 1 && definition.opacity === 1) {
									//console.log("last word, full opacity");
									setTimeout(showNextPlaceholder, 2500);
								}
							}}
						>
							{w}&nbsp;
						</motion.span>
					))}
				</ChildLabel>
			</AnimatePresence>
		</Wrap>
	);
});
