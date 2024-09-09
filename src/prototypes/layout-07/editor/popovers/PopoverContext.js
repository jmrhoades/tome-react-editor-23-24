import React from "react";
import { useMotionValueEvent } from "framer-motion";
import { uniqueId } from "lodash";
import { pointInRect } from "../logic/utilities";
import { EditorContext, Events } from "../EditorContext";
import { TomeContext } from "../../tome/TomeContext";

/*

Panels
Menus
Dropdowns
Tooltips
Toasts

*/

export const PopoverContext = React.createContext();

export const PopoverProvider = ({ children }) => {
	const { tomeData, saveState } = React.useContext(TomeContext);
	const { textSelectedMotionValue } = React.useContext(EditorContext);
	const [tooltip, setTooltip] = React.useState(null);

	const [panel, setPanel] = React.useState(null);

	const [menu, setMenu] = React.useState(null);

	const [flyoutMenu, setFlyoutMenu] = React.useState(null);
	const [watchingFlyout, setWatchingFlyout] = React.useState(false);
	const flyoutOutsideTimer = React.useRef(null);

	const [colorPanel, setColorPanel] = React.useState(null);

	const showTooltip = ({ event, anchor, anchorRef, content, shortcut }) => {
		// console.log("show tooltip", anchor);

		const tooltip = {
			id: uniqueId("tooltip"),
			content: content,
			shortcut: shortcut,
			anchorRef: anchorRef,
			anchor: anchor,
		};
		setTooltip(tooltip);
	};

	const hideTooltip = () => {
		setTooltip(null);
	};

	const togglePanel = (info, e, tile, anchorRef) => {
		console.log("togglePanel");
		toggleMenu(null, e);

		if (!info || (panel && panel.type === info.type)) {
			hidePanel();
		} else {
			showPanel(info, e, tile, anchorRef);
		}
		// used to cancel parent drag in panel controls
		e.stopPropagation();
	};

	const showPanel = (info, e, tile, anchorRef) => {
		console.log("showPanel");

		if (tomeData.editor.showPropertyPanel) {
			tomeData.editor.showPropertyPanel = false;
			saveState();
		}

		const panel = {
			id: uniqueId(info.id),
			panelId: "panel",
			type: info.type,
			title: info.title,
			titleBig: info.titleBig,
			higherZ: info.higherZ,
			instruction: info.instruction,
			content: info.content,
			anchorEl: e ? e.target : null,
			anchor: info.anchor,
			offset: info.offset,
			tile: tile,
			width: info.width,
			anchorRef: anchorRef,
			draggable: info.draggable,
			closeCallback: e => hidePanel(),
		};

		setPanel(panel);
	};

	const hidePanel = () => {
		console.log("hidePanel");

		setPanel(null);
		setMenu(null);
		hideFlyoutMenu();
		setColorPanel(null);
	};

	// is there a panel open? show this tile's panel
	// const selectedTiles = findTilesByKeyValue("selected", true);
	// React.useEffect(() => {
	// 	if (panel && selectedTiles.length > 0) {
	// 		//let panel = Panels[tile.type];
	// 		//showPanel(panel, null, selectedTiles, null);
	// 	}
	// }, [selectedTiles]);

	const toggleMenu = (info, e, tile) => {
		console.log("toggleMenu", info);
		if (!info || (menu && info && menu.type === info.type)) {
			hideMenu();
		} else {
			showMenu(info, e, tile);
		}
		// used to cancel parent drag in panel controls
		hideFlyoutMenu();
		e.stopPropagation();
	};

	const showMenu = (info, e, tile) => {
		console.log("showMenu", info);
		const menu = {
			id: uniqueId(info.id),
			type: info.type,
			content: info.content,
			anchorEl: e.target,
			tile: tile,
			anchor: info.anchor,
			point: { x: e.clientX, y: e.clientY },
			width: info.width,
		};
		setMenu(menu);
	};

	const hideMenu = () => {
		setMenu(null);
		hideFlyoutMenu();
	};

	const showFlyoutMenu = (info, e) => {
		console.log("showFlyoutMenu", info);

		const flyoutMenu = {
			id: uniqueId(info.id),
			type: info.type,
			content: info.content,
			anchorEl: e.target,
			anchor: Anchor.flyout,
			point: { x: e.clientX, y: e.clientY },
			width: info.width,
			anchorRect: e.target.getBoundingClientRect(),
			flyout: true,
		};
		setFlyoutMenu(flyoutMenu);
		setWatchingFlyout(true);
	};

	const hideFlyoutMenu = () => {
		setWatchingFlyout(false);
		setFlyoutMenu(null);
		clearTimeout(flyoutOutsideTimer.current);
		flyoutOutsideTimer.current = false;
	};

	const onPointerMoveFlyoutWatch = e => {
		const slop = 6;
		if (
			(e.clientX >= flyoutMenu.anchorRect.x - slop &&
				e.clientX <= flyoutMenu.anchorRect.x + flyoutMenu.anchorRect.width + slop &&
				e.clientY >= flyoutMenu.anchorRect.y - slop &&
				e.clientY <= flyoutMenu.anchorRect.y + flyoutMenu.anchorRect.height + slop) ||
			(e.clientX >= flyoutMenu.menuRect.x &&
				e.clientX <= flyoutMenu.menuRect.x + flyoutMenu.menuRect.width &&
				e.clientY >= flyoutMenu.menuRect.y &&
				e.clientY <= flyoutMenu.menuRect.y + flyoutMenu.menuRect.height)
		) {
			clearTimeout(flyoutOutsideTimer.current);
			flyoutOutsideTimer.current = false;
		} else {
			//console.log("outside button", e.clientX, e.clientY);
			if (!flyoutOutsideTimer.current) {
				flyoutOutsideTimer.current = setTimeout(hideFlyoutMenu, 100);
			}
		}
	};

	const toggleColorPanel = (info, anchorEl, anchor, value, onChange, buttonId) => {
		console.log("toggleColorPanel");
		hideMenu();
		if (!info || (colorPanel && colorPanel.buttonId === buttonId)) {
			hideColorPanel();
		} else {
			showColorPanel(info, anchorEl, anchor, value, onChange, buttonId);
		}
		// used to cancel parent drag in panel controls
		// e.stopPropagation();
	};

	const showColorPanel = (info, anchorEl, anchor, value, onChange, buttonId) => {
		console.log("showColorPanel");

		const panel = {
			id: uniqueId(info.id),
			type: info.type,
			title: info.title,
			buttonId: buttonId,
			//title: title ? title : info.title,
			value: value,
			onChange: onChange,
			titleBig: info.titleBig,
			
			higherZ: info.higherZ,
			instruction: info.instruction,
			content: info.content,
			anchorEl: anchorEl,
			anchor: anchor,
			offset: info.offset,
			width: info.width,
			draggable: info.draggable,
			closeCallback: e => hideColorPanel(),
		};

		setColorPanel(panel);
	};

	const hideColorPanel = () => {
		console.log("hideColorPanel");

		//setPanel(null);
		//setMenu(null);
		setColorPanel(null);
		//hideFlyoutMenu();
	};

	const onViewportPointerDownPopover = e => {
		console.log("onViewportPointerDownPopover", menu, panel);

		/*
		if (menu) {
			console.log("Document pointer down");
			const el = document.getElementById(menu.id);
			console.log("Not in menu");

			if (el) {
				const rect = el.getBoundingClientRect();
				const clickIn = pointInRect(e.clientX, e.clientY, rect);
				if (!clickIn) toggleMenu(null, e);
			}
		} else if (panel) {
			if (pointInRect(e.clientX, e.clientY, panel.anchorEl.getBoundingClientRect())) return;
			const el = document.getElementById(panel.id);
			console.log("onViewportPointerDown", el);
			if (el) {
				const rect = el.getBoundingClientRect();
				const clickIn = pointInRect(e.clientX, e.clientY, rect);
				if (!clickIn) togglePanel(null, e);
			}
		}
		*/

		cancelPopovers();

		if (tomeData.editor.showPropertyPanel) {
			tomeData.editor.showPropertyPanel = false;
			saveState();
		}
	};

	const cancelPopovers = e => {
		setPanel(null);
		setMenu(null);
		setTooltip(null);
		setColorPanel(null);
		hideFlyoutMenu();
	};

	useMotionValueEvent(textSelectedMotionValue, "change", latest => {
		if (latest) {
			if (panel) {
				console.log("textSelectedMotionValue");
				hidePanel();
			}
		}
	});

	React.useEffect(() => {
		if (watchingFlyout) {
			document.addEventListener("mousemove", onPointerMoveFlyoutWatch);
		}
		return () => {
			document.removeEventListener("mousemove", onPointerMoveFlyoutWatch);
		};
	}, [watchingFlyout, flyoutMenu]);

	return (
		<PopoverContext.Provider
			value={{
				panel,
				togglePanel,
				showPanel,
				hidePanel,

				menu,
				showMenu,
				toggleMenu,

				flyoutMenu,
				showFlyoutMenu,
				hideFlyoutMenu,

				tooltip,
				showTooltip,
				hideTooltip,

				colorPanel,
				showColorPanel,
				hideColorPanel,
				toggleColorPanel,

				onViewportPointerDownPopover,
				cancelPopovers,
			}}
		>
			{children}
		</PopoverContext.Provider>
	);
};

export const Anchor = {
	top: "top",
	"top-start": "top-start",
	"top-end": "top-end",
	right: "right",
	"right-start": "right-start",
	"right-end": "right-end",
	bottom: "bottom",
	"bottom-start": "bottom-start",
	"bottom-end": "bottom-end",
	left: "left",
	"left-start": "left-start",
	"left-end": "left-end",
	toolbar: "toolbar",
	pointer: "pointer",
	flyout: "flyout",
};

export const positionMenu = (
	anchorRect,
	menuRect,
	options = {
		anchor: Anchor.bottom,
		offset: 6,
		viewportMargin: 10,
		matchWidth: true,
		relative: false,
		point: { x: 0, y: 0 },
	}
) => {
	console.log("positionMenu", options.anchor);
	const offset = options.offset ? options.offset : 6;
	const viewportMargin = options.viewportMargin ? options.viewportMargin : 10;
	const anchor = options.anchor ? options.anchor : Anchor.bottom;

	let x = 0;
	let y = 0;
	let menuWidth = menuRect.width;
	let menuHeight = menuRect.height;
	let anchorXMid = 0;
	let anchorYMid = 0;

	if (anchor === Anchor["toolbar"]) {
		x = window.innerWidth - menuRect.width - 56;
		y = window.innerHeight / 2 - menuRect.height / 2;
	} else {
		// resize menu width if anchor is wider than menu content
		//menuWidth = anchorRect.width > menuRect.width ? anchorRect.width : menuRect.width;
		//menuHeight = menuRect.height;

		anchorXMid = anchorRect.x + anchorRect.width / 2;
		anchorYMid = anchorRect.y + anchorRect.height / 2;

		// try to position middle-x
		x = anchorXMid - menuWidth / 2;

		// try to position bottom-y
		y = anchorRect.y + anchorRect.height + offset;

		if (anchor === Anchor.left) {
			x = anchorRect.x - offset - menuWidth;
			y = anchorYMid - menuHeight / 2;
		}

		if (anchor === Anchor["left-end"]) {
			x = anchorRect.x - offset - menuWidth;
			y = anchorRect.y + anchorRect.height - menuHeight;
		}

		if (anchor === Anchor.right) {
			x = anchorRect.x + anchorRect.width + offset;
			y = anchorYMid - menuHeight / 2;
		}

		if (anchor === Anchor.flyout) {
			x = anchorRect.x + anchorRect.width + 2;
			y = anchorRect.y;
		}

		if (anchor === Anchor["right-start"]) {
			x = anchorRect.x + anchorRect.width + offset;
			y = anchorRect.y;
		}

		if (anchor === Anchor.top) {
			x = anchorRect.x + anchorRect.width / 2 - menuWidth / 2;
			y = anchorRect.y - menuHeight - offset;
		}

		if (anchor === Anchor["top-start"]) {
			x = anchorRect.x;
			y = anchorRect.y - menuHeight - offset;
		}

		if (anchor === Anchor["bottom-start"]) {
			x = anchorRect.x - 4;
			y = anchorRect.y + anchorRect.height + offset;
		}

		if (anchor === Anchor["bottom-end"]) {
			x = anchorRect.x + anchorRect.width + offset;
			y = anchorRect.y + anchorRect.height;
		}
	}

	if (anchor === Anchor.pointer) {
		x = options.point.x;
		y = options.point.y;
	}

	if (options.relative) {
		if (anchor === Anchor["bottom"]) {
			x = (anchorRect.width - menuRect.width) / 2;
			y = anchorRect.height + offset;
		}
	}

	// Check if x will go off window edge
	if (x < 0) {
		x = viewportMargin;
	}
	if (x + menuWidth + viewportMargin > window.innerWidth) {
		x = window.innerWidth - viewportMargin - menuWidth;

		if (anchor === Anchor.flyout) {
			x = anchorRect.x - menuRect.width - 2;
		}
	}

	// Check if y will go off window edge
	if (y < 0) {
		y = viewportMargin;
	}
	if (y + menuHeight + viewportMargin > window.innerHeight) {
		y = window.innerHeight - viewportMargin - menuHeight;
	}

	// panels have position fixed and don't need this
	if (!options.isPanel) {
		x += window.scrollX;
		y += window.scrollY;
	} else {
		x = window.innerWidth - menuRect.width - 64;
		y = (window.innerHeight - menuRect.height) / 2;
	}

	return {
		x: x,
		y: y,
		width: menuWidth,
		height: menuHeight,
	};
};
