import { entryTexts } from '../../constants/entryTexts'

/**
 * Returns relevant numbers for entries,
 * in order to have a perspective on how big the data is.
 */
export function analyzeEntries(): MainStringtableAnalysis {
  const totalEntryCount = entryTexts.length

  return {
    totalEntryCount,
  }
}

export interface MainStringtableAnalysis {
  totalEntryCount: number
}
