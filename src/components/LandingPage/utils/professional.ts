import amsosram from '../assets/ams-osram.png';

const professional = [
  {
    alt: 'ams OSRAM',
    src: amsosram,
    description:
      'Core Developer of a distributed, high-reliability system for detecting, reporting, and isolating defects at the lot and wafer level, aiding Product Engineers in minimizing semiconductor yield loss. Also, Core Developer of an enterprise integration for lot traceability and preventing shipment of high-risk materials in SAP Stock Warehouse Management.',
    activities: [
      'Development of Data-Driven and internal applications',
      'Query Tuning and Performance Optimizations: Partitioning, Indexing, Batch Processing, Query Tuning, Context Switching Minimization',
      'Collaborations in Network Enhancements (Performance and Security)',
      'Collaborations alongside the DBA team for ORDS maintenance and optimizations',
      'Maintenance of a Critical Distributed System across multiple production sites',
      'Maintenance of a Queue-Based Data Processing Pipeline and Parallel Synching between multiple systems',
      'RESTful API Development and Integrations',
      'SOAP Web Services Integrations',
      'Development of Enterprise integration flow supporting traceability, involving database-side processing, XML-based messaging, and SAP connectivity via an internal and external interfaces',
      'Full Refactor and Maintenance of React Applications for multinational sites/parties',
      'React Performance Optimization: Code Splitting, Lazy Loading, Memoization, Virtualization, Performance Profiling and DRY Principles',
    ],
    role: 'Staff Software Engineer',
    period: { start: 'November 2022', end: 'Currently' },
    technologies: {
      backend: ['Oracle PL/SQL'],
      frontend: ['React', 'Oracle APEX'],
      cicd: [
        'Confluence/Jira',
        'Elastic Search',
        'GitLab',
        'RESTful APIs',
        'SOAP Web Services',
      ],
    },
    web: 'https://ams-osram.com/',
    github: '',
    type: 'Professional',
  },
];
export default professional;
