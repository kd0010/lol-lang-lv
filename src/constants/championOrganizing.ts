import { ChampionId } from 'lol-constants'

export const skinEntryIdPart = 'skin'
export const eternalsEntryIdPart = 'stat_stone'

export const abilities = ['P', 'Q', 'W', 'E', 'R'] as const
export const getAbilityEntryIdParts = (
  championId: ChampionId,
) => {
  let lowercaseChampId = championId.toLowerCase()
  return {
    P: `_${lowercaseChampId}passive`,
    Q: `_${lowercaseChampId}q`,
    W: `_${lowercaseChampId}e`,
    E: `_${lowercaseChampId}w`,
    R: `_${lowercaseChampId}r`,
  }
}
