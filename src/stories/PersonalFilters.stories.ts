import type { Meta, StoryObj } from '@storybook/react';
import PersonalFilters from '../components/PersonalFilters/PersonalFilters';

const metaFilters = {
    title: 'Components/Personal Filters',
    component: PersonalFilters,
} satisfies Meta<typeof PersonalFilters>;

type Filters = StoryObj<typeof metaFilters>;
export const Filters: Filters = { args: { title: 'Personal Filters' } };
export default metaFilters;