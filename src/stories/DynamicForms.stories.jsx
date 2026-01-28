import React from 'react';
import Form from '../components/Dynamic Forms/Form';
import SlotScheduler from '../components/Dynamic Forms/SlotScheduler';
const meta = {
  title: 'Components/Dynamic Forms',
  component: Form,
};

export default meta;

export const AdvancedForm = {
  args: {
    userid: 'user999',
    open: true,
    setOpen: () => {},
    form: {
      id: 2,
      title: 'Advanced Dynamic Form',
      owner: 'David Briceño',
      description:
        'This is an advanced dynamic form with multiple field types and extensive user responses.',
      fields: [
        {
          id: 1,
          label: 'Full Name',
          type: 'text',
          required: true,
          responses: [
            {
              value: 'Jane Smith',
              timestamp: '2024-01-10T09:00:00Z',
              userid: 'user999',
            },
            {
              value: 'Jane Doe',
              timestamp: '2024-01-11T10:00:00Z',
              userid: 'user888',
            },
            {
              value: 'Jane Johnson',
              timestamp: '2024-01-12T11:00:00Z',
              userid: 'user777',
            },
            {
              value: 'Jane Williams',
              timestamp: '2024-01-13T12:00:00Z',
              userid: 'user666',
            },
            {
              value: 'Jane Brown',
              timestamp: '2024-01-14T13:00:00Z',
              userid: 'user555',
            },
            {
              value: 'Jane Jones',
              timestamp: '2024-01-15T14:00:00Z',
              userid: 'user444',
            },
            {
              value: 'Jane Garcia',
              timestamp: '2024-01-16T15:00:00Z',
              userid: 'user333',
            },
            {
              value: 'Jane Miller',
              timestamp: '2024-01-17T16:00:00Z',
              userid: 'user222',
            },
            {
              value: 'Jane Davis',
              timestamp: '2024-01-18T17:00:00Z',
              userid: 'user111',
            },
            {
              value: 'Jane Rodriguez',
              timestamp: '2024-01-19T18:00:00Z',
              userid: 'user000',
            },
          ],
        },
        {
          id: 2,
          label: 'Gender',
          type: 'select',
          required: true,
          options: ['Male', 'Female', 'Other'],
          responses: [
            {
              value: 'Female',
              timestamp: '2024-01-10T09:00:00Z',
              userid: 'user999',
            },
            {
              value: 'Male',
              timestamp: '2024-01-11T10:00:00Z',
              userid: 'user888',
            },
            {
              value: 'Other',
              timestamp: '2024-01-12T11:00:00Z',
              userid: 'user777',
            },
            {
              value: 'Female',
              timestamp: '2024-01-13T12:00:00Z',
              userid: 'user666',
            },
            {
              value: 'Male',
              timestamp: '2024-01-14T13:00:00Z',
              userid: 'user555',
            },
            {
              value: 'Other',
              timestamp: '2024-01-15T14:00:00Z',
              userid: 'user444',
            },
            {
              value: 'Female',
              timestamp: '2024-01-16T15:00:00Z',
              userid: 'user333',
            },
            {
              value: 'Male',
              timestamp: '2024-01-17T16:00:00Z',
              userid: 'user222',
            },
            {
              value: 'Other',
              timestamp: '2024-01-18T17:00:00Z',
              userid: 'user111',
            },
            {
              value: 'Female',
              timestamp: '2024-01-19T18:00:00Z',
              userid: 'user000',
            },
          ],
        },
        {
          id: 3,
          label: 'Subscribe to Newsletter',
          type: 'checkbox',
          required: true,
          responses: [
            {
              value: true,
              timestamp: '2024-01-10T09:00:00Z',
              userid: 'user999',
            },
            {
              value: false,
              timestamp: '2024-01-11T10:00:00Z',
              userid: 'user888',
            },
            {
              value: true,
              timestamp: '2024-01-12T11:00:00Z',
              userid: 'user777',
            },
            {
              value: false,
              timestamp: '2024-01-13T12:00:00Z',
              userid: 'user666',
            },
            {
              value: true,
              timestamp: '2024-01-14T13:00:00Z',
              userid: 'user555',
            },
            {
              value: false,
              timestamp: '2024-01-15T14:00:00Z',
              userid: 'user444',
            },
            {
              value: true,
              timestamp: '2024-01-16T15:00:00Z',
              userid: 'user333',
            },
            {
              value: false,
              timestamp: '2024-01-17T16:00:00Z',
              userid: 'user222',
            },
            {
              value: true,
              timestamp: '2024-01-18T17:00:00Z',
              userid: 'user111',
            },
            {
              value: false,
              timestamp: '2024-01-19T18:00:00Z',
              userid: 'user000',
            },
          ],
        },
        {
          id: 4,
          label: 'Preferred Contact Method',
          type: 'radio',
          required: true,
          options: ['Email', 'Phone', 'Mail'],
          responses: [
            {
              value: 'Email',
              timestamp: '2024-01-10T09:00:00Z',
              userid: 'user999',
            },
            {
              value: 'Phone',
              timestamp: '2024-01-11T10:00:00Z',
              userid: 'user888',
            },
            {
              value: 'Mail',
              timestamp: '2024-01-12T11:00:00Z',
              userid: 'user777',
            },
            {
              value: 'Email',
              timestamp: '2024-01-13T12:00:00Z',
              userid: 'user666',
            },
            {
              value: 'Phone',
              timestamp: '2024-01-14T13:00:00Z',
              userid: 'user555',
            },
            {
              value: 'Mail',
              timestamp: '2024-01-15T14:00:00Z',
              userid: 'user444',
            },
            {
              value: 'Email',
              timestamp: '2024-01-16T15:00:00Z',
              userid: 'user333',
            },
            {
              value: 'Phone',
              timestamp: '2024-01-17T16:00:00Z',
              userid: 'user222',
            },
            {
              value: 'Mail',
              timestamp: '2024-01-18T17:00:00Z',
              userid: 'user111',
            },
            {
              value: 'Email',
              timestamp: '2024-01-19T18:00:00Z',
              userid: 'user000',
            },
          ],
        },
        {
          id: 5,
          label: 'Skills',
          type: 'multiselect',
          required: true,
          options: ['JavaScript', 'React', 'Node.js', 'Python', 'Java'],
          responses: [
            {
              value: ['JavaScript', 'React'],
              timestamp: '2024-01-10T09:00:00Z',
              userid: 'user999',
            },
            {
              value: ['Python', 'Java'],
              timestamp: '2024-01-11T10:00:00Z',
              userid: 'user888',
            },
            {
              value: ['Node.js', 'React'],
              timestamp: '2024-01-12T11:00:00Z',
              userid: 'user777',
            },
            {
              value: ['JavaScript'],
              timestamp: '2024-01-13T12:00:00Z',
              userid: 'user666',
            },
            {
              value: ['Python', 'Node.js', 'Java'],
              timestamp: '2024-01-14T13:00:00Z',
              userid: 'user555',
            },
            {
              value: ['React', 'Java'],
              timestamp: '2024-01-15T14:00:00Z',
              userid: 'user444',
            },
            {
              value: ['JavaScript', 'Python'],
              timestamp: '2024-01-16T15:00:00Z',
              userid: 'user333',
            },
            {
              value: ['Node.js'],
              timestamp: '2024-01-17T16:00:00Z',
              userid: 'user222',
            },
            {
              value: ['React', 'Python', 'Java'],
              timestamp: '2024-01-18T17:00:00Z',
              userid: 'user111',
            },
            {
              value: ['JavaScript', 'Node.js', 'React'],
              timestamp: '2024-01-19T18:00:00Z',
              userid: 'user000',
            },
          ],
        },
        {
          id: 6,
          label: 'Medical Appointment Schedule',
          type: 'slot',
          required: true,
          options: [
            {
              id: 1,
              day: 'Thursday 09/05/2024',
              slot_time: 10, // Slots of 10 min
              from: '08:00',
              until: '13:00',
              unavailable: ['09:00', '09:10', '09:20', '09:30'],
              disabled: false,
            },
            {
              id: 2,
              day: 'Friday 10/05/2024',
              slot_time: 10, // Slots of 10 min
              from: '08:00',
              until: '13:00',
              unavailable: ['09:00', '09:10', '09:20', '09:30'],
              disabled: false,
            },
          ],
          responses: [
            {
              value: {
                id: '2-3',
                time: '08:20 - 08:30',
                available: true,
                startTime: '08:20',
                dayId: 2,
              },
              timestamp: '2024-01-10T09:00:00Z',
              userid: 'user999',
            },
            {
              value: {
                id: '1-2',
                time: '08:10 - 08:20',
                available: true,
                startTime: '08:10',
                dayId: 1,
              },
              timestamp: '2024-01-11T10:00:00Z',
              userid: 'user888',
            },
            {
              value: {
                id: '1-3',
                time: '08:20 - 08:30',
                available: true,
                startTime: '08:20',
                dayId: 1,
              },
              timestamp: '2024-01-12T11:00:00Z',
              userid: 'user777',
            },
            {
              value: {
                id: '1-4',
                time: '08:30 - 08:40',
                available: true,
                startTime: '08:30',
                dayId: 1,
              },
              timestamp: '2024-01-13T12:00:00Z',
              userid: 'user666',
            },
            {
              value: {
                id: '1-5',
                time: '08:40 - 08:50',
                available: true,
                startTime: '08:40',
                dayId: 1,
              },
              timestamp: '2024-01-14T13:00:00Z',
              userid: 'user555',
            },
            {
              value: {
                id: '2-1',
                time: '08:00 - 08:10',
                available: true,
                startTime: '08:00',
                dayId: 2,
              },
              timestamp: '2024-01-15T14:00:00Z',
              userid: 'user444',
            },
            {
              value: {
                id: '2-2',
                time: '08:10 - 08:20',
                available: true,
                startTime: '08:10',
                dayId: 2,
              },
              timestamp: '2024-01-16T15:00:00Z',
              userid: 'user333',
            },
            {
              value: {
                id: '2-4',
                time: '08:30 - 08:40',
                available: true,
                startTime: '08:30',
                dayId: 2,
              },
              timestamp: '2024-01-18T17:00:00Z',
              userid: 'user111',
            },
            {
              value: {
                id: '2-5',
                time: '08:40 - 08:50',
                available: true,
                startTime: '08:40',
                dayId: 2,
              },
              timestamp: '2024-01-19T18:00:00Z',
              userid: 'user000',
            },
          ],
        },
      ],
      due_date: '2026-12-31',
    },
  },
};

export const EmptyForm = {
  args: {
    form_id: 3,
    form_title: 'Empty Form for Testing',
    form_fields: [
      {
        id: 1,
        label: 'Username',
        type: 'text',
        required: true,
        responses: [],
      },
      {
        id: 2,
        label: 'Password',
        type: 'password',
        required: true,
        responses: [],
      },
    ],
  },
};

export const SlotSchedulerStory = {
  render: (args) => {
    const [selectedSlot, setSelectedSlot] = React.useState(null);
    return (
      <SlotScheduler
        {...args}
        selectedSlot={selectedSlot}
        onSlotSelect={setSelectedSlot}
      />
    );
  },
  args: {
    slotsConfig: [
      {
        id: 1,
        day: 'Thursday 09/05/2024',
        slot_time: 10, // Slots of 10 min
        from: '08:00',
        until: '13:00',
        unavailable: ['09:00', '09:10', '09:20', '09:30'],
        disabled: false,
      },
      {
        id: 2,
        day: 'Friday 10/05/2024',
        slot_time: 10, // Slots of 10 min
        from: '08:00',
        until: '13:00',
        unavailable: ['09:00', '09:10', '09:20', '09:30'],
        disabled: false,
      },
    ],
    onSlotSelect: (slot) => {
      console.log('Selected Slot:', slot);
    },
    selectedSlot: '08:30',
  },
};
