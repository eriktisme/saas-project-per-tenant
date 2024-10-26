import type { Preview } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { DocsContainer, DocsContainerProps } from '@storybook/blocks'

import '../src/app/globals.css'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
      source: {
        excludeDecorators: true,
      },
      container: (props: DocsContainerProps) => <DocsContainer {...props} />,
    },
    nextRouter: {
      Provider: RouterContext.Provider,
    },
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      defaultViewport: 'responsive',
      viewports: {
        ...INITIAL_VIEWPORTS,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Theme for the components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'light' },
          { value: 'dark', icon: 'circle', title: 'dark' },
          { value: 'side-by-side', icon: 'sidebar', title: 'side by side' },
        ],
      },
    },
  },
  decorators: [],
  loaders: [],
}

export default preview
