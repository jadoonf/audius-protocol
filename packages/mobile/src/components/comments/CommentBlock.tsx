import { useState } from 'react'

import { useGetUserById } from '@audius/common/api'
import {
  useCurrentCommentSection,
  useReactToComment
} from '@audius/common/context'
import type { Comment } from '@audius/sdk'

import {
  CommentText,
  Flex,
  IconPencil,
  PlainButton,
  Text,
  TextLink,
  Timestamp
} from '@audius/harmony-native'
import { formatCommentTrackTimestamp } from 'app/utils/comments'

import { ProfilePicture } from '../core/ProfilePicture'
import { FavoriteButton } from '../favorite-button'
import { UserLink } from '../user-link'

import { CommentOverflowMenu } from './CommentOverflowMenu'

const messages = {
  pinned: 'Pinned by artist',
  topSupporters: 'Top Supporters',
  reply: 'Reply'
}

export type CommentBlockProps = {
  comment: Comment
  parentCommentId?: string
  hideActions?: boolean
}

export const CommentBlock = (props: CommentBlockProps) => {
  const { comment, hideActions } = props
  const { setReplyingToComment } = useCurrentCommentSection()
  const {
    isPinned,
    message,
    reactCount = 0,
    trackTimestampS,
    id: commentId,
    createdAt,
    userId: userIdStr
  } = comment

  const [reactToComment] = useReactToComment()
  const userId = Number(userIdStr)
  useGetUserById({ id: userId })

  const [reactionState, setReactionState] = useState(false) // TODO: need to pull starting value from metadata
  const hasBadges = false // TODO: need to figure out how to data model these "badges" correctly

  const handleCommentReact = () => {
    setReactionState(!reactionState)
    reactToComment(commentId, !reactionState)
  }

  return (
    <Flex direction='row' w='100%' gap='s'>
      <ProfilePicture
        style={{ width: 32, height: 32, flexShrink: 0 }}
        userId={userId}
      />
      <Flex gap='xs' w='100%' alignItems='flex-start'>
        <Flex>
          {isPinned || hasBadges ? (
            <Flex direction='row' justifyContent='space-between' w='100%'>
              {isPinned ? (
                <Flex direction='row' gap='xs'>
                  <IconPencil color='subdued' size='xs' />
                  <Text color='subdued' size='xs'>
                    {messages.pinned}
                  </Text>
                </Flex>
              ) : null}
              {hasBadges ? (
                <Text color='accent'>{messages.topSupporters}</Text>
              ) : null}
            </Flex>
          ) : null}
          <Flex direction='row' gap='s' alignItems='center'>
            <UserLink size='s' userId={userId} strength='strong' />
            <Flex direction='row' gap='xs' alignItems='center' h='100%'>
              <Timestamp time={new Date(createdAt)} />
              {trackTimestampS !== undefined ? (
                <>
                  <Text color='subdued' size='xs'>
                    •
                  </Text>

                  <TextLink size='xs' variant='active'>
                    {formatCommentTrackTimestamp(trackTimestampS)}
                  </TextLink>
                </>
              ) : null}
            </Flex>
          </Flex>
          <CommentText>{message}</CommentText>
        </Flex>

        {!hideActions ? (
          <>
            <Flex direction='row' gap='l' alignItems='center'>
              <Flex direction='row' alignItems='center' gap='xs'>
                <FavoriteButton
                  onPress={handleCommentReact}
                  isActive={reactionState}
                  wrapperStyle={{ height: 20, width: 20 }}
                />
                <Text color='default' size='s'>
                  {reactCount}
                </Text>
              </Flex>
              <PlainButton
                variant='subdued'
                onPress={() => {
                  setReplyingToComment?.(comment)
                }}
              >
                {messages.reply}
              </PlainButton>
              <CommentOverflowMenu comment={comment} />
            </Flex>
          </>
        ) : null}
      </Flex>
    </Flex>
  )
}
