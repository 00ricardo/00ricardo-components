import gesfogo from '../assets/gesfogo.png';
import fireloc from '../assets/fireloc.png';
const professional = [
  {
    alt: 'GesFoGO',
    src: gesfogo,
    description:
      'ITI researcher with the role of Full Stack Developer for the development of modules and components in the frontend for the visualization of geospatial data. Also, I developed some endpoints for sending and receiving commands to the sensors that control the data collection.',
    activities: [
      'Implementation of GesFoGO GUI',
      'Implementation of Command Endpoints',
    ],
    role: 'Fire Detection and Prevention System',
    period: { start: 'February 2020', end: 'July 2020' },
    technologies: {
      backend: ['NodeJS'],
      frontend: ['HTML', 'CSS', 'JavaScript', 'Leaflet'],
      cicd: ['Electron', 'GitLab'],
    },
    web: 'https://www.gesfogo.ulpgc.es/index.php/pt/gesfogo-pt',
    github: '',
    type: 'Internship',
  },
  {
    alt: 'FireLoc',
    src: fireloc,
    description:
      'Master Thesis. CISUC researcher with the role of Backend Developer for the development of modules and components on the server for the management and processing of geospatial data (endpoints and scripts), creation of consumable services on maps (GeoServer). Also, I applied strategies to increase the performance rendering for geospatial data visualization.',
    activities: [
      'Implementation of Core Endpoints for Data Visualization',
      'Integration of GeoServer with Django through proxies',
      'Implementation of Algorithms to create clusters on geospatial data',
      'Performance Improvements on Data Visualization through Clustering and External Libraries',
      'Documentation of the entire application and backend system',
    ],
    role: 'Fire Detection and Prevention System',
    period: { start: 'August 2021', end: 'September 2022' },
    technologies: {
      backend: ['Django', 'GeoServer', 'ArcGIS'],
      frontend: ['Leaflet', 'JavaScript'],
      cicd: ['GitHub', 'Docker'],
    },
    web: 'https://fireloc.org/',
    github: '',
    type: 'Internship',
  },
];
export default professional;
