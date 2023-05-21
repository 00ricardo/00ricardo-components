import { DataConflict } from '../SubComponents/DataConflict';
export default {
    title: '00ricardo-utils/Version Control',
    component: DataConflict
};

export const _DataConflict = {
    args: {
        open: true,
        handleClickClose: () => console.log('Close modal'),
        conflicts: [
            {
                lot_label: 'H18347.01',
                maverickType: 'Lot on hold',
                actions: [{
                    id: 1234,
                    type: 'Technical Glass',
                    conflictCount: 1
                }]
            },
            {
                lot_label: 'H18347.02',
                maverickType: 'Lot on hold',
                actions: [{
                    id: 5678,
                    type: 'Partional chip',
                    conflictCount: 3
                }]
            },
        ]
    },
};
