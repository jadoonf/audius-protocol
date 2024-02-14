import { useState, useEffect, useCallback } from 'react'

import {
  IconAudiusLogoHorizontalColor,
  IconKebabHorizontal,
  IconCloudDownload as IconDownloadQueued,
  IconCaretDown,
  PopupMenu,
  PopupMenuItem
} from '@audius/harmony'
import { IconBlog, IconFoundation, IconMerch, IconSupport } from '@audius/stems'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { UnstyledButton } from 'components/unstyled-button/UnstyledButton'
import {
  AUDIUS_BLOG_LINK,
  AUDIUS_HELP_LINK,
  TRENDING_PAGE,
  AUDIUS_MERCH_LINK,
  AUDIUS_ORG,
  SIGN_UP_PAGE,
  DOWNLOAD_LINK
} from 'utils/route'
import { useMatchesBreakpoint } from 'utils/useMatchesBreakpoint'
import zIndex from 'utils/zIndex'

import styles from './NavBanner.module.css'

const DESKTOP_NAV_BANNER_MIN_WIDTH = 1170
const MOBILE_WIDTH_MEDIA_QUERY = window.matchMedia(
  `(max-width: ${DESKTOP_NAV_BANNER_MIN_WIDTH}px)`
)
const messages = {
  resources: 'Resources',
  signUp: 'Sign Up',
  help: 'Help & Support',
  helpDescription:
    'Answers and Resources to help you make the most of Audius Music.',
  download: 'Download the App',
  downloadDescription: 'Download the apps for desktop and mobile devices.',
  blog: 'Read the Blog',
  blogDescription: 'Check out the latest updates to the Audius Blog.',
  oaf: 'Open Audio Foundation',
  oafDescription: 'Learn more about the $AUDIO and the Open Audio Foundation.',
  merch: 'Merch Store',
  merchDescription: 'Shop official limited edition merch.'
}

type NavBannerProps = {
  isMobile: boolean
  invertColors?: boolean
  className?: string
  openNavScreen: () => void
  setRenderPublicSite: (shouldRender: boolean) => void
}

const NavBanner = (props: NavBannerProps) => {
  const isNarrow = useMatchesBreakpoint({
    mediaQuery: MOBILE_WIDTH_MEDIA_QUERY,
    initialValue: props.isMobile
  })
  const [isScrolling, setIsScrolling] = useState(false)
  const setScrolling = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const isScrolling = scrollTop > 20
    setIsScrolling(isScrolling)
  }, [])

  useEffect(() => {
    setScrolling()
    window.addEventListener('scroll', setScrolling)
    return () => window.removeEventListener('scroll', setScrolling)
  }, [setScrolling])

  const menuItems: PopupMenuItem[] = [
    {
      text: messages.help,
      subtext: messages.helpDescription,
      onClick: () =>
        window.open(AUDIUS_HELP_LINK, '_blank', 'noreferrer,noopener'),
      icon: <IconSupport />,
      iconClassName: styles.menuItemIcon
    },
    {
      text: messages.download,
      subtext: messages.downloadDescription,
      onClick: () =>
        window.open(DOWNLOAD_LINK, '_blank', 'noreferrer,noopener'),
      icon: <IconDownloadQueued />,
      iconClassName: styles.menuItemIcon
    },
    {
      text: messages.blog,
      subtext: messages.blogDescription,
      onClick: () =>
        window.open(AUDIUS_BLOG_LINK, '_blank', 'noreferrer,noopener'),
      icon: <IconBlog />,
      iconClassName: styles.menuItemIconStroke
    },
    {
      text: messages.oaf,
      subtext: messages.oafDescription,
      onClick: () => window.open(AUDIUS_ORG, '_blank', 'noreferrer,noopener'),
      icon: <IconFoundation />,
      iconClassName: styles.menuItemIcon
    },
    {
      text: messages.merch,
      subtext: messages.merchDescription,
      onClick: () =>
        window.open(AUDIUS_MERCH_LINK, '_blank', 'noreferrer,noopener'),
      icon: <IconMerch />,
      iconClassName: styles.menuItemIconStroke
    }
  ]

  if (props.isMobile || isNarrow) {
    return (
      <div
        className={cn(styles.mobileContainer, {
          [props.className!]: !!props.className,
          [styles.invertColors]: isScrolling || props.invertColors
        })}
      >
        <div className={styles.leftLogo}>
          <IconAudiusLogoHorizontalColor className={styles.horizontalLogo} />
        </div>
        <UnstyledButton
          onClick={props.openNavScreen}
          data-testid='mobileKebabMenuButton'
          aria-label='Open Nav Menu'
        >
          <IconKebabHorizontal className={styles.kebabMenu} />
        </UnstyledButton>
      </div>
    )
  }

  return (
    <div
      className={cn(styles.container, {
        [props.className!]: !!props.className,
        [styles.invertColors]: isScrolling || props.invertColors
      })}
    >
      <div className={styles.contentContainer}>
        <div className={styles.leftLogo}>
          <Link to={TRENDING_PAGE}>
            <IconAudiusLogoHorizontalColor className={styles.horizontalLogo} />
          </Link>
        </div>
        <div className={styles.linkContainer}>
          <PopupMenu
            fixed
            renderMenu={(menuItems: PopupMenuItem[]) => {
              return (
                <div className={styles.resourcesMenu}>
                  {menuItems.map((item, i) => (
                    <div
                      key={`resources-menu-item-${i}`}
                      className={styles.menuItemContainer}
                      onClick={item.onClick}
                    >
                      <div className={item.iconClassName}>{item.icon}</div>
                      <div className={styles.menuItemContent}>
                        <p className={styles.menuItemTitle}>{item.text}</p>
                        <p className={styles.menuItemSubtitle}>
                          {item.subtext}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }}
            items={menuItems}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            renderTrigger={(anchorRef, triggerPopup) => {
              return (
                <div
                  className={styles.resources}
                  ref={anchorRef}
                  onClick={() => triggerPopup()}
                  onMouseEnter={() => triggerPopup(true)}
                >
                  {messages.resources}
                  <IconCaretDown className={styles.resourcesIcon} />
                </div>
              )
            }}
            zIndex={zIndex.NAV_BANNER_POPUP}
            className={styles.popup}
            dismissOnMouseLeave
          />
          <Link
            to={SIGN_UP_PAGE}
            className={styles.signUp}
            onClick={() => {
              props.setRenderPublicSite(false)
            }}
          >
            {messages.signUp}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBanner
