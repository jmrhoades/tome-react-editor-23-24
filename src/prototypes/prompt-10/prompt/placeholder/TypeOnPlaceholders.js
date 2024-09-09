import React from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, useIsPresent } from "framer-motion";
import styled from "styled-components";

//import { tChildPlaceholderShow, tChildPlaceholderHide } from "./Transitions";

const TYPING_SPEED_MS = 45;
const INITIAL_DELAY = 5000;
const NEXT_DELAY = 5000;
const START_DELAY = 0;

const Wrap = styled(motion.div)``;

const SuggestionItem = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`;


export const TypeOnPlaceholders = props => {
	const [count, setCount] = React.useState(0);
	const isPresent = useIsPresent();

	return (
		<Wrap>
			<AnimatePresence>
				{props.suggestions.map(
					(suggestion, i) =>
						i === count && (
							<Suggestion
								key={"suggestion" + i}
								label={suggestion}
								maxCount={props.suggestions.length}
								count={count}
								setCount={setCount}
								isPresent={isPresent}
								setValue={props.setValue}
								typeOn={false}
							/>
						)
				)}
			</AnimatePresence>
		</Wrap>
	);
};

const Suggestion = props => {
    const charCount = useMotionValue(0);
	const label = useMotionValue(props.typeOn ? "" : props.label);

	//
	// Tab key listener when in Build state
	//
	React.useEffect(() => {
		const onKeyDown = e => {
			if (e.key === "Tab") {
				//console.log("Tab", props.label);
				props.setValue(props.label);
				e.preventDefault();
				e.stopPropagation();
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, []);

	useAnimationFrame((time, delta) => {
		
			// Stop type on if exiting
			if (!props.isPresent) {
				return false;
			}
			// Hide first suggestion for 2 seconds
			if (props.count === 0) {
				if (time > INITIAL_DELAY) {
					props.setCount(1);
				}
			} else {
				if (time > START_DELAY) {
					const numChars = Math.round((time - START_DELAY) / TYPING_SPEED_MS);
					if (numChars <= props.label.length) {
                        if (props.typeOn) {
                            const s = props.label.substr(0, numChars);
                            label.set(s);
                        }
					}
					if (numChars > props.label.length + NEXT_DELAY / TYPING_SPEED_MS) {
						let c = props.count + 1;
						if (c >= props.maxCount) c = 1;
						props.setCount(c);
					}
				}
			}
		
	});

	return (
		<SuggestionItem
			initial={{ opacity: 0, y: 0 }}
			//animate={{ opacity: 1, y: 0, transition: tChildPlaceholderShow }}
			//exit={{ opacity: 0, y: 0, transition: tChildPlaceholderHide }}
		>
			{label}
		</SuggestionItem>
	);
};
