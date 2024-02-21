import facebookADS from '../../assets/logos/FACEBOOK ADS.png';
import facebook from '../../assets/logos/facebook.png';
import googleADS from '../../assets/logos/GOOGLE ADS.png';
import googleBusiness from '../../assets/logos/GOOGLE BUSINESS.png';
import linkedin from '../../assets/logos/linkedin.png';
import telegram from '../../assets/logos/telegram.png';
import paterners from '../../assets/logos/PATERNERS.png';
import pinterest from '../../assets/logos/pinterest.png';
import podcast from '../../assets/logos/podcast.png';
import tiktok from '../../assets/logos/tiktok.png';
import twitter from '../../assets/logos/twitter.png';
import webindex from '../../assets/logos/WEBINDEX.png';
import website from '../../assets/logos/WEBSITE.png';
import youtube from '../../assets/logos/yt_logo.png';

export interface CardProp {
	id: number;
	name: string;
	image: string;
	option: string;
	teamName: string;
	dueDate: string;
	attachCount: number;
	taskCount: number;
	percent: number;
}

const MarketingAssetData:CardProp[]=[
    {
        id: 1,
        name: 'Facebook ADS',
        image: facebookADS,
        option: 'yes',
        teamName: 'SoSimple Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 2,
        name: 'Facebook',
        image: facebook,
        option: 'yes',
        teamName: 'Code Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 3,
        name: 'Google ADS',
        image: googleADS,
        option: 'yes',
        teamName: 'SoSimple Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 4,
        name: 'Google Business',
        image: googleBusiness,
        option: 'yes',
        teamName: 'Omtanke Taem',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 5,
        name: 'Linkedin',
        image: linkedin,
        option: 'yes',
        teamName: 'SoSimple Theme',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 6,
        name: 'Telegram',
        image: telegram,
        option: 'yes',
        teamName: 'Omtanke Taem',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 7,
        name: 'Paterners',
        image: paterners,
        option: 'yes',
        teamName: 'Code Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 8,
        name: 'Pinterest',
        image: pinterest,
        option: 'yes',
        teamName: 'Code Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 9,
        name: 'Podcast',
        image: podcast,
        option: 'yes',
        teamName: 'Code Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 10,
        name: 'Tiktok',
        image: tiktok,
        option: 'yes',
        teamName: 'Code Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 11,
        name: 'Twitter',
        image: twitter,
        option: 'yes',
        teamName: 'Code Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 12,
        name: 'Webindex',
        image: webindex,
        option: 'yes',
        teamName: 'Code Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 13,
        name: 'Website',
        image: website,
        option: 'yes',
        teamName: 'Code Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
    {
        id: 14,
        name: 'Youtube',
        image: youtube,
        option: 'yes',
        teamName: 'Code Team',
        dueDate: '14 days left',
        attachCount: 0,
        taskCount: 0,
        percent: 0,
    },
]

export default MarketingAssetData;