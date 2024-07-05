import { useSearchCategory } from '../searchState'

import { AlbumResults } from './AlbumResults'
import { PlaylistResults } from './PlaylistResults'
import { ProfileResults } from './ProfileResults'
import { TrackResults } from './TrackResults'

export const SearchResults = () => {
  const [category] = useSearchCategory()

  switch (category) {
    case 'users':
      return <ProfileResults />
    case 'tracks':
      return <TrackResults />
    case 'albums':
      return <AlbumResults />
    case 'playlists':
      return <PlaylistResults />
  }

  return null
}
