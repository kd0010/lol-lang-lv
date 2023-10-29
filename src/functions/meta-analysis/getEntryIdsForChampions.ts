import { GetEntryIdsByChampionOptions, getEntryIdsByChampion } from '../getEntryIdsByChampion'
import { ChampionIds } from 'lol-constants'

export function getEntryIdsForChampions(
  options?: GetEntryIdsByChampionOptions,
): {[championId: string]: string[]} {
  const product: {[championId: string]: string[]} = {}
  const champIds = Object.values(ChampionIds)

  for (const champId of champIds) {
    const entryIds = getEntryIdsByChampion(champId, options)
    product[champId] = entryIds
  }

  return product
}
