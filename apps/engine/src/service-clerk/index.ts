import type { StackProps } from '@internal/cdk-utils/stack'
import { Stack } from '@internal/cdk-utils/stack'
import type { Construct } from 'constructs'
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'
import {
  AuthorizationType,
  LambdaIntegration,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway'
import { NodeJSLambda } from '@internal/cdk-utils/lambda'
import { join } from 'path'
import { RemovalPolicy } from 'aws-cdk-lib'
import type { EventBus } from 'aws-cdk-lib/aws-events'

type Props = StackProps & {
  eventBus: EventBus
  stage: string
}

export class ServiceClerk extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    const webhookSecret = new Secret(this, 'clerk-webhook-secret', {
      removalPolicy: RemovalPolicy.DESTROY,
    })

    const handler = new NodeJSLambda(this, 'function', {
      entry: join(__dirname, './functions/webhook/index.ts'),
      environment: {
        CLERK_WEBHOOK_SECRET_SECRET_NAME: webhookSecret.secretName,
        EVENT_BUS_NAME: props.eventBus.eventBusName,
      },
    })

    props.eventBus.grantPutEventsTo(handler)

    webhookSecret.grantRead(handler)

    const api = new RestApi(this, 'api', {
      restApiName: `${props.stage}-scaling-clerk-api`,
      defaultMethodOptions: {
        authorizationType: AuthorizationType.NONE,
      },
    })

    api.root.addMethod('POST', new LambdaIntegration(handler))
  }
}
