import { uniqueId } from "lodash";
import { TILES, textStyles, alignmentX, alignmentY, lineLength } from "../tiles/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../tome/TomeContext";
import { artStyles } from "./PromptConstants";


export const makeOutlinePrompt = (user_input, page_count) => {
	const p = [`You are a world-famous public speaker crafting a compelling presentation. `];
	p.push(`It has ${page_count} slides. `);
	p.push(`You are given a brief that says "${user_input}". `);
	p.push(`First write a punchy, creative title for the presentation. `);
	p.push(`Then write a brief heading for each slide. `);
	p.push(`Try to make the headings unique and follow a narrative structure. `);
	p.push(`Do not repeat the presentation topic in the headings. `);
	p.push(`Do not include page numbers in the headings. `);
	p.push(`Output in JSON like this:`);
	p.push(`\n`);
	p.push(`{"title":"","headings": []}`);
	return p.join(" ");
};


export const makeTitlePrompt = (user_input, artifact_type, autoArtStyle = false) => {
	//console.log("makeTitlePrompt", artifact_type);
	let p = [];
	if (artifact_type.id === "PRESENTATION") {
		p.push("You are a world-famous public speaker. Write a compelling, punchy title for a presentation.");
	} else if (artifact_type.id === "PRESENTATION_OUTLINE") {
		p.push("You are writing a presentation outline. Write a compelling, punchy title for this presentation.");
	} else if (artifact_type.id === "STORY") {
		p.push(`You are a bestselling author writing a clever, entertaining story.`);
		//p.push(`about "${user_input}".`);
		p.push(`Write a title for this story. `);
	}
	if (autoArtStyle) {
		// Art styles list
		p.push(
			`Also choose the most relevant art style for this ${artifact_type.placeholder} from the following art styles:`
		);
		let styles = " [";
		for (let i = 0; i < artStyles.length; i++) {
			if (artStyles[i].id !== "AUTO" && artStyles[i].id !== "NONE") {
				styles += artStyles[i].id;
				if (i < artStyles.length - 1) styles += ", ";
			}
		}
		styles += "]";
		p.push(styles);
	}
	p.push(`\nFormat should be in valid JSON: `);
	p.push(autoArtStyle ? `{"title":"", "artStyle":""}` : `{"title":""}`);
	p.push(`\nThis is the topic:`);
	p.push(`\n"""\n`);
	p.push(`${user_input}`);
	p.push(`\n"""`);
	//p.push(isStory ?` \nThe story is about this topic: "${user_input}".` : `\nThis is the topic: "${user_input}".`);
	return p.join(" ");
};

export const makePagesPrompt = (user_input, artifact_type, page_count, images, artStyle, subject) => {
	console.log("makeTitlePrompt", artifact_type, page_count, images, artStyle);
	let p = [];
	if (artifact_type === "PRESENTATION") {
		//p.push(`Write an engaging, compelling ${page_count} page presentation. `);
		p.push(`Write an engaging and informative 1 to 8 page presentation. `);
		//p.push(`Write an engaging and informative presentation. `);
		//p.push(`about "${user_input}".`);
		p.push(`Each page contains a title and 2 punchy paragraphs. `);
		p.push(`Each paragraph should be less than 20 words. `);
		p.push(`Skip the title page and outline page. Do not include a references page.`);
		//p.push(`The presentation should be written in the same language that the topic is written in. `);
	} else if (artifact_type === "PRESENTATION_OUTLINE") {
		//p.push(`Write a logical ${page_count} page presentation outline. `);
		//p.push(`Write a logical and informative presentation outline.`);
		p.push(`Write a logical and informative 1 to 8 page presentation outline. `);
		//p.push(`Write a logical and informative presentation outline that's 3 to 8 pages in length. `);
		//p.push(`Write a logical and informative presentation that's at least 4 pages in length. `);
		p.push(`Each page contains a title and 3 section titles for the content.`);
		//p.push(`Each page contains a title and up to 3 prescriptive sentences for the content.`);
		//p.push(`Each page contains a title and an instructive sentence for the content.`);
		//p.push(`Each page contains a title and three instructive bullet points that serve as placeholders for the content.`);
		//p.push(`Each page should contain a title and three instructive bullet points.`);
		p.push(`Skip the title and outline page. Do not include a references page.`);
	} else if (artifact_type === "STORY") {
		//p.push(`You are a bestselling author writing an entertaining ${page_count} page story. `);
		p.push(`You are a bestselling author writing an entertaining 1 to 8 page story. `);
		//p.push(`You are a bestselling author writing an entertaining page story. `);
		//p.push(`about "${user_input}".`);
		p.push(`Each page contains a chapter title and 3 narrative, colorful paragraphs. `);
		p.push(`Each paragraphs should be less than 20 words. `);
		//p.push(`The story should be written in the language that the topic is written in.`);
	}
	if (images.id === "GENERATED") addDalleImageDescription(p, artStyle);
	//if (images.id === "UNSPLASH") addUnsplashImageDescription(p, artStyle);

	p.push(`Format should be in valid JSON like this: `);
	p.push(makeJSONTemplate(images.id === "GENERATED" || images.id === "UNSPLASH"));
	//p.push(makeJSONTemplate(images.id === "GENERATED"));
	p.push(`\nThis is the topic: "${user_input}".`);
	return p.join(" ");
};

export const addDalleImageDescription = (p, art_style) => {
	p.push(`Each page should also have a 15 word description of an image that describes the page's content. `);
	if (art_style.id !== "NONE") {
		p.push(`The image description should have a ${art_style.name} aesthetic.`);
	}
	// `and a richly detailed image description, describing each page's content very specifically,`,
	// `as if written by the world's greatest artist in 300-400 characters,`,
	// `with no proper nouns using the content`
};

export const addUnsplashImageDescription = p => {
	//p.push(`Each page should also have a one word description of the subject that describes the page's content. `);
	//p.push(`Each page should also have an image description that's a one-word noun of the presentation's topic. `);
	//`Each page should also have a one-word image description that represents the topic of the presentation.`
	p.push(
		`Each page should also have a one to two keyword image description.`
	);
};

export const makeJSONTemplate = images => {
	let j = `{"pages":[{"title":"","content":[]}]}`;
	if (images) j = `{"pages":[{"title":"","content":[],"image_description":""}]}`;

	//let j = `"page": {"order":"", "title":"","content":[]}`;
	//if (images) j = `"page": {"order":"", "title":"","content":[],"image_description":""}`;

	return j;
};

export const makeRewriteBlocksPrompt = (blocks, artifact_type) => {
	let p = [];
	let title = blocks[0].content;
	let content = "";
	if (blocks[1] && blocks[1].content) content += blocks[1].content;
	if (blocks[2] && blocks[2].content) content += ", " + blocks[2].content;
	if (blocks[3] && blocks[3].content) content += ", " + blocks[3].content;
	if (blocks[4] && blocks[4].content) content += ", " + blocks[4].content;
	p.push(`You are a freelance editor helping a client rewrite a page of their ${artifact_type.placeholder}. `);
	p.push(`You will rewrite the title and the content of the page.`);
	p.push(`You will try to trim the number of words used.`);
	p.push(`Output in valid JSON like this: {"title":"","content":["", ""]}`);
	p.push(`\nRewrite this page: {"title":"${title}","content":[${content}]}.`);
	return p.join(" ");
};

/*
export const makeJSONTemplate = (page_count, content_count) => {
	let j = `{"pages":[`;
	for (let i = 0; i < page_count; i++) {
		j += `{ `;
        j += `"title": "",`;
		j += `"content": [`;
		for (let k = 0; k < content_count; k++) {
			j += `""`;
			if (k !== content_count - 1) j += `,`;
		}
		j += `],`;
		j += `"image_description":""`;
		j += `}`;
	}
	j += `]}`; // pages
	return j;
};
*/

export const initializeOutline = (tome, theme, saveState) => {
	// Page
	const page = appendPageToTome(tome, theme);
	// Row
	const row = appendRowToPageInTome(page, tome);
	const textTile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				textLoaded: true,
				blocks: [],
			},
		},
		row,
		tome
	);
	tome.outlineTextTile = textTile;
	saveState();
	return textTile;
};

export const buildPageFromJSON = (
	artifact_id,
	images,
	pageData,
	tome,
	saveState,
	showPage,
	theme,
	autoPaging,
	outlineTextTile,
	requestUnsplashImageForTile,
	requestDalleImageForTile,
	artStyle
) => {
	console.log(pageData);

	const hasImages = images.id !== "NONE";
	const hasPlaceholderImages = images.id === "PLACEHOLDERS";
	const hasUnsplashImages = images.id === "UNSPLASH";

	const art_style = artStyle.prompt;
	if (artStyle.ID === "AUTO") {
		// use auto
	}
	//console.log(artStyle, art_style);

	// Update outline
	outlineTextTile.params.blocks.push({
		id: uniqueId("block"),
		type: textStyles.H2,
		content: pageData.title,
	});

	// Page
	const page = appendPageToTome(tome, theme);
	page.isGenerated = true;
	console.log(tome.pages.length)

	// Blocks
	const blocks = [
		{
			id: uniqueId("block"),
			type: textStyles.H3,
			content: pageData.title,
		},
	];
	if (artifact_id === "PRESENTATION_OUTLINE" && hasImages) {
		const ul = {
			id: uniqueId("block_ul_"),
			type: textStyles.UL,
			blockStyle: textStyles.P,
			blocks: [],
		};
		pageData.content.map(li =>
			ul.blocks.push({
				id: uniqueId("li"),
				type: textStyles.LI,
				content: li,
			})
		);
		blocks.push(ul);
		/*
		pageData.content.map(p =>
			blocks.push({
				id: uniqueId("block"),
				type: textBlockType.H4,
				content: p,
			})
		);
		*/
	} else {
		if (Array.isArray(pageData.content)) {
			pageData.content.map(p =>
				blocks.push({
					id: uniqueId("block"),
					type: textStyles.P,
					content: p,
				})
			);
		} else {
			blocks.push({
				id: uniqueId("block"),
				type: textStyles.P,
				content: pageData.content,
			});
		}
	}

	// Row
	let row = appendRowToPageInTome(page, tome);
	let textTile = appendTileToRowInTome(
		{
			type: TILES.TEXT.name,
			params: {
				alignmentX: hasImages ? alignmentX.LEFT : alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: blocks,
				isGenerated: true,
				canRegenerate: true,
			},
		},
		row,
		tome
	);
	if (hasImages) {
		if (hasPlaceholderImages) {
			appendTileToRowInTome(
				{
					type: TILES.IMAGE.name,
					params: {},
				},
				row,
				tome
			);
		} else if (hasUnsplashImages) {
			const imageTile = appendTileToRowInTome(
				{
					type: TILES.IMAGE.name,
					params: {
						image: "",
						imageSize: "cover",
						isLoading: true,
						prompt: tome.prompt.subject,
						//prompt:pageData.image_description,
						//prompt: tome.prompt.subject + pageData.title,
						index: tome.pages.length-2,
					},
				},
				row,
				tome
			);
			requestUnsplashImageForTile(imageTile);
		} else {
			const imageTile = appendTileToRowInTome(
				{
					type: TILES.IMAGE.name,
					params: {
						image: "",
						imageSize: "cover",
						isLoading: true,
						needsGeneration: true,
						prompt: pageData.image_description,
						artStyle: artStyle.prompt,
						canRegenerate: true,
					},
				},
				row,
				tome
			);
			requestDalleImageForTile(imageTile);
		}
	}

	saveState();
	if (autoPaging.current === true) showPage(page);

	return new Promise(resolve => {
		setTimeout(() => {
			textTile.params.textLoaded = true;
			resolve(true);
		}, 1000);
	});
};


/*

	const test1 = () => {
		// FOR TESTING
		buildTimerRef.current = setTimeout(() => {
			setLoadingProgress(0.15);
			setLoadingTextUpdate(`Creating page 1…`);
			setLoadingState(LoadingStates.BUILDING);
			test2();
		}, 1000);
	};
	const test2 = () => {
		// FOR TESTING
		buildTimerRef.current = setTimeout(() => {
			setLoadingProgress(0.35);
			setLoadingTextUpdate(`Creating page 2…`);
			test3();
		}, 1000);
	};
	const test3 = () => {
		// FOR TESTING
		buildTimerRef.current = setTimeout(() => {
			setLoadingProgress(0.55);
			setLoadingTextUpdate(`Creating page 3…`);
			test4();
		}, 1000);
	};
	const test4 = () => {
		// FOR TESTING
		buildTimerRef.current = setTimeout(() => {
			setLoadingProgress(0.75);
			setLoadingTextUpdate(`Creating page 4…`);
			testFinish();
		}, 1000);
	};
	const testFinish = () => {
		// FOR TESTING
		buildTimerRef.current = setTimeout(() => {
			setLoadingProgress(1);
			setLoadingState(LoadingStates.FINISHED);
			testReview();
		}, 1000);
	};
	const testReview = () => {
		// FOR TESTING
		buildTimerRef.current = setTimeout(() => {
			setLoadingState(LoadingStates.REVIEW);
		}, 2000);
	};

	*/