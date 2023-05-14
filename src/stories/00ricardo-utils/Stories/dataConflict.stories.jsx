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
                    id: 123456,
                    type: 'Technical Glass',
                    conflictCount: 1
                }]
            },
            {
                lot_label: 'H18347.03',
                maverickType: 'Lot on hold',
                actions: [{
                    id: 789012,
                    type: 'Partional chip',
                    conflictCount: 3
                },
                {
                    id: 345678,
                    type: 'Internal miss Test',
                    conflictCount: 1
                }]
            },
        ]
    },
};
