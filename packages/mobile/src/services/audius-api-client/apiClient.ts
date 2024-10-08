import { AudiusAPIClient } from '@audius/common/services'

import { env } from 'app/env'
import { audiusBackendInstance } from 'app/services/audius-backend-instance'
import { audiusLibs, waitForLibsInit } from 'app/services/libs'
import { localStorage } from 'app/services/local-storage'
import { remoteConfigInstance } from 'app/services/remote-config'

export const apiClient = new AudiusAPIClient({
  audiusBackendInstance,
  remoteConfigInstance,
  getAudiusLibs: () => audiusLibs,
  localStorage,
  env,
  waitForLibsInit,
  appName: env.APP_NAME,
  apiKey: env.API_KEY
})
