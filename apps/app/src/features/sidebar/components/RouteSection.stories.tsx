import { RouteSection } from './RouteSection'
import type { Meta, StoryObj } from '@storybook/react'
import { SettingsIcon } from 'lucide-react'

const meta = {
  title: 'Features/Sidebar/Components/RouteSection',
  component: RouteSection,
  parameters: {
    docs: { inlineStories: false, iframeHeight: 600 },
  },
  args: {
    routes: [
      {
        icon: <SettingsIcon aria-hidden className="h-4 w-4" />,
        href: '#',
        title: 'Settings',
      },
    ],
    title: 'Application',
  },
  render: (props) => {
    return <RouteSection {...props} />
  },
} satisfies Meta<typeof RouteSection>

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
