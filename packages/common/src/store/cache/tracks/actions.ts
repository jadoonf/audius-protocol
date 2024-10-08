import { ID, SquareSizes, TrackMetadata, WidthSizes } from '../../../models'
export const EDIT_TRACK = 'CACHE/TRACKS/EDIT_TRACK'
export const EDIT_TRACK_SUCCEEDED = 'CACHE/TRACKS/EDIT_TRACK_SUCCEEDED'
export const EDIT_TRACK_FAILED = 'CACHE/TRACKS/EDIT_TRACK_FAILED'

export const DELETE_TRACK = 'CACHE/TRACKS/DELETE_TRACK'
export const DELETE_TRACK_SUCCEEDED = 'CACHE/TRACKS/DELETE_TRACK_SUCCEEDED'
export const DELETE_TRACK_FAILED = 'CACHE/TRACKS/DELETE_TRACK_FAILED'

export const SET_PERMALINK = 'CACHE/TRACKS/SET_PERMALINK'

export const FETCH_COVER_ART = 'CACHE/TRACKS/FETCH_COVER_ART'
export const FETCH_STREAM_URLS = 'CACHE/TRACKS/FETCH_STREAM_URLS'
export const SET_STREAM_URLS = 'CACHE/TRACKS/SET_STREAM_URLS'

export function editTrack(trackId: ID, formFields: TrackMetadata) {
  return { type: EDIT_TRACK, trackId, formFields }
}

export function editTrackSucceeded() {
  return { type: EDIT_TRACK_SUCCEEDED }
}

export function editTrackFailed() {
  return { type: EDIT_TRACK_FAILED }
}

export function deleteTrack(trackId: ID) {
  return { type: DELETE_TRACK, trackId }
}

export function deleteTrackSucceeded(trackId: ID) {
  return { type: DELETE_TRACK_SUCCEEDED, trackId }
}

export function deleteTrackFailed() {
  return { type: DELETE_TRACK_FAILED }
}

export function setPermalink(permalink: string, trackId: ID) {
  return { type: SET_PERMALINK, permalink, trackId }
}

export function fetchCoverArt(trackId: ID, size: WidthSizes | SquareSizes) {
  return { type: FETCH_COVER_ART, trackId, size }
}

export function fetchStreamUrls(trackIds: ID[]) {
  return { type: FETCH_STREAM_URLS, trackIds }
}

// The value should only be undefined if the stream URL had an error
export function setStreamUrls(streamUrls: {
  [trackId: ID]: string | undefined
}) {
  return { type: SET_STREAM_URLS, streamUrls }
}
