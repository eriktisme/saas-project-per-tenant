import type { StackProps } from '@internal/cdk-utils/stack'
import { Stack } from '@internal/cdk-utils/stack'
import type { Construct } from 'constructs'
import { EventBus } from 'aws-cdk-lib/aws-events'

type EventsProps = StackProps & {
  stage: string
}

export class Events extends Stack {
  eventBus: EventBus

  constructor(scope: Construct, id: string, props: EventsProps) {
    super(scope, id, props)

    this.eventBus = new EventBus(this, 'event', {
      //
    })
  }
}
