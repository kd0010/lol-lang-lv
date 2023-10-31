import { ChampionIds, ChampionNames } from 'lol-constants'
import { entries } from '../../constants/entries'
import { GetEntryIdsByChampionOptions } from '../getEntryIdsByChampion'
import { isTftEntryId } from '../../constants/TftEntryIdParts'

export function getEntryIdsForAllChampionsArr(
  {
    ignoreTftIds=false,
    includeGeneratedTipIds=false,
  }: GetEntryIdsByChampionOptions={},
): string[] {
  let foundEntryIds: string[] = []

  for (const entryId in entries) {
    const entryText = entries[entryId]!

    if (ignoreTftIds && isTftEntryId(entryId)) continue
    if (!includeGeneratedTipIds && entryId.includes('generatedtip_')) continue

    let champKey: keyof typeof ChampionIds
    for (champKey in ChampionIds) {
      const champId = ChampionIds[champKey]
      const champName = ChampionNames[champKey]
      let lowercaseChampId = champId.toLowerCase()

      if (
        entryId.includes(lowercaseChampId) ||
        entryText.includes(champName)
      ) {
        foundEntryIds.push(entryId)
      }
    }
  }

  foundEntryIds = [...new Set(foundEntryIds)]
  return foundEntryIds
}
