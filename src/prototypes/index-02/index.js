import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { MatterCanvas } from "./matter/MatterCanvas";
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	html, body {
		background-color: black;
	}
`;

const Wrap = styled.div`
	//display: flex;
	//justify-content: center;
	//align-items: center;

	//min-height: 100%;
	/* max-height: 100%; */
	/* overflow: hidden; */
	--bottom-padding: 80px;

	font-family: ABCDiatypeVariable;

	background-color: black;
	font-size: 16px;
	line-height: 24px;
	color: white;
`;

const IndexNavContent = styled.div`
	position: relative;
	z-index: 2;
	padding: 50px;
	pointer-events: none;

	h1 {
		line-height: 1.1;
		font-size: 400%;
		font-weight: 250;
		padding-bottom: var(--bottom-padding);
	}

	h2 {
		opacity: 1;
		font-weight: 400;
		font-size: 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		list-style-type: none;
		margin: 0;
	}

	a {
		display: inline-block;
		pointer-events: auto;
		color: inherit;
		opacity: 0.5;
		text-decoration: none;
		transition: opacity 0.2s ease;
		padding-top: 0.1em;
		padding-bottom: 0.1em;
		white-space: nowrap;
		&:hover {
			opacity: 1;
			transition: none;
			/* text-decoration: underline; */
		}
	}

	li.featured {
		margin-bottom: 1em;
	}
`;

const Current = styled.div`
	display: flex;
	/* flex-wrap: wrap; */
	gap: 20px;
	padding-bottom: var(--bottom-padding);
`;

const Archive = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	section {
		min-width: 200px;
		padding-bottom: 40px;
	}
`;

const FeaturedSection = styled.section`
	width: 100%;
`;

const FeaturedHeading = styled.span`
	display: inline-block;
	min-width: 7.5em;
`;

const FeaturedSubheading = styled.span`
	display: inline-block;
	opacity: 0.5;
	padding-left: 1em;
`;



const RecentHeading = styled.span`
	display: inline-block;
	min-width: 7.5em;
`;



export const Index02 = () => {
	return (
		<Wrap>
			<GlobalStyle />
			<MatterCanvas />
			<IndexNavContent>
				<h1>
					Tome
					<br />
					Interaction
					<br />
					Prototypes
				</h1>

				<Current>
					<FeaturedSection>
						<h2>Featured</h2>
						<ul>
							<li>
								<Link to="/layout-07/">
									<FeaturedHeading>Layout v3 - 07</FeaturedHeading>
									<FeaturedSubheading>Parent selection, properties</FeaturedSubheading>
								</Link>
							</li>
							<li>
								<Link to="/layout-06/">
									<FeaturedHeading>Layout v3 - 06</FeaturedHeading>
									<FeaturedSubheading>Linger gesture, page lock</FeaturedSubheading>
								</Link>
							</li>
							<li>
								<Link to="layout-04b/">
									<FeaturedHeading>Layout v3 - 04b</FeaturedHeading>
									<FeaturedSubheading>Fluid sibling rearrange</FeaturedSubheading>
								</Link>
							</li>

							<li>
								<Link to="/drawing-02/">
									<FeaturedHeading>Drawing - 02</FeaturedHeading>
									<FeaturedSubheading>Motion value sidecar</FeaturedSubheading>
								</Link>
							</li>
							<li>
								<Link to="/prompt-10/">
									<FeaturedHeading>Prompt - 10</FeaturedHeading>
									<FeaturedSubheading>Multimodal generation UI</FeaturedSubheading>
								</Link>
							</li>
							<li>
								<a href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-9/new">
									<FeaturedHeading>Prompt - 09</FeaturedHeading>
									<FeaturedSubheading>Command system</FeaturedSubheading>
								</a>
							</li>
							<li>
								<a href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-8/new">
									<FeaturedHeading>Prompt - 08</FeaturedHeading>
									<FeaturedSubheading>Autotome prototype</FeaturedSubheading>
								</a>
							</li>
							
							<li>
								<a href="https://tome-prototypes-archive-01.jmrhoades.com/cut-copy-paste-v1">
									<FeaturedHeading>Layout v2</FeaturedHeading>
									<FeaturedSubheading>Spatial paste, undo</FeaturedSubheading>
								</a>
							</li>
							<li>
								<a href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-08">
									<FeaturedHeading>Layout v2</FeaturedHeading>
									<FeaturedSubheading>Flexible format</FeaturedSubheading>
								</a>
							</li>
							<li>
								<a href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-3/pixy">
									<FeaturedHeading>Layout v2</FeaturedHeading>
									<FeaturedSubheading>Variable width, rearrange</FeaturedSubheading>
								</a>
							</li>
							<li>
								<a href="https://tome-prototypes-archive-01.jmrhoades.com/lightweight-04">
									<FeaturedHeading>Layout v1</FeaturedHeading>
									<FeaturedSubheading>Lightweight idea sharing</FeaturedSubheading>
								</a>
							</li>
						</ul>
					</FeaturedSection>
					
				</Current>

				<Archive>
					<section>
					<h2>Layout v3</h2>
						<ul>
							<li>
								<Link to="/layout-07/">
									<FeaturedHeading>Layout v3 - 07</FeaturedHeading>
									{/* <FeaturedSubheading>Parent selection, page background</FeaturedSubheading> */}
								</Link>
							</li>
							<li>
								<Link to="/layout-06/">
									<FeaturedHeading>Layout v3 - 06</FeaturedHeading>
									{/* <FeaturedSubheading>Linger gesture, page lock</FeaturedSubheading> */}
								</Link>
							</li>
							<li>
								<Link to="/layout-05/">
									<RecentHeading>Layout v3 - 05</RecentHeading>
									{/* <RecentSubheading>Auto scale, page HUD</RecentSubheading> */}
								</Link>
							</li>
							<li>
								<Link to="layout-04b/">
									<FeaturedHeading>Layout v3 - 04b</FeaturedHeading>
									{/* <FeaturedSubheading>Fluid sibling rearrange</FeaturedSubheading> */}
								</Link>
							</li>
							<li>
								<Link to="/layout-04a/">
									<RecentHeading>Layout v3 - 04a</RecentHeading>
									{/* <RecentSubheading>Resize, page scale</RecentSubheading> */}
								</Link>
							</li>
							<li>
								<Link to="/layout-03/">
									<RecentHeading>Layout v3 - 03</RecentHeading>
									{/* <RecentSubheading>Stych layouts, raw drop zones</RecentSubheading> */}
								</Link>
							</li>

							<li>
								<Link to="/layout-02b/">
									<RecentHeading>Layout v3 - 02b</RecentHeading>
									{/* <RecentSubheading>Parent-first selection model</RecentSubheading> */}
								</Link>
							</li>
							<li>
								<Link to="/layout-02a/">
									<RecentHeading>Layout v3 - 02a</RecentHeading>
									{/* <RecentSubheading>Child-first selection model</RecentSubheading> */}
								</Link>
							</li>
							<li>
								<Link to="/layout-02a/">
									<RecentHeading>Layout v3 - 01</RecentHeading>
									{/* <RecentSubheading>Recursive rendering</RecentSubheading> */}
								</Link>
							</li>
						</ul>
					</section>
					<section>
						<h2>Drawing tile</h2>
						<ul>
							<li>
								<Link to="/drawing-02/">Drawing 02</Link>
							</li>
							<li>
								<Link className="archive" to="/drawing-01/">
									Drawing 01
								</Link>
							</li>
						</ul>
					</section>
					<section>
						<h2>Page gen</h2>
						<ul>
							<li>
								<Link className="archive" to="/prompt-10/">
									Page gen+ UI
								</Link>
							</li>
							<li>
								<Link className="archive" to="/prompt-10/typescale">
									Typescale
								</Link>
							</li>
						</ul>
					</section>
					<section>
						<h2>Prompt</h2>

						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-9/new">
									System
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-8/new">
									Settings / Try again
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-7/new">
									Keep / Retry
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-6/new">
									States
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-5/new">
									Context
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-4/new">
									Suggest
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-3/new">
									Chip
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-2/new">
									List
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/prompt-1/new">
									Cycle
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h2>Tome XL</h2>
						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/xl-1/new">
									Background Tile
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-5/xl"
								>
									XL
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-5/new"
								>
									New
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-3/pixy"
								>
									Pixy
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Variable Width</h2>

						<ul>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-3/overline-lightcast"
								>
									03 - Lightcast
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-2/examples"
								>
									02 - Examples
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-2/pixy"
								>
									02 - Pixy
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-2/overline-lightcast"
								>
									02 - Lightcast
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-1/examples"
								>
									01 - Examples
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-1/fitwell"
								>
									01 - Fitwell
								</a>
								<Link to="/variable-width-1/fitwell"></Link>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/variable-width-1/oxide"
								>
									01 - Oxide
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Text Tile</h2>
						<ul>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/text-tile-1/fitwell"
								>
									Fitwell
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/text-tile-1/pixy-demo"
								>
									Pixy
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/text-tile-1/oxide-demo"
								>
									Oxide
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/text-tile-1/humankind-demo"
								>
									Humankind Soaps
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/text-tile-1/styles-catalog"
								>
									Style updates
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/text-tile-1/placeholder-demo"
								>
									Placeholder
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Cut, Copy, Paste</h2>

						<ul>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/cut-copy-paste-v1"
								>
									CCP v1
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/cut-copy-paste-03"
								>
									CCP 3
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/cut-copy-paste-02"
								>
									CCP 2
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/cut-copy-paste-01"
								>
									CCP 1
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Scrollbars</h2>
						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/scrollbars-01">
									Scrollbars 01
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Flexi Tome</h2>

						<ul>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-08"
								>
									FTB 08
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-07"
								>
									FTB 07
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-06"
								>
									FTB 06
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-05"
								>
									FTB 05
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-05-gapless"
								>
									FTB 05 — Gapless
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-04/tile-radius-8"
								>
									FTB 04 — 8pt gaps, no page bg
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-04/tile-bg-page-bg"
								>
									FTB 04 — tile bg, page bg
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-04/tile-bg-no-page-bg"
								>
									FTB 04 — tile bg, no page bg
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-04"
								>
									Flex Tome Builder 04
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-03"
								>
									Flex Tome Builder 03
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-02"
								>
									Flex Tome Builder 02
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-builder-01"
								>
									Flex Tome Builder 01
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/flexi-tome-01">
									Flex Tome 01
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Add Tile</h2>
						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/add-tile-02">
									Add Tile 02
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/add-tile-01">
									Add Tile 01
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Diagrams</h2>

						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/diagram-02">
									Diagram 02
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/diagram-01">
									Diagram 01
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Annotations</h2>

						<ul>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/mobile-annotations-01"
								>
									Mobile Annotations 01
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/annotation-01">
									Annotations 01
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Horizontal Outline</h2>

						<ul>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/outline-horizontal-02"
								>
									Outline 02
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/outline-horizontal-01-new-tome"
								>
									Outline 01 — New Tome
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/outline-horizontal-01"
								>
									Outline 01
								</a>
							</li>
						</ul>
					</section>
					<section>
						<h2>Lightweight Idea Sharing</h2>

						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/lightweight-06">
									Lightweight 06
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/lightweight-05">
									Lightweight 05
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/lightweight-04">
									Lightweight 04
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/lightweight-03">
									Lightweight 03
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/lightweight-02">
									Lightweight 02
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/lightweight-01">
									Lightweight 01
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h2>Narration tooltip</h2>
						<ul>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/narration-tooltip-01"
								>
									NT01
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h2>Design System</h2>
						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/ds">
									Buttons
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h2>A/V Overlay</h2>
						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/overlay-01">
									Overlay 01
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h2>Present mode</h2>

						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/present-02">
									Present 02
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/present-01">
									Present 01
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h2>Tooltips</h2>
						<ul>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/toolbar-tooltips-01"
								>
									Toolbar Tooltips 01
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h2>Page scaling</h2>

						<ul>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/page-scaling-06">
									Page Scaling 06
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/page-scaling-05">
									Page Scaling 05
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/page-scaling-04-content"
								>
									Page Scaling 04 - Content
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/page-scaling-04">
									Page Scaling 04
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/page-scaling-03">
									Page Scaling 03
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/page-scaling-02">
									Page Scaling 02
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/page-scaling-01">
									Page Scaling 01
								</a>
							</li>
						</ul>
					</section>

					<section>
						<h2>Tile Resize</h2>

						<ul>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/tile-resize-04-animations"
								>
									Tile Resize - Animations
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/tile-resize-04-content"
								>
									Tile Resize - Content
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/tile-resize-01">
									tile-resize-01
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/tile-resize-02">
									tile-resize-02
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/tile-resize-02-move"
								>
									tile-resize-02-move
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/tile-resize-02-move-layout"
								>
									tile-resize-02-move-layout
								</a>
							</li>
							<li>
								<a className="archive" href="https://tome-prototypes-archive-01.jmrhoades.com/tile-resize-03">
									tile-resize-03
								</a>
							</li>
							<li>
								<a
									className="archive"
									href="https://tome-prototypes-archive-01.jmrhoades.com/tile-resize-03-undo"
								>
									tile-resize-03-undo
								</a>
							</li>
						</ul>
					</section>
				</Archive>
			</IndexNavContent>
		</Wrap>
	);
};
