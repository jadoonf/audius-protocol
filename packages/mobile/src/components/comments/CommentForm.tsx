import { useEffect, useRef } from 'react'

import { useGetUserById } from '@audius/common/api'
import { useCurrentCommentSection } from '@audius/common/context'
import { commentsMessages as messages } from '@audius/common/messages'
import type { FormikHelpers } from 'formik'
import { Formik, useFormikContext } from 'formik'
import type { TextInput as RNTextInput } from 'react-native'

import { Flex, IconButton, IconSend } from '@audius/harmony-native'

import { ProfilePicture } from '../core'
import { HarmonyTextField } from '../fields'
import LoadingSpinner from '../loading-spinner'

type CommentFormValues = {
  commentMessage: string
}

type CommentFormProps = {
  onSubmit: (commentMessage: string) => void
  initialValue?: string
  isLoading?: boolean
  TextInputComponent?: typeof RNTextInput
}

type CommentFormContentProps = Omit<
  CommentFormProps,
  'onSubmit' | 'initialValue'
>

const CommentFormContent = (props: CommentFormContentProps) => {
  const { isLoading, TextInputComponent } = props
  const { currentUserId, comments, replyingToComment, editingComment } =
    useCurrentCommentSection()
  const ref = useRef<RNTextInput>(null)

  const replyingToUserId = Number(replyingToComment?.userId)
  const { data: replyingToUser } = useGetUserById(
    {
      id: replyingToUserId
    },
    { disabled: !replyingToComment }
  )

  const { setFieldValue } = useFormikContext()
  const { submitForm } = useFormikContext()

  /**
   * Populate and focus input when replying to a comment
   */
  useEffect(() => {
    if (replyingToComment && replyingToUser) {
      setFieldValue('commentMessage', `@${replyingToUser.handle} `)
      ref.current?.focus()
    }
  }, [replyingToComment, replyingToUser, setFieldValue])

  /**
   * Populate and focus input when editing a comment
   */
  useEffect(() => {
    if (editingComment) {
      setFieldValue('commentMessage', editingComment.message)
      ref.current?.focus()
    }
  }, [editingComment, setFieldValue])

  const message = comments?.length ? messages.addComment : messages.firstComment

  return (
    <Flex direction='row' gap='m' alignItems='center'>
      {currentUserId ? (
        <ProfilePicture
          userId={currentUserId}
          style={{ width: 40, height: 40, flexShrink: 0 }}
        />
      ) : null}
      <HarmonyTextField
        style={{ flex: 1 }}
        name='commentMessage'
        label={messages.addComment}
        ref={ref}
        hideLabel
        placeholder={message}
        endAdornment={
          isLoading ? (
            <LoadingSpinner />
          ) : (
            <IconButton
              aria-label='Post comment'
              icon={IconSend}
              color='accent'
              onPress={submitForm}
            />
          )
        }
        TextInputComponent={TextInputComponent}
      />
    </Flex>
  )
}

export const CommentForm = ({
  onSubmit,
  initialValue = '',
  ...rest
}: CommentFormProps) => {
  const handleSubmit = (
    { commentMessage }: CommentFormValues,
    { resetForm }: FormikHelpers<CommentFormValues>
  ) => {
    onSubmit(commentMessage)
    resetForm()
  }

  const formInitialValues: CommentFormValues = { commentMessage: initialValue }

  return (
    <Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
      <CommentFormContent {...rest} />
    </Formik>
  )
}
