import { ChampionId, ChampionJson } from 'lol-constants'

export async function getChampionJson(
  championId: ChampionId,
) {
  const json: ChampionJson = await import(`../constants/en_gb_champion/${championId}.json`)
  return json.data[championId]!
}
