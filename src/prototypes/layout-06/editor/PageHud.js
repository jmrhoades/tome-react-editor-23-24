import React from "react";
import styled from "styled-components";
import { motion, useMotionValueEvent, useMotionValue, animate, AnimatePresence } from "framer-motion";

import { EditorContext, getBoundingBox } from "./EditorContext";
import { Events } from "./EditorContext";
import { transitions } from "../ds/Transitions";
import { Hud } from "../ds/hud/Hud";
import { TomeContext } from "../tome/TomeContext";

export const PageHud = props => {
	const { selectedTiles, event, tomeData } = props;

	const { tileRefs } = React.useContext(EditorContext);
	const { getCurrentPage } = React.useContext(TomeContext);

	const currentPage = getCurrentPage();
    const [pageRect, setPageRect] = React.useState(null);

    React.useEffect(()=>{
        const ref = tileRefs.current[currentPage.id].current;
        if (ref) {
            const rect = ref.getBoundingClientRect();
            console.log(rect)
            setPageRect(rect);
        }
    }, [tomeData, currentPage])

    console.log(currentPage)

	return (
		<AnimatePresence>
			{selectedTiles.length === 0 && pageRect && (
				<Hud
					tile={currentPage}
					anchorRect={pageRect}
					x={0}
					y={0}
					event={event}
				/>
			)}
		</AnimatePresence>
	);
};
