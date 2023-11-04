import { entries } from '../../constants/entries'
import { StringtableEntries } from '../../types/interfaces'

export function getAnnouncementTexts(): StringtableEntries {
  const texts: StringtableEntries = {}

  for (const entryId in entries) {
    if (!entryId.includes('announcement')) continue
    
    const text = entries[entryId]!
    texts[entryId] = text
  }

  return texts
}
