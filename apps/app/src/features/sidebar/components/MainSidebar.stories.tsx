import { MainSidebar } from './MainSidebar'
import type { Meta, StoryObj } from '@storybook/react'
import { RouteSection } from '@/features/sidebar'
import { HomeIcon, SettingsIcon } from 'lucide-react'

const meta = {
  title: 'Features/Sidebar/Components/MainSidebar',
  component: MainSidebar,
  parameters: {
    docs: { inlineStories: false, iframeHeight: 600 },
  },
  args: {
    //
  },
  render: () => {
    return (
      <MainSidebar>
        <RouteSection
          routes={[
            {
              icon: <HomeIcon aria-hidden className="h-4 w-4" />,
              href: '#',
              title: 'Home',
            },
          ]}
        />
        <RouteSection
          title="Application"
          routes={[
            {
              icon: <SettingsIcon aria-hidden className="h-4 w-4" />,
              href: '#',
              title: 'Settings',
            },
          ]}
        />
      </MainSidebar>
    )
  },
} satisfies Meta<typeof MainSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
}
