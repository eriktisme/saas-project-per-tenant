import type { Construct } from 'constructs'
import { MigrationsConstruct } from './constructs/migrations'
import type { StackProps } from '@internal/cdk-utils/stack'
import { Stack } from '@internal/cdk-utils/stack'

type Props = StackProps & {
  postgressUrl: string
}

export class MigrationsService extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    new MigrationsConstruct(this, 'migrations', {
      postgressUrl: props.postgressUrl,
    })
  }
}
