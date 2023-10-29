import { isTftEntryIdPart } from '../constants/TftEntryIdParts'
import { entries } from '../constants/entries'
import { ChampionId } from 'lol-constants'

// TEMP all those generate_tip, stat_stone,
// skin_whatever have to be meta-analyzed and then through that
// the entry IDs have to be gotten, otherwise entryId.includes('vi')
// returns also viktor, some_kind_of_behaVIor for kogmaw etc.
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
