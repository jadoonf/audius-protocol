import type { AuthService, EntityManagerService } from '../../services'
import {
  Action,
  AdvancedOptions,
  EntityType
} from '../../services/EntityManager/types'
import { parseParams } from '../../utils/parseParams'
import {
  Configuration,
  DashboardWalletUsersApi as GeneratedDashboardWalletUsersApi
} from '../generated/default'

import {
  CreateDashboardWalletUser,
  CreateDashboardWalletUserRequest,
  DeleteDashboardWalletUserRequest,
  DeleteDashboardWalletUserSchema
} from './types'

export class DashboardWalletUsersApi extends GeneratedDashboardWalletUsersApi {
  constructor(
    config: Configuration,
    private readonly entityManager: EntityManagerService,
    private readonly auth: AuthService
  ) {
    super(config)
  }

  /**
   * Connect an Audius user to a wallet on the protocol dashboard
   */
  async connectUserToDashboardWallet(
    params: CreateDashboardWalletUserRequest,
    advancedOptions?: AdvancedOptions
  ) {
    const {
      wallet,
      userId,
      walletSignature: { message, signature }
    } = await parseParams(
      'createDashboardWalletUser',
      CreateDashboardWalletUser
    )(params)

    const response = await this.entityManager.manageEntity({
      userId,
      entityType: EntityType.DASHBOARD_WALLET_USER,
      entityId: 0, // Unused
      action: Action.CREATE,
      metadata: JSON.stringify({
        wallet,
        wallet_signature: {
          message,
          signature
        }
      }),
      auth: this.auth,
      ...advancedOptions
    })

    return {
      ...response
    }
  }

  /**
   * Disconnect an Audius user from a wallet on the protocol dashboard
   */
  async disconnectUserFromDashboardWallet(
    params: DeleteDashboardWalletUserRequest
  ) {
    const { userId, wallet } = await parseParams(
      'deleteDashboardWalletUser',
      DeleteDashboardWalletUserSchema
    )(params)

    return await this.entityManager.manageEntity({
      userId,
      entityType: EntityType.DASHBOARD_WALLET_USER,
      entityId: 0, // Unused
      action: Action.DELETE,
      metadata: JSON.stringify({
        wallet
      }),
      auth: this.auth
    })
  }
}
