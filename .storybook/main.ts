const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-controls'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
};
export default config;
