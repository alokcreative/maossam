import Img1 from '../../../../assets/toolsImg/Tool1.png';
import Img2 from '../../../../assets/toolsImg/Tool2.png';
import Img3 from '../../../../assets/toolsImg/Tool3.png';
import Img4 from '../../../../assets/toolsImg/Tool4.png';
import Img5 from '../../../../assets/toolsImg/finalcut.png';
import Img6 from '../../../../assets/toolsImg/AdobeIllustrator.png';
import Img7 from '../../../../assets/toolsImg/adobe-xd.png';
import Img8 from '../../../../assets/toolsImg/Apache Arrow.png';
import COLORS from '../../../../common/data/enumColors';
import { TColor } from '../../../../type/color-type';

export type TTags = { text: string; color: TColor };
const TAGS: { [key: string]: TTags } = {
	NPM: {
		text: 'NPM',
		color: COLORS.SUCCESS.name,
	},
	YARN: {
		text: 'Yarn',
		color: COLORS.DANGER.name,
	},
	BOOTSTRAP: {
		text: 'Bootstrap',
		color: COLORS.PRIMARY.name,
	},
	DEPENDENCIES: {
		text: 'Dependencies',
		color: COLORS.INFO.name,
	},
};

type TCategories = { value: string; text: string };
export const CATEGORIES: { [key: string]: TCategories } = {
	DOCUMENTATION: {
		value: 'documentation',
		text: 'Documentation',
	},
	SETTINGS: {
		value: 'settings',
		text: 'Settings',
	},
	COLORS: {
		value: 'colors',
		text: 'Colors',
	},
};

const data: {
	id: number;
	title: string;
	description: string;
	image: string;
	tags: TTags[];
	color: TColor;
	categories: TCategories[];
	content: string;
}[] = [
	{
		id: 1,
		title: 'Canva',
		description: 'Canva is a graphic design platform that allows users to create a variety of visual content', 
		image: Img1,
		tags: [TAGS.NPM, TAGS.YARN, TAGS.BOOTSTRAP],
		color: COLORS.WARNING.name,
		categories: [CATEGORIES.DOCUMENTATION, CATEGORIES.SETTINGS],
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis faucibus interdum. Donec dapibus fringilla elementum. Pellentesque et quam quis mauris suscipit laoreet. Integer a eleifend magna. Quisque iaculis massa sit amet molestie eleifend. Nunc id finibus massa, vel eleifend turpis. Maecenas interdum neque non neque porta venenatis. Duis nec viverra nisi. Aenean enim nulla, egestas at congue et, vehicula eget sem. Donec molestie bibendum fermentum. Sed tempor, augue sit amet scelerisque vehicula, lacus nunc eleifend tellus, at lobortis felis erat eu dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas libero mi, lacinia a purus sagittis, aliquam fringilla magna. Mauris commodo mollis iaculis. Cras metus mauris, tincidunt ac dapibus in, facilisis vel ipsum.',
	},
	{
		id: 2,
		title: 'ChatGPT',
		description: 'ChatGPT is a chatbot developed by OpenAI and launched on November 30, 2022. Based on a large language model',
		image: Img2,
		tags: [TAGS.NPM, TAGS.YARN, TAGS.DEPENDENCIES],
		color: COLORS.PRIMARY.name,
		categories: [CATEGORIES.DOCUMENTATION],
		content:
			'Aliquam sodales tempor ullamcorper. Quisque non nibh consequat, dapibus magna et, commodo erat. Proin fringilla nibh mollis, vestibulum dui a, laoreet purus. Aliquam vehicula libero est, ut ornare quam eleifend at. Cras accumsan interdum nulla ut accumsan. Duis ornare, est vel rutrum bibendum, magna odio vehicula sem, non hendrerit dui eros ac erat. Sed et justo ac elit pellentesque ornare sit amet quis magna. Curabitur sagittis, leo pulvinar imperdiet consectetur, libero nisi rhoncus magna, non facilisis tortor mi et felis. Ut aliquet diam at eros faucibus, quis gravida nisl volutpat. Quisque eu nibh orci. Praesent posuere orci ligula, a lacinia mauris venenatis non.',
	},
	{
		id: 3,
		title: 'Google Bard',
		description:
			'Bard is a conversational generative artificial intelligence chatbot developed by Google.',
		image: Img3,
		tags: [TAGS.NPM, TAGS.YARN],
		color: COLORS.DANGER.name,
		categories: [CATEGORIES.DOCUMENTATION, CATEGORIES.SETTINGS],
		content:
			'Pellentesque vehicula dolor a nisi tincidunt, vitae ornare enim tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc viverra neque vel diam hendrerit volutpat. Pellentesque placerat justo a sollicitudin molestie. Etiam bibendum lacus nec tortor viverra, a consectetur neque elementum. Donec at sodales purus. Fusce in urna ac elit pulvinar efficitur in non eros. Praesent eleifend, dolor nec sollicitudin eleifend, est massa egestas metus, vitae aliquet magna erat sed turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris rutrum a augue et suscipit. In id augue ullamcorper libero tincidunt luctus.',
	},
	{
		id: 4,
		title: 'HTML Color codes',
		description:
			'HTML color codes, also known as hexadecimal color codes or hex codes, are used to represent colors in web design and development.',
		image: Img4,
		tags: [TAGS.NPM, TAGS.YARN, TAGS.DEPENDENCIES],
		color: COLORS.SUCCESS.name,
		categories: [CATEGORIES.DOCUMENTATION, CATEGORIES.SETTINGS],
		content:
			'Nam vitae blandit elit. Pellentesque efficitur venenatis finibus. Integer at ante rutrum, bibendum ipsum id, viverra mauris. Maecenas rhoncus ligula at lectus ullamcorper, sit amet suscipit massa tristique. Ut mattis feugiat ex, at finibus est ullamcorper in. Maecenas volutpat, odio id aliquam pulvinar, lectus velit malesuada sem, quis rutrum magna lectus quis lacus. Morbi egestas mollis nisl, quis ultrices enim iaculis vitae. Sed maximus blandit mollis. Vestibulum suscipit nibh sit amet vehicula rhoncus. Etiam gravida eu leo ac placerat. Integer vitae nunc ipsum. Phasellus maximus ullamcorper eros, nec blandit ex dignissim non. Donec vulputate molestie risus, vel hendrerit est aliquam vel.',
	},
	{
		id: 5,
		title: 'PC Mag',
		description:
			'PCMag covers a wide range of topics, including reviews of laptops, desktops, smartphones, software, and other gadgets.',
		image: Img5,
		tags: [TAGS.NPM, TAGS.YARN],
		color: COLORS.INFO.name,
		categories: [CATEGORIES.SETTINGS],
		content:
			'Duis posuere risus in enim sagittis, et condimentum ligula eleifend. Phasellus elementum lectus nulla. Curabitur quis vulputate ex. Nunc quis mi nibh. Vivamus sed dictum sem. Suspendisse laoreet nisl sed diam scelerisque, at gravida dui fringilla. Maecenas vel pulvinar mi. Suspendisse suscipit rhoncus dignissim. Phasellus iaculis mattis lacus, id fermentum tortor consectetur nec. Morbi bibendum neque velit, in tincidunt magna molestie vitae. Sed ultrices orci non metus pellentesque consequat. Fusce ut eleifend neque. Nunc bibendum dapibus tortor. Mauris tincidunt auctor eros sed vehicula. Maecenas a lacinia nibh. Nulla in egestas enim.',
	},
	{
		id: 6,
		title: 'AI',
		description:
			'Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems.',
		image: Img6,
		tags: [TAGS.NPM, TAGS.YARN],
		color: COLORS.WARNING.name,
		categories: [CATEGORIES.SETTINGS],
		content:
			'Maecenas id mollis turpis, non tincidunt tellus. Maecenas facilisis leo at mi accumsan tempor. Integer auctor tellus ut mi euismod, id tempus ex tempus. Curabitur feugiat arcu sem, et ultricies ligula feugiat at. Nullam nec condimentum elit, quis varius nisl. Sed venenatis at justo quis ornare. Ut sed suscipit ipsum. Aenean tempus neque eu ligula cursus convallis. Morbi ornare justo a ipsum blandit, quis varius massa euismod. Nam in orci enim. Vestibulum facilisis egestas lacus commodo vestibulum. Maecenas laoreet tincidunt dui, vel aliquam neque vestibulum vel. Pellentesque condimentum ullamcorper eros. Pellentesque bibendum convallis sem sit amet porta.',
	},
	{
		id: 7,
		title: 'Xd',
		description:
			'XD is a design and prototyping tool used for user experience (UX) and user interface (UI) design.',
		image: Img7,
		tags: [TAGS.NPM, TAGS.YARN],
		color: COLORS.DARK.name,
		categories: [CATEGORIES.SETTINGS],
		content:
			'Donec in augue nisl. Maecenas quis lacus ut erat venenatis vehicula nec id tortor. Cras magna diam, porttitor eu tortor et, egestas consectetur elit. Donec non elementum ex, sit amet efficitur elit. Nullam dictum ante vitae ante ullamcorper, eu vehicula quam pellentesque. Suspendisse consequat lectus eget convallis ornare. Phasellus faucibus arcu libero, sed interdum metus consequat sit amet. Nam quis elementum urna, egestas malesuada dolor. Morbi suscipit nulla non ante finibus luctus. Mauris ullamcorper, sem sed faucibus dictum, nisl tortor aliquam eros, et aliquet libero libero in nulla. Aliquam feugiat nisi nisi, quis luctus mi fringilla vel. Suspendisse vitae condimentum felis. Morbi eleifend nibh sem, id rutrum tortor gravida quis.',
	},
	{
		id: 8,
		title: 'Appache Arrow',
		description: 'Apache Arrow is an open-source, cross-language development platform for in-memory data that specifies a standardized language-independent columnar memory',
		image: Img8,
		tags: [TAGS.NPM, TAGS.YARN],
		color: COLORS.INFO.name,
		categories: [CATEGORIES.COLORS],
		content:
			'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi rhoncus, turpis mollis tincidunt feugiat, augue enim dapibus ipsum, et placerat neque nibh sit amet justo. Praesent venenatis ex eu massa aliquam congue eu sed diam. Vestibulum suscipit lacus et justo ornare, at rutrum erat malesuada. Fusce ut rutrum dui. Donec posuere fringilla urna, ut efficitur mi feugiat et. In ut elit at turpis dapibus pretium quis vel turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam rhoncus vel erat a finibus. Nulla facilisi. Suspendisse ornare rhoncus sollicitudin. Curabitur mollis, erat id tincidunt efficitur, arcu sem elementum enim, ac lacinia tortor purus vel ante. Nullam non feugiat magna.',
	},
];

export default data;
