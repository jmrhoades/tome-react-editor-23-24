const debugTransition = {
	type: "linear",
	duration: 4,
};

export const getTransitions = (debug = false) => {
	let timeScale = debug ? 4 : 1;
	return {
		morph: debug
			? debugTransition
			: {
					default: {
						type: "spring",
						stiffness: 600,
						damping: 45,
					},
					opacity: {
						//type: "linear",
						ease: "easeOut",
						duration: 0.1,
					},
			  },			  
		instant: {
					type: "tween",
					duration: debug ? timeScale : 0,
			  },
		promptBgVisible: (visible) => {
			return {
				type: "tween",
				ease: "easeOut",
				duration: .2 * timeScale,
				delay: visible ? 0 : 0.1 * timeScale,
			}
		},
		miniBgVisible: (visible) => {
			return {
				type: "tween",
				ease: "easeOut",
				duration: .2 * timeScale,
				delay: visible ? 0.1 * timeScale : 0,
			}
		}
	};
};

/*
NON-OPACITY ANIMATIONS
*/

export const instantTransition = {
	type: "tween",
	duration: 0,
};

/*
OPACITY ANIMATIONS
*/

const speed = 0.3;

const showTransition = {
	type: "tween",
	ease: "easeOut",
	duration: speed,
	//duration: testDuration,
};

const hideTransition = {
	type: "tween",
	ease: "easeOut",
	duration: 0.1,
	//duration: testDuration,
};

/*
	CMD-K show/hide prompt bar
*/

export const tBarShow = {
	default: {
		type: "spring",
		stiffness: 650,
		damping: 42.5,
		mass: 1,
	},
	opacity: {
		type: "tween",
		ease: "easeOut",
		duration: 0.1,
	},
	//duration: testDuration,
};

export const tBarHide = {
	type: "tween",
	ease: "easeOut",
	duration: 0.1,
	//duration: testDuration,
};

/*
	Placeholders
*/

export const tPlaceholderParentShow = {
	type: "tween",
	ease: "easeOut",
	duration: 0.3,
};
export const tPlaceholderParentHide = {
	type: "tween",
	ease: "easeOut",
	duration: 0.3,
};

export const tPlaceholderChildShow = {
	type: "tween",
	ease: "easeOut",
	duration: 0.2,
	delay: 0,
};

export const tPlaceholderChildHide = {
	type: "tween",
	ease: "easeOut",
	duration: 0.2,
};

/*
	Moving from Root to Scoped
*/

export const tListItemFocusBgToChild = {
	type: "tween",
	ease: "easeOut",
	duration: 0,
	//duration: testDuration,
};

export const tListItemFocusBgToParent = {
	type: "tween",
	ease: "easeOut",
	duration: 0.2,
	//duration: testDuration,
};

export const tListItemScoped = {
	type: "tween",
	ease: "easeOut",
	duration: 0.3,
};

export const tListItemHide = {
	type: "tween",
	ease: "easeOut",
	duration: 0.1,
};


export const tListItemShow = {
	type: "tween",
	ease: "easeOut",
	duration: 0.1,
	/*
	...moveTransition,
	opacity: {
		duration: 0.1,
		//duration: testDuration,
	},
	*/
};


export const tListItemRootAccessoriesShow = {
	type: "tween",
	ease: "easeOut",
	duration: 0.2,
	//duration: testDuration,
};
export const tListItemRootAccessoriesHide = {
	type: "tween",
	ease: "easeOut",
	duration: 0.2,
	//duration: testDuration,
};
export const tListItemScopedAccessoriesShow = {
	type: "tween",
	ease: "easeOut",
	duration: 0.2,
	//duration: testDuration,
};
export const tListItemScopedAccessoriesHide = {
	duration: 0,
	//duration: testDuration,
};

/*
	Moving from Scoped to Loading
*/

/*
export const tParentViewShow = {
	default: {
		...showTransition,
		//delay: 0.2,
	},
	scale: {
		...moveTransition,
	},
};

export const tParentViewHide = {
	default: {
		...hideTransition,
		// duration: 0.1,
	},
	scale: {
		...moveTransition,
	},
};
*/

export const tLoadingViewShow = {
	...showTransition,
	delay: 0.15,
};

export const tLoadingViewHide = {
	...hideTransition,
	// duration: 0,
	// delay: 0.1,
};

export const tSkateboardHide = {
	//...hideTransition,
	duration: 0,
	// delay: 0.1,
};

export const tSkateboardShow = {
	duration: 0.35,
	delay: 0.3,
};

const listHeightTransition = {
	type: "tween",
	ease: "easeOut",
	duration: 0.3,
};

export const tDividerShow = {
	...listHeightTransition,
};

export const tDividerHide = {
	...listHeightTransition,
};

export const tListMoveToParent = {
	...listHeightTransition,
};

export const tListMoveToChild = {
	...listHeightTransition,
};

export const tListItemMoveToChild = {
	...listHeightTransition,
	//duration: 1,
};

export const tListItemMoveToParent = {
	...listHeightTransition,
	//duration: 1,
};

export const tListScrollHeight = {
	...listHeightTransition,
};

export const tListItemFilterShow = {
	duration: 0.1,
};

export const tListItemFilterHide = {
	duration: 0.1,
};

export const tListItemHoverStart = {
	duration: 0,
};

export const tListItemHoverEnd = {
	duration: 0,
};

export const tLoadingLabelShow = {
	type: "tween",
	ease: "easeOut",
	duration: 0.5,
	delay: 0.1,
};

export const tLoadingLabelHide = {
	...hideTransition,
};

export const tLoadingSpinnerShow = {
	...showTransition,
};

export const tLoadingSpinnerHide = {
	...hideTransition,
};

export const tLoadingButtonsShow = {
	...showTransition,
};

export const tLoadingButtonsHide = {
	...hideTransition,
};

export const tScrollItem = {
	type: "tween",
	ease: "easeOut",
	duration: 0,
};

// type: "spring",
// bounce: 0.speed,
