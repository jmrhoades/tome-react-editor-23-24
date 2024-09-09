import React, { useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { TomeContext } from "../tome/TomeContext";

const Wrap = styled(motion.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	pointer-events: auto;
	//overflow: hidden;
`;

const Asset = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Image = styled.img`
	display: block;
	position: absolute;
	
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	
	object-fit: cover;

	/* background-image: url("${props => props.image}");
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%; */
`;

const Video = styled(Asset)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	video {
		object-fit: cover;
	}
`;

const SelectedBorder = styled(motion.div)`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	border-style: solid;
`;

export const PageBackground = props => {
	const { backgroundSelected, toggleBackgroundSelection, isPlayMode } = useContext(TomeContext);

	let opacity = 1;
	if (props.pageTop < 1 && props.params.fadeOnScroll) {
		opacity = 1 - Math.abs(props.pageTop) / window.innerHeight;
	}

	// console.log("PageBackground", opacity);

	//if (props.params) {
		//console.log(props.params);
	//}

	//const blendMode = "overlay";
	const blendMode = "normal";

	return (
		<Wrap
			style={{
				backgroundColor: props.page.theme.colors.backgrounds.page,
				opacity: opacity,
				transition: "opacity 0.2s ease-out",
				pointerEvents: "none",
			}}

			// onTap={
			// 	isPlayMode
			// 		? undefined
			// 		: () => {
			// 				//console.log("tao");
			// 				toggleBackgroundSelection();
			// 		  }
			// }
		>
			<Asset
				initial={{
					opacity: 1,
				}}
				animate={{
					opacity: props.params.isLoading ? 0 : 1,
				}}
				transition={{
					type: "tween",
					duration: props.params.isLoading ? 0 : 1,
				}}
			>
				{props.params && props.params.image && (
					<Image
						style={{
							opacity: props.params.opacity / 100,
							mixBlendMode: blendMode,
							//backgroundSize: props.imageSize ? props.imageSize : "cover",
							//backgroundPosition: props.imagePosition ? props.imagePosition : "center",
							//backgroundImage: `url("${props.params.image})`,
							//backgroundRepeat: "no-repeat",
						}}
						src={props.params.image}
						//image={props.params.image}
					/>
				)}

				{props.params && props.params.video && (
					<Video
						style={{
							opacity: props.params.opacity / 100,
							mixBlendMode: blendMode,
						}}
					>
						<video muted height="100%" width="100%" autoPlay={props.isOutline ? undefined : true} loop>
							<source src={props.params.video} type="video/mp4" />
						</video>
					</Video>
				)}
			</Asset>


			{/* <SelectedBorder
				style={{ borderWidth: 2, borderColor: props.theme.colors.accent }}
				animate={{ opacity: backgroundSelected && !isPlayMode ? 1 : 0 }}
				initial={false}
				transition={{ duration: 0.2 }}
			/> */}

			
		</Wrap>
	);
};
