import {
  PayExtraPreset,
  CUSTOM_AMOUNT,
  AMOUNT_PRESET
} from '@audius/common/hooks'
import type { PayExtraAmountPresetValues } from '@audius/common/hooks'
import { useField } from 'formik'
import { View } from 'react-native'

import { SelectablePill } from '@audius/harmony-native'
import { flexRowCentered, makeStyles } from 'app/styles'

import { Text } from '../core/Text'
import { PriceField } from '../fields/PriceField'

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2)
  },
  pillContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2)
  },
  presetContainer: {
    ...flexRowCentered(),
    flexWrap: 'wrap',
    gap: spacing(2),
    width: '100%'
  },
  pill: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: spacing(10)
  },
  customPill: {
    minWidth: spacing(20)
  },
  title: {
    letterSpacing: 0.5
  }
}))

const messages = {
  payExtra: 'Pay Extra',
  other: 'Other',
  customAmount: 'Custom Amount',
  placeholder: 'Enter a value'
}

const formatPillAmount = (val: number) => `$${Math.floor(val / 100)}`

export type PayExtraFormSectionProps = {
  amountPresets: PayExtraAmountPresetValues
  disabled?: boolean
}

export const PayExtraFormSection = ({
  amountPresets,
  disabled
}: PayExtraFormSectionProps) => {
  const [{ value: preset }, , { setValue: setPreset }] = useField(AMOUNT_PRESET)
  const [{ value: customAmount }, { error: customAmountError }] =
    useField(CUSTOM_AMOUNT)
  const styles = useStyles()

  const handleClickPreset = (newPreset: PayExtraPreset) => {
    setPreset(newPreset === preset ? PayExtraPreset.NONE : newPreset)
  }
  return (
    <View style={styles.container}>
      <Text
        weight='bold'
        fontSize='medium'
        color='neutral'
        style={styles.title}
        noGutter
      >
        {messages.payExtra}
      </Text>
      <View style={styles.presetContainer}>
        <SelectablePill
          type='button'
          size='large'
          style={styles.pill}
          fullWidth
          isSelected={preset === PayExtraPreset.LOW}
          label={formatPillAmount(amountPresets[PayExtraPreset.LOW])}
          disabled={disabled}
          onPress={() => handleClickPreset(PayExtraPreset.LOW)}
        />
        <SelectablePill
          type='button'
          size='large'
          style={styles.pill}
          fullWidth
          isSelected={preset === PayExtraPreset.MEDIUM}
          label={formatPillAmount(amountPresets[PayExtraPreset.MEDIUM])}
          disabled={disabled}
          onPress={() => handleClickPreset(PayExtraPreset.MEDIUM)}
        />
        <SelectablePill
          type='button'
          size='large'
          style={styles.pill}
          fullWidth
          isSelected={preset === PayExtraPreset.HIGH}
          label={formatPillAmount(amountPresets[PayExtraPreset.HIGH])}
          disabled={disabled}
          onPress={() => handleClickPreset(PayExtraPreset.HIGH)}
        />
        <SelectablePill
          type='button'
          size='large'
          style={[styles.pill, styles.customPill]}
          fullWidth
          isSelected={preset === PayExtraPreset.CUSTOM}
          label={messages.other}
          disabled={disabled}
          onPress={() => handleClickPreset(PayExtraPreset.CUSTOM)}
        />
      </View>
      {preset === PayExtraPreset.CUSTOM ? (
        <PriceField
          name={CUSTOM_AMOUNT}
          label={messages.customAmount}
          value={String(customAmount)}
          placeholder={messages.placeholder}
          errorMessage={customAmountError}
          editable={!disabled}
          noGutter
        />
      ) : null}
    </View>
  )
}
