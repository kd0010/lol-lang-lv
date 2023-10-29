import { isTftEntryIdPart } from '../constants/TftEntryIdParts'
import { entries } from '../constants/entries'
import { ChampionId } from 'lol-constants'

export function getEntryIdsByChampion(
  championId: ChampionId,
  {
    ignoreTftIds=false,
  }: GetEntryIdsByChampionOptions={},
): string[] {
  const entryIds: string[] = []
  const lowercaseChampionId = championId.toLowerCase()

  for (let entryId in entries) {
    entryId = entryId.toLowerCase()
    if (entryId.includes(lowercaseChampionId)) {
      // ignore TFT IDs stuff
      if (ignoreTftIds) {
        const entryIdsParts = entryId.split('_')
        if (entryIdsParts.some(isTftEntryIdPart)) continue
      }

      entryIds.push(entryId)
    }
  }

  return entryIds
}

export interface GetEntryIdsByChampionOptions {
  ignoreTftIds?: boolean
}
