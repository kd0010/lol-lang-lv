import {
  ChampionEntryIds,
  GetEntryIdsByChampionOptions,
  getEntryIdsByChampion,
} from '../getEntryIdsByChampion'
import { ChampionIds } from 'lol-constants'

export function getEntryIdsForAllChampions(
  options?: GetEntryIdsByChampionOptions,
) {
  const product: {[champId: string]: ChampionEntryIds} = {}
  const champIds = Object.values(ChampionIds)

  for (const champId of champIds) {
    const entryIds = getEntryIdsByChampion(champId, options)
    product[champId] = entryIds
  }

  return product
}
