import type { Meta, StoryObj } from '@storybook/react';
import LandingPage from '../components/LandingPage/LandingPage';
const meta = {
  title: 'Components/Landing Page',
  component: LandingPage,
} satisfies Meta<typeof LandingPage>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Home: Story = {
  args: {
    title: 'LandingPage',
  },
};
