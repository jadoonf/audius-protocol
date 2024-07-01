import { useCallback } from 'react'

import { FeatureFlags } from '@audius/common/services'
import type { TrackForUpload } from '@audius/common/store'
import { Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'

import {
  IconArrowRight,
  IconCaretLeft,
  IconCloudUpload
} from '@audius/harmony-native'
import { Button, Tile } from 'app/components/core'
import { InputErrorMessage } from 'app/components/core/InputErrorMessage'
import { PickArtworkField, TextField } from 'app/components/fields'
import { useNavigation } from 'app/hooks/useNavigation'
import { useOneTimeDrawer } from 'app/hooks/useOneTimeDrawer'
import { useFeatureFlag } from 'app/hooks/useRemoteConfig'
import { FormScreen } from 'app/screens/form-screen'
import { setVisibility } from 'app/store/drawers/slice'
import { makeStyles } from 'app/styles'

import { TopBarIconButton } from '../app-screen'

import { CancelEditTrackDrawer } from './components'
import {
  SelectGenreField,
  DescriptionField,
  SelectMoodField,
  TagField,
  SubmenuList,
  RemixSettingsField,
  ReleaseDateField,
  AdvancedOptionsField,
  AccessAndSaleField
} from './fields'
import type { EditTrackFormProps } from './types'

const messages = {
  trackName: 'Track Name',
  trackNameError: 'Track Name Required',
  fixErrors: 'Fix Errors To Continue'
}

const GATED_CONTENT_UPLOAD_PROMPT_DRAWER_SEEN_KEY =
  'gated_content_upload_prompt_drawer_seen'

const useStyles = makeStyles(({ spacing }) => ({
  backButton: {
    marginLeft: -6
  },
  tile: {
    margin: spacing(3)
  },
  errorText: {
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: spacing(4)
  }
}))

export type EditTrackParams = TrackForUpload

export const EditTrackForm = (props: EditTrackFormProps) => {
  const {
    handleSubmit,
    isSubmitting,
    errors,
    touched,
    dirty,
    title,
    doneText
  } = props
  const errorsKeys = Object.keys(errors)
  const hasErrors =
    errorsKeys.length > 0 && errorsKeys.every((errorKey) => touched[errorKey])
  const styles = useStyles()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useOneTimeDrawer({
    key: GATED_CONTENT_UPLOAD_PROMPT_DRAWER_SEEN_KEY,
    name: 'GatedContentUploadPrompt'
  })

  const handlePressBack = useCallback(() => {
    if (!dirty) {
      navigation.goBack()
    } else {
      Keyboard.dismiss()
      dispatch(
        setVisibility({
          drawer: 'CancelEditTrack',
          visible: true
        })
      )
    }
  }, [dirty, navigation, dispatch])

  const { isEnabled: isScheduledReleasesEnabled } = useFeatureFlag(
    FeatureFlags.SCHEDULED_RELEASES
  )

  return (
    <>
      <FormScreen
        title={title}
        icon={IconCloudUpload}
        topbarLeft={
          <TopBarIconButton
            icon={IconCaretLeft}
            style={styles.backButton}
            onPress={handlePressBack}
          />
        }
        bottomSection={
          <>
            {hasErrors ? (
              <InputErrorMessage
                message={messages.fixErrors}
                style={styles.errorText}
              />
            ) : null}
            <Button
              variant='primary'
              size='large'
              icon={IconArrowRight}
              fullWidth
              title={doneText}
              onPress={() => {
                handleSubmit()
              }}
              disabled={isSubmitting || hasErrors}
            />
          </>
        }
      >
        <>
          <KeyboardAwareScrollView>
            <Tile style={styles.tile}>
              <PickArtworkField name='artwork' />
              <TextField name='title' label={messages.trackName} required />
              <SubmenuList>
                <SelectGenreField />
                <SelectMoodField />
              </SubmenuList>
              <TagField />
              <DescriptionField />
              <SubmenuList removeBottomDivider>
                {isScheduledReleasesEnabled ? <ReleaseDateField /> : <></>}
                <AccessAndSaleField />
                <RemixSettingsField />
                <AdvancedOptionsField />
              </SubmenuList>
            </Tile>
          </KeyboardAwareScrollView>
        </>
      </FormScreen>
      <CancelEditTrackDrawer />
    </>
  )
}
