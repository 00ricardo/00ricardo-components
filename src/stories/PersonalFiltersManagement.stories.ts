import type { Meta, StoryObj } from '@storybook/react';
import PersonalFiltersManagement from '../components/PersonalFilters/PersonalFiltersManagement';

const metaPersonalFiltersManagement = {
    title: 'Components/Personal Filters',
    component: PersonalFiltersManagement,
} satisfies Meta<typeof PersonalFiltersManagement>;


type FiltersManagement = StoryObj<typeof metaPersonalFiltersManagement>;
export const FiltersManagement: FiltersManagement = { args: { title: 'Personal Filters Management' } };

export default metaPersonalFiltersManagement;