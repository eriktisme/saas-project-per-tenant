import { withContext } from '@internal/lambda/context'
import type { APIGatewayProxyEvent } from 'aws-lambda'
import { buildHandler } from './handler'
import { z } from 'zod'
import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager'
import type { APIGatewayProxyResult } from 'aws-lambda'
import { EventBridgeClient } from '@aws-sdk/client-eventbridge'

const ConfigSchema = z.object({
  clerkWebhookSecretSecretName: z.string(),
  eventBusName: z.string(),
})

const config = ConfigSchema.parse({
  clerkWebhookSecretSecretName: process.env.CLERK_WEBHOOK_SECRET_SECRET_NAME,
  eventBusName: process.env.EVENT_BUS_NAME,
})

const eventBridgeClient = new EventBridgeClient()

const secretsManagerClient = new SecretsManagerClient()

const clerkWebhookSecret = await secretsManagerClient.send(
  new GetSecretValueCommand({
    SecretId: config.clerkWebhookSecretSecretName,
  })
)

export const handler = withContext<APIGatewayProxyEvent, APIGatewayProxyResult>(
  async (_, event) =>
    buildHandler(event, {
      clerkWebhookSecret: clerkWebhookSecret.SecretString as string,
      eventBridgeClient,
      eventBusName: config.eventBusName,
    })
)
