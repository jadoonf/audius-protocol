import React, { useCallback, useEffect, useRef, useState } from 'react'

import {
  CommentSectionProvider,
  useCurrentCommentSection
} from '@audius/common/context'
import type { Comment } from '@audius/sdk'
import {
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal
} from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Box, Divider, Flex, useTheme } from '@audius/harmony-native'
import { useDrawer } from 'app/hooks/useDrawer'

import { CommentDrawerForm } from './CommentDrawerForm'
import { CommentDrawerHeader } from './CommentDrawerHeader'
import { CommentSkeleton } from './CommentSkeleton'
import { CommentThread } from './CommentThread'
import { NoComments } from './NoComments'
import { useGestureEventsHandlers } from './useGestureEventHandlers'
import { useScrollEventsHandlers } from './useScrollEventHandlers'

const CommentDrawerContent = () => {
  const { comments, commentSectionLoading: isLoading } =
    useCurrentCommentSection()

  // Loading state
  if (isLoading) {
    return (
      <>
        <CommentSkeleton />
        <CommentSkeleton />
        <CommentSkeleton />
      </>
    )
  }

  // Empty state
  if (!comments || !comments.length) {
    return (
      <Flex p='l'>
        <NoComments />
      </Flex>
    )
  }

  return (
    <BottomSheetFlatList
      data={comments}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={<Box h='l' />}
      ListFooterComponent={<Box h='l' />}
      enableFooterMarginAdjustment
      scrollEventsHandlersHook={useScrollEventsHandlers}
      keyboardShouldPersistTaps='handled'
      renderItem={({ item }) => (
        <Box ph='l'>
          <CommentThread commentId={item.id} />
        </Box>
      )}
    />
  )
}

const BORDER_RADIUS = 40

export const CommentDrawer = () => {
  const { color } = useTheme()
  const insets = useSafeAreaInsets()

  const [replyingToComment, setReplyingToComment] = useState<Comment>()
  const [editingComment, setEditingComment] = useState<Comment>()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const {
    data: { entityId },
    isOpen,
    onClosed
  } = useDrawer('Comment')

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present()
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    onClosed()
  }, [onClosed])

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['66%', '100%']}
        topInset={insets.top}
        style={{
          borderTopRightRadius: BORDER_RADIUS,
          borderTopLeftRadius: BORDER_RADIUS,
          overflow: 'hidden'
        }}
        backgroundStyle={{ backgroundColor: color.background.white }}
        handleIndicatorStyle={{ backgroundColor: color.neutral.n200 }}
        gestureEventsHandlersHook={useGestureEventsHandlers}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior='close'
          />
        )}
        footerComponent={(props) => (
          <BottomSheetFooter {...props} bottomInset={insets.bottom}>
            <CommentSectionProvider
              entityId={entityId}
              replyingToComment={replyingToComment}
              setReplyingToComment={setReplyingToComment}
              editingComment={editingComment}
              setEditingComment={setEditingComment}
            >
              <CommentDrawerForm />
            </CommentSectionProvider>
          </BottomSheetFooter>
        )}
        onDismiss={handleClose}
      >
        <CommentSectionProvider
          entityId={entityId}
          replyingToComment={replyingToComment}
          setReplyingToComment={setReplyingToComment}
          editingComment={editingComment}
          setEditingComment={setEditingComment}
        >
          <CommentDrawerHeader bottomSheetModalRef={bottomSheetModalRef} />
          <Divider orientation='horizontal' />
          <CommentDrawerContent />
        </CommentSectionProvider>
      </BottomSheetModal>
      <Box
        style={{
          backgroundColor: color.background.white,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 5,
          height: insets.bottom
        }}
      />
    </>
  )
}
