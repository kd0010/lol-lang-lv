import { entryTexts } from '../../constants/entryTexts'

/**
 * Returns relevant numbers for entries,
 * in order to have a perspective on how big the data is.
 */
export function analyzeEntries(): StringtableAnalysis {
  const totalEntryCount = entryTexts.length

  return {
    totalEntryCount,
  }
}

export interface StringtableAnalysis {
  totalEntryCount: number
}
