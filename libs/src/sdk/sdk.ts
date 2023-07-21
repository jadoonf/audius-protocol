import { isBrowser } from 'browser-or-node'
import { OAuth } from './oauth'
import { GrantsApi } from './api/grants/GrantsApi'
import { DeveloperAppsApi } from './api/developer-apps/DeveloperAppsApi'
import { AlbumsApi } from './api/albums/AlbumsApi'
import { PlaylistsApi } from './api/playlists/PlaylistsApi'
import { TracksApi } from './api/tracks/TracksApi'
import { UsersApi } from './api/users/UsersApi'
import { ResolveApi } from './api/ResolveApi'
import { ChatsApi } from './api/chats/ChatsApi'
import { Configuration, TipsApi } from './api/generated/default'
import {
  Configuration as ConfigurationFull,
  PlaylistsApi as PlaylistsApiFull,
  ReactionsApi as ReactionsApiFull,
  SearchApi as SearchApiFull,
  TracksApi as TracksApiFull,
  UsersApi as UsersApiFull,
  TipsApi as TipsApiFull,
  TransactionsApi as TransactionsApiFull
} from './api/generated/full'
import fetch from 'cross-fetch'
import { addAppNameMiddleware } from './middleware'
import {
  AuthService,
  DiscoveryNodeSelectorService,
  DiscoveryNodeSelector,
  EntityManagerService,
  Auth,
  StorageService,
  Storage,
  EntityManager,
  AppAuth
} from './services'
import {
  StorageNodeSelector,
  StorageNodeSelectorService
} from './services/StorageNodeSelector'
import { defaultEntityManagerConfig } from './services/EntityManager/constants'
import { z } from 'zod'

type ServicesContainer = {
  /**
   * Service used to choose discovery node
   */
  discoveryNodeSelector: DiscoveryNodeSelectorService

  /**
   * Service used to choose storage node
   */
  storageNodeSelector: StorageNodeSelectorService

  /**
   * Service used to write and update entities on chain
   */
  entityManager: EntityManagerService

  /**
   * Service used to store and retrieve content e.g. tracks and images
   */
  storage: StorageService

  /**
   * Helpers to faciliate requests that require signatures or encryption
   */
  auth: AuthService
}

const DevAppSchema = z.object({
  /**
   * Your app name
   */
  appName: z.optional(z.string()),
  /**
   * Services injection
   */
  services: z.optional(z.custom<Partial<ServicesContainer>>()),
  /**
   * API key, required for writes
   */
  apiKey: z.string().min(1),
  /**
   * API secret, required for writes
   */
  apiSecret: z.string().min(1)
})

const CustomAppSchema = z.object({
  /**
   * Your app name
   */
  appName: z.string().min(1),
  /**
   * Services injection
   */
  services: z.optional(z.custom<Partial<ServicesContainer>>()),
  /**
   * API key, required for writes
   */
  apiKey: z.optional(z.string()),
  /**
   * API secret, required for writes
   */
  apiSecret: z.optional(z.string())
})

const SdkConfigSchema = z.union([DevAppSchema, CustomAppSchema])

type SdkConfig = z.infer<typeof SdkConfigSchema>

/**
 * The Audius SDK
 */
export const sdk = (config: SdkConfig) => {
  SdkConfigSchema.parse(config)
  const { appName, apiKey } = config

  // Initialize services
  const services = initializeServices(config)

  // Initialize APIs
  const apis = initializeApis({
    appName,
    services
  })

  // Initialize OAuth
  const oauth =
    typeof window !== 'undefined'
      ? new OAuth({ appName, apiKey, usersApi: apis.users })
      : undefined

  return {
    oauth,
    ...apis
  }
}

const initializeServices = (config: SdkConfig) => {
  if (config.apiSecret && isBrowser) {
    console.warn(
      "apiSecret should only be provided server side so that it isn't exposed"
    )
  }

  const defaultAuthService =
    config.apiKey && config.apiSecret
      ? new AppAuth(config.apiKey, config.apiSecret)
      : new Auth()

  const defaultDiscoveryNodeSelector = new DiscoveryNodeSelector()

  const storageNodeSelector =
    config.services?.storageNodeSelector ??
    new StorageNodeSelector({
      auth: config.services?.auth ?? defaultAuthService,
      discoveryNodeSelector:
        config.services?.discoveryNodeSelector ?? defaultDiscoveryNodeSelector
    })

  const defaultEntityManager = new EntityManager({
    ...defaultEntityManagerConfig,
    discoveryNodeSelector:
      config.services?.discoveryNodeSelector ?? defaultDiscoveryNodeSelector
  })
  const entityManager = config.services?.entityManager ?? defaultEntityManager

  const defaultStorage = new Storage({ storageNodeSelector })

  const defaultServices: ServicesContainer = {
    storageNodeSelector: storageNodeSelector,
    discoveryNodeSelector: defaultDiscoveryNodeSelector,
    entityManager,
    storage: defaultStorage,
    auth: defaultAuthService
  }
  return { ...defaultServices, ...config.services }
}

const initializeApis = ({
  appName,
  services
}: {
  appName?: string
  services: ServicesContainer
}) => {
  const middleware = [
    addAppNameMiddleware({ appName, services }),
    services.discoveryNodeSelector.createMiddleware()
  ]
  const generatedApiClientConfig = new Configuration({
    fetchApi: fetch,
    middleware
  })

  const tracks = new TracksApi(
    generatedApiClientConfig,
    services.discoveryNodeSelector,
    services.storage,
    services.entityManager,
    services.auth
  )
  const users = new UsersApi(
    generatedApiClientConfig,
    services.storage,
    services.entityManager,
    services.auth
  )
  const albums = new AlbumsApi(
    generatedApiClientConfig,
    services.storage,
    services.entityManager,
    services.auth
  )
  const playlists = new PlaylistsApi(
    generatedApiClientConfig,
    services.storage,
    services.entityManager,
    services.auth
  )
  const tips = new TipsApi(generatedApiClientConfig)
  const { resolve } = new ResolveApi(generatedApiClientConfig)
  const chats = new ChatsApi(
    new Configuration({
      fetchApi: fetch,
      basePath: '',
      middleware
    }),
    services.auth,
    services.discoveryNodeSelector
  )
  const grants = new GrantsApi(
    generatedApiClientConfig,
    services.entityManager,
    services.auth
  )

  const developerApps = new DeveloperAppsApi(
    generatedApiClientConfig,
    services.entityManager,
    services.auth
  )

  const generatedApiClientConfigFull = new ConfigurationFull({
    fetchApi: fetch,
    middleware
  })

  const full = {
    tracks: new TracksApiFull(generatedApiClientConfigFull),
    users: new UsersApiFull(generatedApiClientConfigFull),
    search: new SearchApiFull(generatedApiClientConfigFull),
    playlists: new PlaylistsApiFull(generatedApiClientConfigFull),
    reactions: new ReactionsApiFull(generatedApiClientConfigFull),
    tips: new TipsApiFull(generatedApiClientConfigFull),
    transactions: new TransactionsApiFull(generatedApiClientConfigFull)
  }

  return {
    tracks,
    users,
    albums,
    playlists,
    tips,
    resolve,
    full,
    chats,
    grants,
    developerApps
  }
}

export type AudiusSdk = ReturnType<typeof sdk>
