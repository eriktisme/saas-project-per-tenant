#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'aws-cdk-lib'
import { ServiceClerk } from '../src/service-clerk'
import { MigrationsService } from '../src/migrations'
import { Events } from '../src/events'

const app = new App({
  analyticsReporting: false,
})

const stage = app.node.tryGetContext('stage') ?? 'prod'

const { eventBus } = new Events(app, `${stage}-events`, {
  stage,
  tags: {
    stage,
  },
})

const migrationsService = new MigrationsService(
  app,
  `${stage}-service-migrations`,
  {
    postgressUrl: process.env.POSTGRESS_URL as string,
    stage,
    tags: {
      stage,
    },
  }
)

const clerkService = new ServiceClerk(app, `${stage}-service-clerk`, {
  eventBus,
  stage,
  tags: {
    stage,
  },
})

clerkService.node.addDependency(migrationsService)
