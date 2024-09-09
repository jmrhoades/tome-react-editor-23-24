export const transitions = {
	// layoutTransition: {
	// 	type: "spring",
	// 	stiffness: 130,
	// 	damping: 20,
	// 	mass: 1,
	// },

	// layoutTransition: {
	// 	type: "spring",
	// 	stiffness: 206.7,
	// 	damping: 28.2,
	// 	mass: 1,
	// 	velocity: 0,
	// },

	layoutTransition: {
		type: "spring",
		stiffness: 650,
		damping: 60,
		mass: 1,
	},

	// layoutTransition: {
	// 	type: "tween",
	// 	ease: "easeOut",
	// 	duration: 4.43,
	// },

	// layoutTransition: {
	// 	type: "tween",
	// 	ease: [0.44, 0, 0.56, 1],
	// 	duration: 0.35,
	// },

	// layoutTransition: {
	// 	ease: "anticipate",
	// 	duration: 0.5,
	// },

	panelTransition: {
		duration: 0.2,
	},

	defaultSpring: {
		type: "spring",
		stiffness: 550,
		damping: 50,
	},
	springySpring: {
		type: "spring",
		stiffness: 500,
		damping: 35,
	},
	defaultTransition: {
		duration: 1,
		ease: [0.4, 0, 0.1, 1],
	},
	quickEase: {
		duration: 0.25,
		ease: [0.4, 0, 0.1, 1],
	},
	slowEase: {
		duration: 0.5,
		type: "tween",
	},

	playModeFade: {
		type: "tween",
		ease: "easeOut",
		duration: 0.43,
		//ease: "anticipate", duration: 0.75
	},

	playModeSpring: {
		scale: {
			type: "spring",
			stiffness: 550,
			damping: 60,
		},
		opacity: {
			type: "tween",
			ease: "easeInOut",
			duration: 0.43,
		},
		boxShadow: {
			type: "tween",
			ease: "easeInOut",
			duration: 0.43,
		},
	},

	tileLayoutTransition: {
		type: "spring",
		stiffness: 220,
		damping: 35,
		mass: 2.1,
	},

	newTileTransition: {
		type: "spring",
		stiffness: 280,
		damping: 30,
		mass: 2,
	},
};
