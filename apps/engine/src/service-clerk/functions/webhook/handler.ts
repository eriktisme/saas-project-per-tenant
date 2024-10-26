import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Webhook } from 'svix'
import type { EventBridgeClient } from '@aws-sdk/client-eventbridge'

interface WebhookPayload {
  data: Record<string, unknown>
  type: string
}

interface Deps {
  clerkWebhookSecret: string
  eventBridgeClient: EventBridgeClient
  eventBusName: string
}

export const buildHandler = async (
  event: APIGatewayProxyEvent,
  deps: Deps
): Promise<APIGatewayProxyResult> => {
  const headers = event.headers
  const payload = event.body

  if (!payload) {
    return {
      statusCode: 400,
      body: 'Missing body',
    }
  }

  const id = headers['svix-id']
  const timestamp = headers['svix-timestamp']
  const signature = headers['svix-signature']

  if (!id || !timestamp || !signature) {
    return {
      statusCode: 400,
      body: 'Missing SVIX headers',
    }
  }

  const webhook = new Webhook(deps.clerkWebhookSecret)

  let evt: WebhookPayload

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evt = webhook.verify(payload, {
      'svix-id': id,
      'svix-timestamp': timestamp,
      'svix-signature': signature,
    }) as WebhookPayload
  } catch (e) {
    const err = e as Error

    console.error('Failed to verify webhook:', err.message)

    return {
      statusCode: 400,
      body: '',
    }
  }

  // TODO: Add your business logic to handle Clerk events

  return {
    statusCode: 200,
    body: '',
  }
}
