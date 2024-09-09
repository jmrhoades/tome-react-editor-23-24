import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY, lineLength } from "../tiles/TileConstants";

export const createTilesRecentsList = [
	{
		id: "create-tiles-recent-01",
		label: "Pitch deck for a flying bus company",
		action: "RECENT",
		list:[
			{id: "create-tiles-recent-01-a"},
			{id: "create-tiles-recent-01-b"},
			{id: "create-tiles-recent-01-c"},
			{id: "create-tiles-recent-01-d"},
		]
	},
]

export const createPageRecentsList = [
	{
		id: "create-page-recent-01",
		label: "Pitch deck for a flying bus company",
		action: "RECENT",
		list:[
			{id: "create-page-recent-01-a"},
			{id: "create-page-recent-01-b"},
			{id: "create-page-recent-01-c"},
			{id: "create-page-recent-01-d"},
		]
	},
	{
		id: "create-page-recent-02",
		label: "A group of wild dolphins playing in the surf",
		action: "RECENT",
		list:[
			{id: "create-page-recent-02-a"},
			{id: "create-page-recent-02-b"},
			{id: "create-page-recent-02-c"},
			{id: "create-page-recent-02-d"},
		]
	},
	{
		id: "create-page-recent-03",
		label: "A world map showing countries and continents",
		action: "RECENT",
		list:[
			{id: "create-page-recent-02-a"},
			{id: "create-page-recent-02-b"},
			{id: "create-page-recent-02-c"},
			{id: "create-page-recent-02-d"},
		]
	},
	{
		id: "create-page-recent-04",
		label: "A hand holding a smartphone",
		action: "RECENT",
	},
	{
		id: "create-page-recent-05",
		label: "A graph showing a financial trend",
		action: "RECENT",
	},
	{
		id: "create-page-recent-06",
		label: "A close-up of a hand pressing a button",
		action: "RECENT",
	},
	{
		id: "create-page-recent-07",
		label: "A pair of binoculars perched on a rocky mountaintop",
		action: "RECENT",
	},
	{
		id: "create-page-recent-08",
		label: "A toolbox on a workbench in a garage",
		action: "RECENT",
	},
	{
		id: "create-page-recent-09",
		label: "A  beautiful waterfall cascading down a mountainside",
		action: "RECENT",
	},
];

export const doc2TomeRecentsList = [
	{
		id: "doc2-tome-recent-01",
		label: `We seek approval for BVP to invest up to $7mm in the Series A financing of Shopify, a provider of e-commerce software to SMBs. Shopify sells a simple SaaS solution that enables a business to quickly setup and run an online retail store. A typical customer signs up using their credit card and is up and running in a few hours with no long-term contract. 
		Shopify targets SMBs and at-home capitalists (e.g., eBay and Etsy sellers) who pay an average of $45 per month, with the goal of servicing these customers as they scale to become larger customers with more sophisticated needs. 
		Shopify has also managed to sign-up a number of large businesses like Pixar, Amnesty International and Tesla Motors (selling Tesla accessories, not the cars) at higher price points.
		Round pricing
		Shopify was my first lead investment as a partner, so I was incredibly nervous. It took me three roundtrip flights to Ottawa before I finally decided to present Tobi a term sheet. Why? Very few VCs believed that software businesses targeting SMBs were good investments, let alone ones that could deliver venture returns. Shopify has grown at an impressive rate. With limited marketing, customers have increased from 5,500 a year ago to nearly 10,000 today (+81% Y/Y). Over the same period, monthly recurring revenue equalized, leaving little room on the table for additional growth.`,
		action: "RECENT",
	},
	{
		id: "doc2-tome-recent-02",
		label: "A group of wild dolphins playing in the surf",
		action: "RECENT",
	},
	{
		id: "doc2-tome-recent-03",
		label: "A world map showing countries and continents",
		action: "RECENT",
	},
	{
		id: "doc2-tome-recent-04",
		label: "A hand holding a smartphone",
		action: "RECENT",
	},
	{
		id: "doc2-tome-recent-05",
		label: "A graph showing a financial trend",
		action: "RECENT",
	},
	{
		id: "doc2-tome-recent-06",
		label: "A close-up of a hand pressing a button",
		action: "RECENT",
	},
	{
		id: "doc2-tome-recent-07",
		label: "A pair of binoculars perched on a rocky mountaintop",
		action: "RECENT",
	},
	{
		id: "doc2-tome-recent-08",
		label: "A toolbox on a workbench in a garage",
		action: "RECENT",
	},
	{
		id: "doc2-tome-recent-09",
		label: "A  beautiful waterfall cascading down a mountainside",
		action: "RECENT",
	},
	{
		id: "doc2-tome-recent-10",
		label: "A  beautiful waterfall cascading down a mountainside",
		action: "RECENT",
	},
];

export const createTomeRecentsList = [
	{
		id: "create-tome-recent-05",
		label: "The tallest buildings in the world",
		action: "RECENT",
	},
	{
		id: "create-page-recent-06",
		label: "The future of architecture",
		action: "RECENT",
	},
	{
		id: "create-tome-recent-01",
		label: "Pitch deck for a flying bus company",
		action: "RECENT",
	},
	{
		id: "create-tome-recent-02",
		label: "Launch plan for a company that designs sweatshirts",
		action: "RECENT",
	},
	{
		id: "create-tome-recent-03",
		label: "How to take design skills to the next level",
		action: "RECENT",
	},
	{
		id: "create-tome-recent-04",
		label: "10 best things about chow chows",
		action: "RECENT",
	},
];

export const createImagesRecentsList = [
	{
		id: "create-image-recent-17",
		label: "3D render of a pink balloon dog in violet room",
		action: "RECENT",
	},
	{
		id: "create-image-recent-16",
		label: "A majestic alpine moutaintop against a partly-cloudy sky",
		action: "RECENT",
	},
	{
		id: "create-image-recent-15",
		label: "A party as a clay sculpture",
		action: "RECENT",
	},
	{
		id: "create-image-recent-14",
		label: "A garden villa in the year 4000, futuristic, 8k, low-angle",
		action: "RECENT",
	},
	{
		id: "create-image-recent-13",
		label: "A living room as a still from Ex Machina, cinematic light, 8k, low-angle",
		action: "RECENT",
	},

	{
		id: "create-image-recent-12",
		label: "Monumental old ruins tower of a dark misty forest, overcast, sci-fi digital painting by Simon Stålenhag",
		action: "RECENT",
	},
	{
		id: "create-image-recent-11",
		label: "A generational spaceship flying through a nebula cluster, grays, blues, mint greens, sci-fi, digital painting by John Harris",
		action: "RECENT",
	},
	{
		id: "create-image-recent-10",
		label: "A centered explosion of colorful powder on a black background",
		action: "RECENT",
	},
	{
		id: "create-image-recent-09",
		label: "A  beautiful waterfall cascading down a mountainside",
		action: "RECENT",
	},
	{
		id: "create-image-recent-08",
		label: "A group of wild dolphins playing in the surf",
		action: "RECENT",
	},
	{
		id: "create-image-recent-07",
		label: "A world map showing countries and continents",
		action: "RECENT",
	},
	{
		id: "create-image-recent-06",
		label: "A hand holding a smartphone",
		action: "RECENT",
	},
	{
		id: "create-image-recent-05",
		label: "A graph showing a financial trend",
		action: "RECENT",
	},
	{
		id: "create-image-recent-04",
		label: "A close-up of a hand pressing a button",
		action: "RECENT",
	},
	{
		id: "create-image-recent-03",
		label: "A pair of binoculars perched on a rocky mountaintop",
		action: "RECENT",
	},
	{
		id: "create-image-recent-02",
		label: "A toolbox on a workbench in a garage",
		action: "RECENT",
	},
];

export const tonesList = [
	{
		id: "tone-01",
		label: "Neutral",
		action: "INSTANT",
	},
	{
		id: "tone-02",
		label: "Friendly",
		action: "INSTANT",
	},
	{
		id: "tone-03",
		label: "Excited",
		action: "INSTANT",
	},
	{
		id: "tone-04",
		label: "Persuasive",
		action: "INSTANT",
	},
	{
		id: "tone-05",
		label: "Intellectual",
		action: "INSTANT",
	},
];

export const recentPromptsList = [
	{
		id: "recent-01",
		label: "Pitch deck for a flying bus company",
		icon: "PagesStacked",
		commandId: "command_create_tome",
		action: "SCOPED",
	},
	{
		id: "recent-02",
		label: "Launch plan for a company that designs sweatshirts",
		icon: "PagesStacked",
		commandId: "command_create_tome",
		action: "SCOPED",
	},
	{
		id: "recent-03",
		label: "How to take design skills to the next level",
		icon: "PageLandscape",
		commandId: "command_create_page",
		action: "SCOPED",
	},
	{
		id: "recent-04",
		label: "10 best things about chow chows",
		icon: "Photo",
		commandId: "command_create_image",
		action: "SCOPED",
	},
	{
		id: "recent-05",
		label: "Introduction to project management",
		icon: "PagesStacked",
		commandId: "command_create_tome",
		action: "SCOPED",
	},
	{
		id: "recent-06",
		label: "Delivering results through teamwork",
		icon: "PagesStacked",
		commandId: "command_create_tome",
		action: "SCOPED",
	},
	{
		id: "recent-07",
		label: "Effective communication strategies for the workplace",
		icon: "PageLandscape",
		commandId: "command_create_page",
		action: "SCOPED",
	},
	{
		id: "recent-08",
		label: "The power of visual storytelling in marketing",
		icon: "Photo",
		commandId: "command_create_image",
		action: "SCOPED",
	},
	{
		id: "recent-09",
		label: "The benefits of a plant-based diet",
		icon: "PageLandscape",
		commandId: "command_create_page",
		action: "SCOPED",
	},
	{
		id: "recent-10",
		label: "The future of artificial intelligence",
		icon: "Photo",
		commandId: "command_create_image",
		action: "SCOPED",
	},
];

export const recentsFallbackList = [
	{
		id: "command_create_tome",
		commandId: "command_create_tome",
		label: "Create presentation about",
		icon: "PagesStacked",
		action: "SCOPED",
	},
	{
		id: "command_create_page",
		commandId: "command_create_page",
		label: "Create page about",
		icon: "PageLandscape",
		action: "SCOPED",
	},
	{
		id: "command_create_image",
		commandId: "command_create_image",
		label: "Generate image of",
		icon: "Photo",
		action: "SCOPED",
	},
];

export const themesFallbackList = [
	{
		id: "create-theme-fallback",
		label: "Create new theme",
		action: "INSTANT",
	},
];

export const tonesFallbackList = [
	{
		id: "change-tone-fallback",
		label: "Change tone to",
		action: "INSTANT",
	},
];

export const themesList = [
	{
		label: "Dark",
		id: "theme-dark",
		themeColors: {
			page: "#000",
			outline: "rgba(255, 255, 255, 0.24)",
			headings: "#fff",
			paragraph: "#666",
		},
		action: "INSTANT",
	},
	{
		label: "Light",
		id: "theme-light",
		themeColors: {
			page: "#FFF",
			outline: "transparent",
			headings: "#000",
			paragraph: "#666",
		},
		action: "INSTANT",
	},
	{
		label: "Moss",
		id: "theme-moss",
		themeColors: {
			page: "rgba(7, 49, 29, 1.0)",
			outline: "transparent",
			headings: "rgba(217, 233, 183, 1.0)",
			paragraph: "rgba(141, 153, 132, 1.0)",
		},
		action: "INSTANT",
	},
	{
		label: "Dune",
		id: "theme-dune",
		themeColors: {
			page: "#ab5e27",
			outline: "transparent",
			headings: "#FFDCC3",
			paragraph: "#F8C29D",
		},
		action: "INSTANT",
	},
	{
		label: "Neon",
		id: "theme-neon",
		themeColors: {
			page: "rgba(240, 242, 255, 1.0)",
			outline: "transparent",
			headings: "rgba(67, 23, 250, 1.0)",
			paragraph: "rgba(108, 130, 186, 1.0)",
		},
		action: "INSTANT",
	},
	{
		label: "Creme",
		id: "theme-creme",
		themeColors: {
			page: "rgba(239, 235, 229, 1.0)",
			outline: "transparent",
			headings: "rgba(72, 66, 64, 1.0)",
			paragraph: "rgba(119, 113, 100, 1.0)",
		},
		action: "INSTANT",
	},
	{
		label: "Night",
		id: "theme-night",
		themeColors: {
			page: "rgba(24, 24, 26, 1.0)",
			outline: "rgba(255, 255, 255, 0.08)",
			headings: "rgba(126, 89, 255, 1.0)",
			paragraph: "rgba(154, 154, 154, 1.0)",
		},
		action: "INSTANT",
	},
];

export const suggestionsList = [
	{
		id: "command_create_tome",
		type: "PRESENTATION",
		prompt:
			"Write a list of 25 presentation topics. The topics should cover a range of subjects including business, education, technology, and design.",
		suggestions: [
			"The future of artificial intelligence",
			"Creating an inclusive classroom environment",
			"The benefits of a plant-based diet",
			"Effective communication strategies for the workplace",
			"The power of visual storytelling in marketing",
			"Delivering results through teamwork",
			"Introduction to project management",
			"Teaching strategies for different learning styles",
			"The power of storytelling",
			"Exploring augmented reality",
			"The power of positive thinking",
			"Design thinking: how to solve problems creatively",
			"The basics of investing for beginners",
			"Understanding blockchain technology",
			"The science of happiness",
			"Applications of machine learning",
			"The future of robotics",
			"Understanding the basics of UX design",
			"The future of virtual reality",
			"Building a brand through storytelling",
			"The importance of work-life balance",
			"Creating engaging learning experiences",
			"The benefits of mindfulness and meditation",
			"Developing a strategic roadmap for growth",
			"The basics of time management",
			"Leveraging cloud computing for business efficiency",
			"The role of technology in education",
			"Moving beyond traditional design thinking",
			"Designing a user-friendly website",
			"A pitch deck for my yoga homestay startup",
			"Digital marketing trends and how to use them to win market-share",
			"A presentation about company culture and inclusivity",
			"Sales pitch for 3D printing services",
			"Fundraising pitch for electric bike manufacturer's series A",
			"Top places to holiday in Italy for a family of four",
			"Company all hands update",
		],
	},
	{
		id: "command_create_tome",
		type: "STORY",
		prompt:
			"You are a best-selling author writing a list of short story ideas about business, education, technology, or design. Each idea should be brief, less than 50 characters. Make 25 of them.",
		suggestions: [
			"CEO's daughter takes over the family business",
			"Student wins a scholarship against all odds",
			"AI takes over the workforce",
			"App developer discovers a revolutionary algorithm",
			"An unlikely mentor helps a struggling student",
			"High-tech security system foils a heist",
			"A bright student invents a revolutionary device",
			"A teacher inspires a student to pursue their dream",
			"Hacker infiltrates a company's network",
			"A designer creates a game-changing product",
			"A student learns a life-changing lesson",
			"A tech startup finds success against the odds",
			"A teacher uses tech to engage students",
			"A designer creates a unique logo",
			"A student earns a scholarship through hard work",
			"A tech startup revolutionizes an industry",
			"A company develops a revolutionary product",
			"A teacher uses innovative methods to teach",
			"A student invents a new kind of robot",
			"A CEO takes a risk to save the company",
			"A designer creates a new kind of interface",
			"A student creates a revolutionary app",
			"A company's success is threatened by a hacker",
			"A tech company launches a revolutionary product",
			"A student revolutionizes education with tech",
		],
	},
	{
		id: "command_create_image",
		prompt:
			"Write a list of 25 short image descriptions that would be appropriate to include in a presentation. The subject of the image should be an animal, an inanimate object or a landscape and the description should include a setting.",
		suggestions: [
			"A majestic mountain range on a clear day",
			"A serene lake reflecting the stars in the night sky",
			"A vibrant sunset over a city skyline",
			"A red sports car speeding down a winding road",
			"A sandy beach with waves crashing onto the shore",
			"An old-fashioned windmill silhouetted against a cloudy sky",
			"A hot air balloon sailing through a rainbow of colors",
			"An ancient castle rising high above the countryside",
			"A lighthouse standing tall amid a sea of fog",
			"A meandering river winding through a valley",
			"A bright rainbow arching over a cityscape",
			"A  beautiful waterfall cascading down a mountainside",
			"A group of wild dolphins playing in the surf",
			"A world map showing countries and continents",
			"A hand holding a smartphone",
			"A graph showing a financial trend",
			"A close-up of a hand pressing a button",
			"A pair of binoculars perched on a rocky mountaintop",
			"A toolbox on a workbench in a garage",
			"A computer monitor in an open plan office space",
			"Colored pencils arranged in a neat row on a desk",
			"An open laptop and a notepad in a student's dorm room",
			"A globe in a corporate boardroom",
			"A laptop with a blank screen in a lecture theatre",
			"An old-fashioned chalkboard in a traditional lecture hall",
		],
	},
	{
		id: "command_create_page",
		prompt:
			"I want you to act as a creator of thoughtful, informative documents. Write a list of 25 topics that would be appropriate for a founders, marketers and sales people.",
		suggestions: [
			"Impact of bee extinction",
			"Honey bees",
			"Bees and urban environments",
			"Benefits of bees in ecosystems",
			"Conservation efforts to protect bees",
			"Beekeeping and sustainability",
			"Bees and crop pollination",
			"Health benefits of honey and bee products",

			//"Research on saas tool trends in the past 2 years",
			//"A comparative analysis of top image provider APIs",
			//"Overview of Apple's innovation strategy and how it sets them apart",
			//"Common chair designs in the last century",
			//"Top SaaS Tools on the S&P 500",
			//"Product review structure for internal use",
			//"Mobile app usage by demographic",
			//"Significance of Star Trek",
			//"A brief biography of Taylor Swift",
			//"Top 5 e-commerce aggregator platforms",
			//"Biggest butterfly effects in history",
		],
	},
	{
		id: "command_create_tiles",
		prompt:
			"",
		suggestions: [
			"17th century floral motifs",
		],
	},
];

export const pageCountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const tomeTypes = [
	{
		name: "Presentation",
		id: "PRESENTATION",
		placeholder: "presentation",
		temperature: 0.5,
		pages: 6,
	},
	{
		name: "Outline",
		id: "PRESENTATION_OUTLINE",
		placeholder: "outline",
		temperature: 0.5,
		pages: 6,
	},
	{
		name: "Story",
		id: "STORY",
		placeholder: "story",
		temperature: 0.5,
		pages: 6,
	},
];

export const CREATE_TOME_LENGTH_OPTIONS = [
	// {
	// 	id: "1",
	// 	min: 3,
	// 	max: 5,
	// 	label: "3-5",
	// 	suffix: " pages",
	// },
	{
		id: "1",
		min: 1,
		max: 1,
		label: "1",
		promptValue: "1",
		absoluteValue: 1,
		suffix: " page",
	},
	{
		id: "2",
		min: 2,
		max: 2,
		label: "2",
		promptValue: "2",
		absoluteValue: 2,
		suffix: " pages",
	},
	{
		id: "3",
		min: 3,
		max: 3,
		label: "3",
		promptValue: "3",
		absoluteValue: 3,
		suffix: " pages",
	},
	{
		id: "4",
		min: 4,
		max: 4,
		label: "4",
		promptValue: "4",
		absoluteValue: 4,
		suffix: " pages",
	},
	{
		id: "5",
		min: 5,
		max: 5,
		label: "5",
		promptValue: "5",
		absoluteValue: 5,
		suffix: " pages",
	},
	{
		id: "6",
		min: 6,
		max: 6,
		label: "6",
		promptValue: "6",
		absoluteValue: 6,
		suffix: " pages",
	},
	{
		id: "7",
		min: 7,
		max: 7,
		label: "7",
		promptValue: "7",
		absoluteValue: 7,
		suffix: " pages",
	},
	{
		id: "8",
		min: 8,
		max: 8,
		label: "8",
		promptValue: "8",
		absoluteValue: 8,
		suffix: " pages",
	},
	{
		id: "9",
		min: 9,
		max: 9,
		label: "9",
		promptValue: "9",
		absoluteValue: 9,
		suffix: " pages",
	},
	{
		id: "10",
		min: 10,
		max: 10,
		label: "10",
		promptValue: "10",
		absoluteValue: 10,
		suffix: " pages",
	},
	{
		id: "11",
		min: 11,
		max: 11,
		label: "11",
		promptValue: "11",
		absoluteValue: 11,
		suffix: " pages",
	},
	{
		id: "12",
		min: 12,
		max: 12,
		label: "12",
		promptValue: "12",
		absoluteValue: 12,
		suffix: " pages",
	},
	{
		id: "13",
		min: 13,
		max: 13,
		label: "13",
		promptValue: "13",
		absoluteValue: 13,
		suffix: " pages",
	},
	{
		id: "14",
		min: 14,
		max: 14,
		label: "14",
		promptValue: "14",
		absoluteValue: 14,
		suffix: " pages",
	},
	{
		id: "15",
		min: 15,
		max: 15,
		label: "15",
		promptValue: "15",
		absoluteValue: 15,
		suffix: " pages",
	},
	{
		id: "16",
		min: 16,
		max: 16,
		label: "16",
		promptValue: "16",
		absoluteValue: 16,
		suffix: " pages",
	},
	{
		id: "17",
		min: 17,
		max: 17,
		label: "17",
		promptValue: "17",
		absoluteValue: 17,
		suffix: " pages",
	},
	{
		id: "18",
		min: 18,
		max: 18,
		label: "18",
		promptValue: "18",
		absoluteValue: 18,
		suffix: " pages",
	},
	{
		id: "19",
		min: 19,
		max: 19,
		label: "19",
		promptValue: "19",
		absoluteValue: 19,
		suffix: " pages",
	},
	{
		id: "20",
		min: 20,
		max: 20,
		label: "20",
		promptValue: "20",
		absoluteValue: 20,
		suffix: " pages",
	},
	{
		id: "21",
		min: 21,
		max: 21,
		label: "21",
		promptValue: "21",
		absoluteValue: 21,
		suffix: " pages",
	},
	{
		id: "22",
		min: 22,
		max: 22,
		label: "22",
		promptValue: "22",
		absoluteValue: 22,
		suffix: " pages",
	},
	{
		id: "23",
		min: 23,
		max: 23,
		label: "23",
		promptValue: "23",
		absoluteValue: 23,
		suffix: " pages",
	},
	{
		id: "24",
		min: 24,
		max: 24,
		label: "24",
		promptValue: "24",
		absoluteValue: 24,
		suffix: " pages",
	},
	{
		id: "25",
		min: 25,
		max: 25,
		label: "25",
		promptValue: "25",
		absoluteValue: 25,
		suffix: " pages",
	},
];

export const CREATE_TOME_FORMAT_OPTIONS = [
	{
		id: "CONTENT_BULLET_POINTS",
		label: "Bullets",
		menuItemLabel: "Bullets", //Bulleted lists
		icon: "ListBullet",
	},
	{
		id: "CONTENT_PARAGRAPHS",
		label: "Prose",
		menuItemLabel: "Prose",
		icon: "AlignLeft",
	},
];

export const CREATE_TOME_IMAGE_OPTIONS = [
	{
		id: "GENERATED",
		label: "AI generated",
		selectedLabel: "AI",
		icon: "Photo",
	},
	{
		id: "UNSPLASH",
		label: "Stock photos",
		selectedLabel: "Stock",
		icon: "Photo",
	},
	{
		id: "PLACEHOLDERS",
		label: "Placeholders", //Placeholder
		selectedLabel: "Blank",
		icon: "Photo",
	},
	{
		id: "NONE",
		label: "No images",
		selectedLabel: "None",
		icon: "Photo",
	},
];

export const CREATE_TILES_TYPES_OPTIONS = [
	{
		id: "TEXT",
		label: "Text",
		icon: "Text",
	},
	{
		id: "IMAGES",
		label: "Images", 
		icon: "Photo",
	},
	{
		id: "TABLES",
		label: "Tables", 
		icon: "Table",
	},
];

export const web2TomeImageOptions = [
	{ label: "Generate images", id: "GENERATE_IMAGES" },
	{ label: "Import images", id: "IMPORT_IMAGES" },
	{ label: "No images", id: "NO_IMAGES" },
];

export const imageOptions = [
	{ name: "Generated", id: "GENERATED" },
	{ name: "Placeholders", id: "PLACEHOLDERS" },
	{ name: "Unsplash", id: "UNSPLASH" },
	{ name: "No images", id: "NONE" },
];

export const artStyles = [
	{ name: "Auto", id: "AUTO" },

	{ name: "None", id: "NONE" },

	{
		name: "Storytime",
		id: "STORYTIME",
		prompt:
			"Pixar, concept art, 3d digital art, Maya 3D, ZBrush Central 3D shading, bright colored background, cinematic, Reimagined by industrial light and magic, 4k resolution post processing",
	},

	{
		name: "Pixar",
		id: "PIXAR",
		prompt:
			"Pixar, 4k, 8k, unreal engine, high definition, symmetrical face, volumetric lighting, bright background, dusty haze, photo, octane render, 24mm, 4k, 24mm, DSLR, high quality, 60 fps, ultra realistic",
	},

	{
		name: "Solar Punk",
		id: "SOLAR_PUNK",
		prompt: "Stained glass solar panels, plant life, art noveau, African and Asian patterns. Greens, yellows, blues.",
	},

	{
		name: "Anime",
		id: "ANIME",
		prompt:
			"Anime, Key Visual, by Makoto Shinkai, Deep Color, Intricate, 8k resolution concept art, Natural Lighting, Beautiful Composition",
	},

	{
		name: "Wonder",
		id: "WONDER",
		prompt:
			"detailed matte painting, deep color, fantastical, intricate detail, splash screen, complementary colors, fantasy concept art, 8k resolution trending on Artstation Unreal Engine 5",
	},

	{
		name: "Fantasy",
		id: "FANTASY",
		prompt:
			"Epic, cinematic, brilliant, stunning, intricate, meticulously detailed, dramatic, atmospheric, maximalist, digital matte, painting",
	},
	{
		name: "Sci Fi",
		id: "SCI_FI",
		prompt: "cybernetic space glows, greens, metals, chrome, John Harris, John Berkey and Vincent Di Fate",
	},
	{ name: "Cyberpunk", id: "CYBERPUNK", prompt: "cyberpunk 2099 blade runner 2049 neon" },
	{
		name: "Neon",
		id: "NEON",
		prompt:
			"neon, neon ambiance, abstract black oil, gear mecha, detailed acrylic, grunge, intricate complexity, rendered in unreal engine, photorealistic",
	},
	{
		name: "Comic",
		id: "COMIC",
		prompt: "Mark Brooks and Dan Mumford, comic book art, perfect, smooth",
	},
	{
		name: "Landscape",
		id: "LANSCAPE",
		prompt: "Professional photography, bokeh, natural lighting, canon lens, shot on dslr 64 megapixels sharp focus",
	},
	{
		name: "Watercolor",
		id: "WATERCOLOR",
		prompt: "Alan Lee, watercolor, intricate",
	},
	{
		name: "Impressionist",
		id: "IMPRESSIONIST",
		prompt: "Michael Garmash, impressionist",
	},
	{
		name: "Studio",
		id: "STUDIO",
		prompt:
			"studio photography, perfect composition, cinematic light photo studio, beige color scheme, indirect lighting, 8k, elegant and luxury style",
	},
	{
		name: "Etching",
		id: "ETCHING",
		prompt: "Wayne Barlowe, solid background, etching, highly detailed",
	},
];

/*
export const artStyles = [
	{ name: "Auto", id: "AUTO" },
	{ name: "None", id: "NONE" },
	{ name: "Color pop", id: "COLOR_POP", prompt: "Colorpop style" },
	{ name: "Surrealism", id: "SURREALISM", prompt: "surrealism Salvador Dali matte background melting oil on canvas" },
	{
		name: "Epic",
		id: "EPIC",
		prompt:
			"Epic cinematic brilliant stunning intricate meticulously detailed dramatic atmospheric maximalist digital matte painting",
	},

	{ name: "Modern Comic", id: "MODERN_COMIC", prompt: "Mark Brooks and Dan Mumford, comic book art, perfect, smooth" },

	{
		name: "CGI Character",
		id: "CGI CHARACTER",
		prompt:
			"Pixar, Disney, concept art, 3d digital art, Maya 3D, ZBrush Central 3D shading, bright colored background, radial gradient background, cinematic, Reimagined by industrial light and magic, 4k resolution post processing",
	},

	{ name: "Candy", id: "CANDY", prompt: "vibrant colors Candyland wonderland gouache swirls detailed" },

	{ name: "Synthwave", id: "SYNTHWAVE", prompt: "synthwave neon retro" },

	{ name: "Cyberpunk", id: "CYBERPUNK", prompt: "cyberpunk 2099 blade runner 2049 neon" },

	{ name: "Heavenly", id: "HEAVENLY", prompt: "heavenly sunshine beams divine bright soft focus holy in the clouds" },

	{
		name: "Neo Impressionist",
		id: "NEO_IMPRESSIONIST",
		prompt:
			"neo-impressionism expressionist style oil painting, smooth post-impressionist impasto acrylic painting, thick layers of colourful textured paint",
	},

	{
		name: "Pop Art",
		id: "POP ART",
		prompt:
			"Screen print, pop art, splash screen art, triadic colors, digital art, 8k resolution trending on Artstation, golden ratio, symmetrical, rule of thirds, geometric bauhaus",
	},

	{
		name: "Photo",
		id: "PHOTO",
		prompt: "Professional photography, bokeh, natural lighting, canon lens, shot on dslr 64 megapixels sharp focus",
	},

	{
		name: "Fantasy",
		id: "FANTASY",
		prompt:
			"detailed matte painting, deep color, fantastical, intricate detail, splash screen, complementary colors, fantasy concept art, 8k resolution trending on Artstation Unreal Engine 5",
	},

	{
		name: "Artistic Portrait",
		id: "ARTISTIC PORTRAIT",
		prompt:
			"head and shoulders portrait, 8k resolution concept art portrait by Greg Rutkowski, Artgerm, WLOP, Alphonse Mucha dynamic lighting hyperdetailed intricately detailed Splash art trending on Artstation triadic colors Unreal Engine 5 volumetric lighting",
	},

	{
		name: "Bon Voyage",
		id: "BON VOYAGE",
		prompt:
			"8k resolution concept art by Greg Rutkowski dynamic lighting hyperdetailed intricately detailed Splash art trending on Artstation triadic colors Unreal Engine 5 volumetric lighting Alphonse Mucha WLOP Jordan Grimmer orange and teal",
	},

	{
		name: "Anime",
		id: "ANIME",
		prompt:
			"Studio Ghibli, Anime Key Visual, by Makoto Shinkai, Deep Color, Intricate, 8k resolution concept art, Natural Lighting, Beautiful Composition",
	},
];
*/

export const web2TomeTextTileParams = [
	{
		alignmentX: alignmentX.CENTER,
		alignmentY: alignmentY.MIDDLE,
		blocks: [
			{
				id: uniqueId("block_h0_"),
				type: textBlockType.H2,
				content: "Ludwig Godefroy’s Brutalist Cube-Shaped Home in Mexico",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"Mexico City-based architect Ludwig Godefroy designed Casa Alférez, a brutalist concrete holiday home in a Mexican pine forest. With its stark, cube-shaped exterior and whimsical details, the house makes a striking impression from the outside.",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"The house is designed like a vault, meant to create a sense of security and protection for its inhabitants. The interior is oriented upwards, with high windows and skylights that allow natural light to flood in. With five half-levels, the structure maximizes space on a compact footprint.",
			},
		],
	},

	{
		alignmentX: alignmentX.LEFT,
		alignmentY: alignmentY.MIDDLE,
		blocks: [
			{
				id: uniqueId("block_h0_"),
				type: textBlockType.H1,
				content: "“",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.H2,
				content:
					"The origin of the concept of Alferez house comes from the idea of a cabin in the woods and its romantic feeling of ​​a protective shelter in the middle of the forest",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.CAPTION,
				content: "— Ludwig Godefroy",
			},
		],
	},

	{
		alignmentX: alignmentX.LEFT,
		alignmentY: alignmentY.TOP,
		blocks: [
			{
				id: uniqueId("block_"),
				type: textBlockType.H4,
				content: "Ludwig Godefroy's Brutalist Cube Home in Mexico",
			},
			{
				id: uniqueId("block_ul_"),
				type: textBlockType.UL,
				blockStyle: textBlockType.P,
				blocks: [
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content: "Godefroy designed Casa Alférez as a secure, protective `cabin in the woods`",
					},
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content: "The compact, concrete structure is built on a square plant with five half-levels",
					},
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content: "Godefroy has a history of designing fortress-like homes in Mexico",
					},
				],
			},
		],
	},

	{
		alignmentX: alignmentX.LEFT,
		alignmentY: alignmentY.TOP,
		blocks: [
			{
				id: uniqueId("block_h0_"),
				type: textBlockType.H3,
				content: "A Brutalist Cube Among the Trees",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"This article describes a brutalist concrete holiday home in Mexico designed by Ludwig Godefroy. The home, called Casa Alférez, sits in a pine forest an hour outside of Mexico City. ",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"Godefroy wanted the home to feel like a protective shelter, and so he designed it as a solid cube with few windows. The exterior is marked by an angled wall, a swooping awning, and pencil-thin windows. ",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"Inside, the home is more open, with high windows that look up to the sky and surrounding treetops. The home is built on five half-levels, with built-in concrete furniture and wooden floors. The rooftop terrace is the highlight of the home, featuring a mix of geometries and a skylight.",
			},
		],
	},

	{
		alignmentX: alignmentX.LEFT,
		alignmentY: alignmentY.TOP,
		blocks: [
			{
				id: uniqueId("block_"),
				type: textBlockType.H4,
				content: "Background",
			},
			{
				id: uniqueId("block_ul_"),
				type: textBlockType.UL,
				blockStyle: textBlockType.P,
				blocks: [
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content: "Ludwig Godefroy designs cube-shaped brutalist house in Mexico",
					},
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content: "Called Casa Alfred, a two-bedroom weekend home",
					},
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content: "Features pencil-thin vertical windows and petal-shaped openings puncturing the facade",
					},
				],
			},
			{
				id: uniqueId("block_"),
				type: textBlockType.H4,
				content: "Goals",
			},
			{
				id: uniqueId("block_ul_"),
				type: textBlockType.UL,
				blockStyle: textBlockType.P,
				blocks: [
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content: "A poured-in-place concrete structure is balanced playfully on the sloping topography",
					},
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content: "The house is perceived as both solid and heavy as well as weightless",
					},
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content: "Instead of sprawling the foundation, Godefroy opted for a compact, stacked footprint",
					},
				],
			},
			{
				id: uniqueId("block_"),
				type: textBlockType.H4,
				content: "Features",
			},
			{
				id: uniqueId("block_ul_"),
				type: textBlockType.UL,
				blockStyle: textBlockType.P,
				blocks: [
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content:
							"Comes with a mix of geometries, round protruding skylight and angled ramping form at the terrace",
					},
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content:
							"Built around a double height structure, giving the house a cathedral feel and proportion on the inside",
					},
					{
						id: uniqueId("inline_li_"),
						type: textBlockType.LI,
						content:
							"The rooftop area is intended as a morning space and has the feel of a bespoke hotel rooftop",
					},
				],
			},
		],
	},
];

export const web2TomeImageChoices = [
	{
		id: "ludwig-godefroy-01",
		type: "image",
		src: "/ludwig-godefroy/ludwig-godefroy-casa-alferez-architecture_dezeen_2364_col_7-scaled.webp",
		loaded: true,
		gridWidth: 118,
		gridHeight: 156,
	},
	{
		id: "ludwig-godefroy-02",
		type: "image",
		src: "/ludwig-godefroy/ludwig-godefroy-casa-alferez-architecture_dezeen_2364_col_6.webp",
		loaded: true,
		gridWidth: 118,
		gridHeight: 156,
	},
	{
		id: "ludwig-godefroy-03",
		type: "image",
		src: "/ludwig-godefroy/ludwig-godefroy-casa-alferez-architecture_dezeen_2364_col_4-scaled.webp",
		loaded: true,
		gridWidth: 118,
		gridHeight: 156,
	},
	{
		id: "ludwig-godefroy-04",
		type: "image",
		src: "/ludwig-godefroy/ludwig-godefroy-casa-alferez-architecture_dezeen_2364_col_0-scaled.webp",
		loaded: true,
		gridWidth: 118,
		gridHeight: 156,
	},
	{
		id: "ludwig-godefroy-05",
		type: "image",
		src: "/ludwig-godefroy/ludwig-godefroy-casa-alferez-architecture_dezeen_2364_col_21.jpg",
		loaded: true,
		gridWidth: 118,
		gridHeight: 156,
	},
];

export const web2TomeTextChoices = [
	{
		id: "text-choice-01",
		type: "text",
		tileParams: web2TomeTextTileParams[0],
		blocks: [
			{
				id: uniqueId("block_h0_"),
				type: textBlockType.H2,
				content: "Ludwig Godefroy’s Brutalist Cube-Shaped Home in Mexico",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"Mexico City-based architect Ludwig Godefroy designed Casa Alférez, a brutalist concrete holiday home in a Mexican pine forest. With its stark, cube-shaped exterior and whimsical details, the house makes a striking impression from the outside.",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"The house is designed like a vault, meant to create a sense of security and protection for its inhabitants. The interior is oriented upwards, with high windows and skylights that allow natural light to flood in. With five half-levels, the structure maximizes space on a compact footprint.",
			},
		],
		gridWidth: 150,
		gridHeight: 156,
	},
	{
		id: "text-choice-02",
		type: "text",
		tileParams: web2TomeTextTileParams[1],
		blocks: [
			{
				id: uniqueId("block_h0_"),
				type: textBlockType.H2,
				content: "Ludwig Godefroy’s Brutalist Cube-Shaped Home in Mexico",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"Mexico City-based architect Ludwig Godefroy designed Casa Alférez, a brutalist concrete holiday home in a Mexican pine forest. With its stark, cube-shaped exterior and whimsical details, the house makes a striking impression from the outside.",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"The house is designed like a vault, meant to create a sense of security and protection for its inhabitants. The interior is oriented upwards, with high windows and skylights that allow natural light to flood in. With five half-levels, the structure maximizes space on a compact footprint.",
			},
		],
		gridWidth: 150,
		gridHeight: 156,
	},
	{
		id: "text-choice-03",
		type: "text",
		tileParams: web2TomeTextTileParams[2],
		blocks: [
			{
				id: uniqueId("block_h0_"),
				type: textBlockType.H2,
				content: "Ludwig Godefroy’s Brutalist Cube-Shaped Home in Mexico",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"Mexico City-based architect Ludwig Godefroy designed Casa Alférez, a brutalist concrete holiday home in a Mexican pine forest. With its stark, cube-shaped exterior and whimsical details, the house makes a striking impression from the outside.",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"The house is designed like a vault, meant to create a sense of security and protection for its inhabitants. The interior is oriented upwards, with high windows and skylights that allow natural light to flood in. With five half-levels, the structure maximizes space on a compact footprint.",
			},
		],
		gridWidth: 150,
		gridHeight: 156,
	},
	{
		id: "text-choice-04",
		type: "text",
		tileParams: web2TomeTextTileParams[3],
		blocks: [
			{
				id: uniqueId("block_h0_"),
				type: textBlockType.H2,
				content: "Ludwig Godefroy’s Brutalist Cube-Shaped Home in Mexico",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"Mexico City-based architect Ludwig Godefroy designed Casa Alférez, a brutalist concrete holiday home in a Mexican pine forest. With its stark, cube-shaped exterior and whimsical details, the house makes a striking impression from the outside.",
			},
			{
				id: uniqueId("block"),
				type: textBlockType.P,
				content:
					"The house is designed like a vault, meant to create a sense of security and protection for its inhabitants. The interior is oriented upwards, with high windows and skylights that allow natural light to flood in. With five half-levels, the structure maximizes space on a compact footprint.",
			},
		],
		gridWidth: 150,
		gridHeight: 156,
	},
];

const w = 121;
const h = 120;
export const createPageContentChoices = [
	{
		id: "text-choice-01",
		type: "text",
		loading: false,
		tileParams: web2TomeTextTileParams[0],
		width: w,
		height: h,
	},
	{
		id: "text-choice-02",
		type: "text",
		loading: false,
		tileParams: web2TomeTextTileParams[1],
		width: w,
		height: h,
	},
	{
		id: "text-choice-03",
		type: "text",
		loading: false,
		tileParams: web2TomeTextTileParams[2],
		width: w,
		height: h,
	},
	{
		id: "text-choice-04",
		type: "text",
		loading: false,
		tileParams: web2TomeTextTileParams[3],
		width: w,
		height: h,
	},
	{
		id: "text-choice-05",
		type: "text",
		loading: false,
		tileParams: web2TomeTextTileParams[4],
		width: w,
		height: h,
	},
];
