import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";


const Wrap = styled(motion.div)`
	display: flex;
	position: relative;
	/* flex-direction: row-reverse; */
`;

// const HeadsContainer = styled(motion.div)`
// 	overflow: hidden;
// 	line-height: 1;
// `;
const Head = styled(motion.div)`
	/* display: inline-block; */
	margin: 0;
	& img {
		display: block;
		width: 100%;
		height: auto;
		margin: 0;
	}
`;

const buttonVariants = {
	default: {
		opacity: 1,
	},
	hover: {
		opacity: 1,
	},
	active: {
		scale: 0.975,
	},
	disabled: {
		opacity: 0.5,
	},
};

export const TitlebarSeenHeads = props => {
	

	const size = 24;
	const marginLeft = -4;
	const info = [
		{ active: true, img: "henri_liriani.png" },
		// { active: true, img: "yuchen_liu.png" },
		// { active: true, img: "jesse_chase.png" },
		// { active: true, img: "brian_nelson.png" },
		// { active: true, img: "dave_dash.png" },
		{ active: true, img: "sahana_rajasekar.png" },
		{ active: true, img: "judy_abad.png" },
		// { active: false, img: "keith_peiris.png" },
	];
	//let headCount = 3;
	/*
	if (viewportWidth >= 928) {
		headCount = 4
	}
	if (viewportWidth >= 1056) {
		headCount = 5
	}
	if (viewportWidth >= 1184) {
		headCount = 6
	}
	if (viewportWidth >= 1312) {
		headCount = 7
	}
	if (viewportWidth >= 1440) {
		headCount = 8
	}
	*/

	return (
		<Wrap variants={props.variants}>
			


			{/* <HeadsContainer
				style={{
					width: headCount * (size + marginLeft),
					height: size,
				}}
			> */}
				{info.map((user, i) => (
					<Head
						key={user.img}
						whileTap="active"
						whileHover="hover"
						initial={"default"}
						variants={buttonVariants}
						style={{
							width: size+2,
							height: size+2,
							marginLeft: marginLeft,
							border: `2px solid ${props.theme.colors.backgrounds.canvas}`,
							borderRadius: "50%",
							zIndex: 100 - i,
						}}
					>
						<img
							src={`/images/profile-pictures/${user.img}`}
							alt={"head"}
							style={{
								opacity: user.active === true ? 1 : 0.4,
							}}
						/>
					</Head>
				))}
			{/* </HeadsContainer> */}
		</Wrap>
	);
};
