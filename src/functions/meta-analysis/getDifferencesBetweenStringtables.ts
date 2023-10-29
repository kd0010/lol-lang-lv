import { Stringtable } from '../../types/types'

export function getDifferencesBetweenStringtables(
  newStringtable: Stringtable,
  oldStringtable: Stringtable,
) {
  const newEntries: {[entryId: string]: string} = {}
  const changedEntries: {[entryId: string]: {new: string, old: string}} = {}

  for (const entryId in newStringtable.entries) {
    const newText = newStringtable.entries[entryId]!

    if (!(entryId in oldStringtable.entries)) {
      newEntries[entryId] = newText
    } else {
      const oldText = oldStringtable.entries[entryId]!
      if (newText == oldText) continue

      changedEntries[entryId] = {
        new: newText,
        old: oldText,
      }
    }
  }

  return {
    newEntries,
    changedEntries,
  }
}
