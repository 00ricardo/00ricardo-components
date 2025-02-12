import portofolio from '../assets/portofolio.png';
import chatlan from '../assets/chatlan.png';
import ricardoutils from '../assets/00ricardo-utils.png';
import spotify from '../assets/spotify.png';
const personal = [
  {
    alt: 'Ricardo Briceño Portofolio',
    src: portofolio,
    description:
      'Upon finishing college I felt the need to create my own portfolio and voilá! Here it is. Much better than the traditional CV :)',
    activities: [],
    role: 'Portofolio',
    period: { start: 'August 2022', end: 'Currently' },
    technologies: {
      backend: [],
      frontend: ['React', 'Material UI'],
      cicd: [],
    },
    web: 'https://ricardobriceno.netlify.app/',
    github: '',
    type: 'Personal',
  },
  {
    alt: 'Chatlan',
    src: chatlan,
    description:
      'Facebook? Instagram? Twitter? Nah... Take a look to Chatlan! Building a Social Media App was with no doubt a nice project to met new tecnologies as Socket.io and NestJS.',
    activities: [],
    role: 'Social Media Application',
    period: { start: 'July 2022', end: 'Abandoned Project' },
    technologies: {
      backend: ['NodeJS'],
      frontend: ['React', 'Material UI'],
      cicd: [],
    },
    web: 'https://chatlan.netlify.app/',
    github: '',
    type: 'Personal',
  },
  {
    alt: '00ricardo-utils',
    src: ricardoutils,
    description:
      'This is a lightweight low dependency package for personal and professional development purposes. It has several utility fuctions for: Array Management, Object Management and Variable and values validation without TypeScript and Custom Hooks.',
    activities: [
      'Array Management',
      'Object Management',
      'Variable and values validation without TypeScript',
      'Custom Hooks',
    ],
    role: 'Utility/Library',
    period: { start: 'January 2023', end: 'Currently' },
    technologies: {
      backend: [],
      frontend: ['JavaScript', 'React', 'TanStack', 'Luxon'],
      cicd: [],
    },
    web: 'https://www.npmjs.com/package/00ricardo-utils',
    github: '',
    type: 'Personal',
  },
  {
    alt: 'Spotify Clone App',
    src: spotify,
    description:
      'Spotify Clone made from scratch using React and Spotify API. 00ricardo-spotify supports a preview for some songs through Spotify API. If you are curious and want to know my music taste check visit it!',
    activities: ['Song Preview through Spotify API'],
    role: 'Music Player Application',
    period: { start: 'December 2023', end: 'Currently' },
    technologies: {
      backend: ['Spotify API'],
      frontend: ['React', 'Material UI'],
      cicd: [],
    },
    web: 'https://00ricardo-spotify.netlify.app/',
    github: '',
    type: 'Personal',
  },
];
export default personal;
