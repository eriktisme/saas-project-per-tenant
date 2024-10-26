import { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-designs',
  ],
  typescript: {
    //
  },
  staticDirs: ['../public'],
  framework: '@storybook/nextjs',
  features: { experimentalRSC: true },
}
export default config
