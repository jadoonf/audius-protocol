import {
  Button,
  ButtonType,
  Divider,
  Flex,
  IconArrowRight,
  Text
} from '@audius/harmony'
import cn from 'classnames'
import { useFormikContext } from 'formik'

import audiusLogoColored from 'assets/img/audiusLogoColored.png'
import { HarmonyTextField } from 'components/form-fields/HarmonyTextField'
import { Link } from 'components/link'
import PreloadImage from 'components/preload-image/PreloadImage'
import {
  ArtworkContainer,
  AudiusValues
} from 'pages/sign-on/components/AudiusValues'
import { LeftContentContainer } from 'pages/sign-on/components/desktop/LeftContentContainer'
import { SignOnContainerDesktop } from 'pages/sign-on/components/desktop/SignOnContainerDesktop'
import { SocialMediaLoginOptions } from 'pages/sign-up-page/components/SocialMediaLoginOptions'
import { userHasMetaMask } from 'pages/sign-up-page/utils/metamask'
import { SIGN_IN_PAGE } from 'utils/route'

import styles from './CreateEmailPage.module.css'
import { SignUpWithMetaMaskButton } from './SignUpWithMetaMaskButton'
import { messages } from './messages'

export const CreateEmailPageDesktop = () => {
  const { isSubmitting } = useFormikContext()

  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <SignOnContainerDesktop>
        <LeftContentContainer gap='2xl' alignItems='center'>
          <PreloadImage
            src={audiusLogoColored}
            alt='Audius Colored Logo'
            className={cn(styles.logo, styles.desktop)}
          />
          <Flex direction='column' gap='l' alignItems='flex-start' w='100%'>
            <Text color='heading' size='l' variant='heading' tag='h1'>
              {messages.title}
            </Text>
            <Text color='default' size='l' variant='body' tag='h2'>
              {messages.subHeader}
            </Text>
          </Flex>
          <Flex direction='column' gap='l' w='100%' alignItems='flex-start'>
            <HarmonyTextField
              name='email'
              autoFocus
              autoComplete='email'
              label={messages.emailLabel}
            />
            <Divider css={{ width: '100%' }}>
              <Text variant='body' size='m' tag='p' color='subdued'>
                {messages.socialsDividerText}
              </Text>
            </Divider>
            <SocialMediaLoginOptions
              onCompleteSocialMediaLogin={(result) => {
                console.info(result)
                // TODO
              }}
            />
          </Flex>
          <Flex direction='column' gap='l' alignItems='flex-start' w='100%'>
            <Button
              variant={ButtonType.PRIMARY}
              type='submit'
              fullWidth
              iconRight={IconArrowRight}
              isLoading={isSubmitting}
            >
              {messages.signUp}
            </Button>

            <Text size='l'>
              {messages.haveAccount}{' '}
              {/* TODO [C-3278]: Update with Harmony Link */}
              <Link
                to={SIGN_IN_PAGE}
                variant='body'
                size='medium'
                strength='strong'
                color='secondary'
              >
                {messages.signIn}
              </Link>
            </Text>
            {userHasMetaMask ? (
              <Flex direction='column' alignItems='center' w='100%'>
                <SignUpWithMetaMaskButton />
                <Text size='s' variant='body'>
                  {messages.metaMaskNotRecommended}
                </Text>
              </Flex>
            ) : null}
          </Flex>
        </LeftContentContainer>
        <ArtworkContainer>
          <AudiusValues />
        </ArtworkContainer>
      </SignOnContainerDesktop>
    </Flex>
  )
}
