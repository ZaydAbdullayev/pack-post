import item1 from '../assets/_1.png';
import item2 from '../assets/_2.png';
import item3 from '../assets/_3.png';
import item4 from '../assets/_4.png';
import item5 from '../assets/_5.png';
import item6 from '../assets/_6.png';
import item7 from '../assets/_7.png';
import item8 from '../assets/_8.png';
import item9 from '../assets/_9.png';
import item10 from '../assets/_10.png';
import item11 from '../assets/_11.png';
import item12 from '../assets/_12.png';
import item13 from '../assets/_13.png';
import item14 from '../assets/_14.png';
import item15 from '../assets/_15.png';
import item16 from '../assets/_16.png';
import item17 from '../assets/_17.png';
import item18 from '../assets/_18.png';
import item19 from '../assets/trol_face.png';
import item20 from '../assets/trol_face1.png';
import item21 from '../assets/troll_face2.png';
import item22 from '../assets/child_compressed.png';

export const items = [
    { id: 0.2, name: 'Loking analysis', image: item22 },
    { id: 1, name: 'Laptop', image: item1 },
    { id: 2, name: 'Trader accessories', image: item2 },
    { id: 3, name: 'Buy the Dip', image: item3 },
    { id: 4, name: 'Diamond hands', image: item4 },
    { id: 5, name: 'Hodl', image: item5 },
    { id: 6, name: 'Degen', image: item6 },
    { id: 7, name: 'Moon', image: item7 },
    { id: 8, name: 'To the moon!', image: item8 },
    { id: 9, name: 'Buy the dip!', image: item9 },
    { id: 10, name: 'Lambo', image: item10 },
    { id: 11, name: 'Stonks', image: item11 },
    { id: 12, name: 'Bear market', image: item12 },
    { id: 13, name: 'Bull market', image: item13 },
    { id: 14, name: 'FOMO', image: item14 },
    { id: 15, name: 'FUD', image: item15 },
    { id: 16, name: 'WAGMI', image: item16 },
    { id: 17, name: 'NGMI', image: item17 },
    { id: 18, name: 'LFG', image: item18 },
    { id: 19, name: 'Trol face', image: item19 },
    { id: 20, name: 'Trol face', image: item20 },
    { id: 21, name: 'Troll face', image: item21 },
];

export const positionPresets = [
    'center',
    'topleft',
    'topright',
    'bottomleft',
    'bottomright',
];

export const positionPoint = {
    center: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    topleft: {
        top: "10px",
        left: '10px',
    },
    topright: {
        top: "10px",
        right: '10px',
    },
    bottomleft: {
        bottom: "10px",
        left: '10px',
    },
    bottomright: {
        bottom: "10px",
        right: '10px',
    },
};