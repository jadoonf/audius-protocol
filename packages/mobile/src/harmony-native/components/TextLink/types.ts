import type { ReactNode } from 'react'

import type { NavigationAction } from '@react-navigation/native'
import type { To } from '@react-navigation/native/lib/typescript/src/useLinkTo'
import type { GestureResponderEvent } from 'react-native'
import type { SetOptional } from 'type-fest'

import type { TextProps } from '../Text/Text'

type TextLinkTextProps = Omit<TextProps, 'variant' | 'color'>

export type LinkProps<ParamList extends ReactNavigation.RootParamList> = {
  to: To<ParamList>
  action?: NavigationAction
  target?: string
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void
  children?: ReactNode
}

export type TextLinkProps<ParamList extends ReactNavigation.RootParamList> =
  TextLinkTextProps &
    SetOptional<LinkProps<ParamList>, 'to'> & {
      /**
       * Which variant to display.
       * @default default
       */
      variant?: 'default' | 'subdued' | 'visible' | 'inverted'

      /**
       * Which text variant to display.
       */
      textVariant?: TextProps['variant']

      /**
       * When true, always show the link underline. This can help emphasize that
       * a text-link is present when next to other text.
       */
      showUnderline?: boolean

      /**
       * Mark as true if the link destination is outside of the app. Causes the
       * link to open in a new tab.
       * @default false
       */
      isExternal?: boolean
    }
