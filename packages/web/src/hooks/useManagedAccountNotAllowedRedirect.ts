import { useContext, useEffect } from 'react'

import { useGetManagedAccounts } from '@audius/common/api'
import { useIsManagedAccount } from '@audius/common/hooks'
import { Status } from '@audius/common/models'
import { accountSelectors } from '@audius/common/store'
import { useSelector } from 'react-redux'

import { ToastContext } from 'components/toast/ToastContext'
import { FEED_PAGE } from 'utils/route'

import { useNavigateToPage } from './useNavigateToPage'

const messages = {
  unauthorized: 'Unauthorized',
  unauthorizedAsManaged: `You can't do that as a managed user`
}

/**
 * Hook to redirect a managed account from accessing a particular route
 * @param route route to redirect the user to
 */
export const useManagedAccountNotAllowedRedirect = (
  route: string = FEED_PAGE
) => {
  const isManagedAccount = useIsManagedAccount()
  const navigate = useNavigateToPage()
  const { toast } = useContext(ToastContext)

  useEffect(() => {
    if (isManagedAccount) {
      navigate(route)
      toast(messages.unauthorizedAsManaged)
    }
  }, [isManagedAccount, navigate, route, toast])
}

/**
 * Hook to prevent a managed account from some action (e.g. opening a modal)
 * @param trigger condition that when true, fires the callback (e.g. modal is open)
 * @param callback callback to fire when the action is performed (e.g. close the modal)
 */
export const useManagedAccountNotAllowedCallback = ({
  trigger,
  callback
}: {
  trigger: boolean
  callback: () => void
}) => {
  const isManagedAccount = useIsManagedAccount()
  const { toast } = useContext(ToastContext)

  useEffect(() => {
    if (isManagedAccount && trigger) {
      callback()
      toast(messages.unauthorizedAsManaged)
    }
  }, [isManagedAccount, callback, toast, trigger])
}

/**
 * Hook to prevent a managed account from some action if the
 * managed account does not have access to the provided account
 * @param handle handle of the user we are doing something on behalf of
 * @param route route to redirect the user to
 */
export const useIsUnauthorizedForHandleRedirect = (
  handle: string,
  route: string = FEED_PAGE
) => {
  const { handle: actingHandle, user_id: userId } =
    useSelector(accountSelectors.getAccountUser) || {}
  const navigate = useNavigateToPage()
  const { toast } = useContext(ToastContext)

  const { data: managedAccounts = [], status: accountsStatus } =
    useGetManagedAccounts({ userId: userId! }, { disabled: !userId })

  const isLoading =
    !actingHandle ||
    !userId ||
    accountsStatus === Status.LOADING ||
    accountsStatus === Status.IDLE
  const isOwner = actingHandle === handle
  const isManaged =
    !!actingHandle &&
    managedAccounts.find(({ user }) => user.handle.toLowerCase() === handle)

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (!isOwner && !isManaged) {
      navigate(route)
      toast(messages.unauthorized)
    }
  }, [isLoading, isOwner, isManaged, navigate, route, toast])
}
