import Asana from '../../assets/toolsImg/asana-seeklogo.com.svg'
import Canva from '../../assets/toolsImg/Canva.png'
import AdobeI from '../../assets/toolsImg/AdobeIllustrator.png'
import AdobeXD from '../../assets/toolsImg/adobe-xd.png'
import Figma from '../../assets/toolsImg/figma-1-logo-svg-vector.svg'
import AdobePremiere from '../../assets/toolsImg/adobepremiere.png'
import Final from '../../assets/toolsImg/finalcut.png'
import DaVinci from '../../assets/toolsImg/davinciresolve.png'
import Evernote from '../../assets/toolsImg/Evernote.png'
import Trello from '../../assets/toolsImg/Trello.png'
import HubSpot from '../../assets/toolsImg/Hubspot.png'
import Mailchimp from '../../assets/toolsImg/Mailchimp.png'
import Intercom from '../../assets/toolsImg/58480918cef1014c0b5e48f8.png'
import ApacheParquet from '../../assets/toolsImg/parquet-logo.png'
import ApacheArrow from '../../assets/toolsImg/Apache Arrow.png'
import ApacheHadoop from '../../assets/toolsImg/Apache Hadoop.png'
import ApacheSpark from '../../assets/toolsImg/Apache_Spark_logo.png'
import Dremio from '../../assets/toolsImg/dremio_logo_icon_168234.png'
import ApacheDrill from '../../assets/toolsImg/Apache Drill.png'


interface MarketingTool {
	id: number;
	name: string;
	description: string;
	link: string;
	logoLink: string;
}

interface ToolsData {
	[category: string]: MarketingTool[];
}

const toolsData: ToolsData = {
	'Design': [
		{
			id: 1,
			name: 'Canva',
			description:
				'Canva is a user-friendly graphic design platform that allows you to create stunning visuals for your marketing campaigns, social media posts, infographics, and more. It offers a wide range of templates and stock images to make designing easier.',
			link: 'https://www.canva.com/',
			logoLink: Canva,
		},
		{
			id: 2,
			name: 'Adobe Illustrator',
			description:
				'Adobe Illustrator is a professional vector graphics editor for creating logos, illustrations, and high-quality designs.',
			link: 'https://www.adobe.com/products/illustrator.html',
			logoLink: AdobeI,
		},
		{
			id: 3,
			name: 'Figma',
			description:
				'Figma is a collaborative design tool that allows teams to work together on UI/UX design projects in real-time.',
			link: 'https://www.figma.com/',
			logoLink: Figma,
		},
		{
			id: 4,
			name: 'Adobe XD',
			description:
				'Adobe XD is a vector design tool for web and mobile applications, developed and published by Adobe Inc. It is available for macOS and Windows, and there are versions for iOS and Android to help preview the result of work directly on mobile devices',
			link: 'https://www.adobe.com/products/xd/learn/view-all-xd-tutorials.html',
			logoLink: AdobeXD,
		},
	],
	'Video Editing': [
		{
			id: 5,
			name: 'Adobe Premiere Pro',
			description:
				'Adobe Premiere Pro is a professional video editing software that enables you to edit and produce high-quality videos for marketing purposes. You can create engaging video content, add effects, and optimize videos for various platforms.',
			link: 'https://www.adobe.com/products/premiere.html',
			logoLink: AdobePremiere,
		},
		{
			id: 6,
			name: 'Final Cut Pro',
			description:
				'Final Cut Pro is a video editing software exclusively available for macOS, known for its advanced editing capabilities.',
			link: 'https://www.apple.com/final-cut-pro/',
			logoLink: Final,
		},
		{
			id: 7,
			name: 'DaVinci Resolve',
			description:
				'DaVinci Resolve is a powerful video editing and color grading software used by professionals in the film and TV industry.',
			link: 'https://www.blackmagicdesign.com/products/davinciresolve/',
			logoLink: DaVinci,
		},
	],
	'Diary and Task Management': [
		{
			id: 8,
			name: 'Evernote',
			description:
				'Evernote is a versatile note-taking and task management tool that helps you stay organized. You can jot down ideas, plan marketing strategies, and set reminders for important tasks, ensuring you never miss a deadline.',
			link: 'https://evernote.com/',
			logoLink: Evernote,
		},
		{
			id: 9,
			name: 'Trello',
			description:
				'Trello is a popular project management tool that uses boards and cards to help you organize tasks and projects.',
			link: 'https://trello.com/',
			logoLink: Trello,
		},
		{
			id: 10,
			name: 'Asana',
			description:
				'Asana is a task management tool that streamlines project workflows and facilitates team collaboration.',
			link: 'https://asana.com/',
			logoLink: Asana,
		},
	],
	'Customer Retention and Database Building': [
		{
			id: 11,
			name: 'HubSpot CRM',
			description:
				'HubSpot CRM is a powerful customer relationship management tool that assists in building and maintaining a database of leads and customers. It helps you manage customer interactions, track sales, and implement retention strategies to improve customer satisfaction and loyalty.',
			link: 'https://www.hubspot.com/products/crm',
			logoLink: HubSpot,
		},
		{
			id: 12,
			name: 'Mailchimp',
			description:
				'Mailchimp is an email marketing platform that helps you build and manage your email list, design engaging email campaigns, and track performance.',
			link: 'https://mailchimp.com/',
			logoLink: Mailchimp,
		},
		{
			id: 13,
			name: 'Intercom',
			description:
				'Intercom is a customer communication platform that offers live chat, email marketing, and customer support solutions to retain and engage customers.',
			link: 'https://www.intercom.com/',
			logoLink: Intercom,
		},
	],
	'Parquet Tools': [
		{
			id: 14,
			name: 'Apache Parquet',
			description:
				'Apache Parquet is an open-source columnar storage file format that is optimized for big data processing. While not a marketing tool directly, using Parquet for data storage and processing can significantly improve data query performance, enabling faster and more efficient data analysis for marketing insights.',
			link: 'https://parquet.apache.org/',
			logoLink: ApacheParquet,
		},
		{
			id: 15,
			name: 'Apache Arrow',
			description:
				'Apache Arrow is a cross-language development platform designed to accelerate data processing across different systems. It complements Parquet and other data storage formats, enabling efficient data interchange between applications. Faster data access means quicker marketing data analysis and better decision-making.',
			link: 'https://arrow.apache.org/',
			logoLink: ApacheArrow,
		},
		{
			id: 16,
			name: 'Apache Hadoop',
			description:
				'Apache Hadoop is an open-source framework for distributed storage and processing of large datasets, often used in conjunction with Apache Parquet.',
			link: 'https://hadoop.apache.org/',
			logoLink: ApacheHadoop,
		},
		{
			id: 17,
			name: 'Apache Spark',
			description:
				'Apache Spark is a fast and general-purpose cluster computing system that supports Parquet for big data processing.',
			link: 'https://spark.apache.org/',
			logoLink: ApacheSpark,
		},
		{
			id: 18,
			name: 'Dremio',
			description:
				'Dremio is a data lake engine that supports Apache Parquet, allowing users to query and analyze data in real-time.',
			link: 'https://www.dremio.com/',
			logoLink: Dremio,
		},
		{
			id: 19,
			name: 'Apache Drill',
			description:
				'Apache Drill is an SQL query engine for big data exploration that can directly query Parquet files among other formats.',
			link: 'https://drill.apache.org/',
			logoLink: ApacheDrill,
		},
	],
};

export default toolsData;
