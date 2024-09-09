export const transitions = {
	layoutTransition: {
		default: {
			type: "spring",
			stiffness: 650,
			damping: 60,
			mass: 1,
		},
		opacity: {
			type: "tween",
			ease: "easeOut",
			duration: 0.35,
		},
		color: {
			type: "tween",
			ease: "easeOut",
			duration: 0.2,
		},
		backgrounColor: {
			type: "tween",
			ease: "easeOut",
			duration: 0.2,
		},
		fill: {
			type: "tween",
			ease: "easeOut",
			duration: 0.2,
		},
	},
	buttonTransition: {
		default: {
			type: "spring",
			stiffness: 650,
			damping: 60,
			mass: 1,
		},
	},
};
