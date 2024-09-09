import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Engine, Render, World, Bodies, Runner, Events, Composite } from "matter-js";

const STATIC_DENSITY = 100;

export const MatterCanvas = props => {
	const scene = React.useRef();
	const engine = React.useRef(Engine.create());
	const isPressed = React.useRef(false);
	const mouse = React.useRef({ x: 0, y: 0, startX: 0, startY: 0 });

	React.useEffect(() => {
		// mount
		const cw = window.innerWidth;
		const ch = window.innerHeight;

		const render = Render.create({
			element: scene.current,
			engine: engine.current,
			options: {
				width: cw,
				height: ch,
				wireframes: false,
				background: "transparent",
			},
		});

		// boundaries

		World.add(engine.current.world, [
			Bodies.rectangle(cw / 2, -10, cw, 20, {
				isStatic: true,
				render: {
					fillStyle: "transparent",
				},
			}),
			Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true,
				render: {
					fillStyle: "transparent",
				}, }),
			Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true,
				render: {
					fillStyle: "transparent",
				}, }),
			Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true,
				render: {
					fillStyle: "transparent",
				}, }),
		]);

		// run the engine
		Runner.run(engine.current);
		Render.run(render);

		// unmount
		return () => {
			// destroy Matter
			Render.stop(render);
			World.clear(engine.current.world);
			Engine.clear(engine.current);
			render.canvas.remove();
			render.canvas = null;
			render.context = null;
			render.textures = {};
		};
	}, []);

	const handleDown = e => {
		isPressed.current = true;

		mouse.current.startX = e.clientX;
		mouse.current.startY = e.clientY;
	};

	const handleUp = () => {
		isPressed.current = false;
	};

	const handleMove = e => {
		//if (isPressed.current === false) return;

		let dx = Math.abs(e.clientX - mouse.current.startX);
		let dy = Math.abs(e.clientY - mouse.current.startY);
		let threshold = 120;

		if (dx + dy < threshold) return;
		console.log(dx, dy, e.clientX, mouse.current.startX);

		let x = e.clientX;
		let y = e.clientY;
		let size = 10 + Math.random() * 150;
		let obj = {};
		const rand = Math.round(Math.random() * 3);
		const rand2 = Math.round(Math.random() * 1000);
		//const fill = isPressed.current ? "rgba(237, 0, 235, 1)" : "#111";
		//const fill = "#111" //"rgba(255,255,255,0.12)";
		const alt = rand2 > 920 || isPressed.current;
		const fillStyle = alt ? "transparent" : "#171717";
		//const strokeStyle = alt ? "rgba(237, 0, 235, 1)" : "transparent";
		const strokeStyle = alt ? "rgba(255, 255, 255, 1)" : "transparent";
		const lineWidth = alt ? 2 : 0;
		const randLife = 1000 + Math.round(Math.random() * 10000);
		const bodyStyle = {
			fillStyle: fillStyle,
			lineWidth: lineWidth,
			strokeStyle: strokeStyle,
		};

		if (rand === 0) {
			obj = Bodies.circle(x, y, size, {
				mass: 0.1,
				restitution: 0.9,
				friction: 0.005,
				frictionAir: 0.15,
				render: {
					...bodyStyle,
				},
			});
		}
		if (rand === 1) {
			obj = Bodies.circle(x, y, size, {
				restitution: 0.7,
				frictionAir: 0.15,
				render: {
					...bodyStyle,
				},
			});
		}
		if (rand === 2) {
			obj = Bodies.polygon(x, y, 4, size, {
				restitution: 0.8,
				frictionAir: 0.08,
				render: {
					...bodyStyle,
				},
			});
		}
		if (rand === 3) {
			obj = Bodies.polygon(x, y, 3, size, {
				restitution: 0.9,
				frictionAir: 0.15,
				render: {
					...bodyStyle,
				},
			});
		}

		obj.angle = Math.random() * 0.5;

		World.add(engine.current.world, [obj]);
		setTimeout(() => World.remove(engine.current.world, [obj]), randLife);

		mouse.current.x = e.clientX;
		mouse.current.y = e.clientY;
		mouse.current.startX = e.clientX;
		mouse.current.startY = e.clientY;
	};

	return (
		<Box
			onMouseDown={handleDown}
			onMouseUp={handleUp}
			onMouseMove={handleMove}
			ref={scene}
			className="canvasContainer"
			// style={{
			// 	top: props.top,
			// 	left: props.left,
			// 	width: props.width,
			// 	height: props.height,
			// }}
		/>
	);
};

const Box = styled(motion.div)`
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: 80vw;
	border: none;
	outline: none;
	canvas {
		border: none;
		outline: none;
	}
`;
