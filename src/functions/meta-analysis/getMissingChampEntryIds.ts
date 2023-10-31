import { ChampionIds } from 'lol-constants'
import { getEntryIdsByChampion } from '../getEntryIdsByChampion'
import { getEntryIdsForAllChampionsArr } from './getEntryIdsForAllChampionsArr'
import { arrToObj } from 'rift-js-utils/array'

/**
 * Tests function `getEntryIdsByChampion` by finding out
 * all missing entry IDs that weren't ever returned by it.
 */
export async function getMissingChampEntryIds() {
  const missing: string[] = []

  const allChampEntryIdsOrSo = getEntryIdsForAllChampionsArr({ignoreTftIds: true})
  const bunchOfChampEntryIds: string[] = []

  let champKey: keyof typeof ChampionIds
  for (champKey in ChampionIds) {
    const champId = ChampionIds[champKey]
    const champEntryIds = await getEntryIdsByChampion(champId, {ignoreTftIds: true})
    let sectionName: keyof typeof champEntryIds
    for (sectionName in champEntryIds) {
      let entryIds = champEntryIds[sectionName]
      bunchOfChampEntryIds.push(...entryIds)
    }
  }

  const allChampEntryIds2Obj = arrToObj(bunchOfChampEntryIds)
  for (const entryId of allChampEntryIdsOrSo) {
    if (!(entryId in allChampEntryIds2Obj)) missing.push(entryId)
  }

  return missing
}
