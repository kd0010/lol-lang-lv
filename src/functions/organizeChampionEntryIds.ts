import { ChampionId } from 'lol-constants'
import {
  abilities,
  eternalsEntryIdPart,
  getAbilityEntryIdParts,
  skinEntryIdPart,
} from '../constants/championOrganizing'

export function organizeChampionEntryIds(
  championId: ChampionId,
  entryIds: string[],
): ChampionEntryIds {
  const organized: ChampionEntryIds = {
    P: [],
    Q: [],
    W: [],
    E: [],
    R: [],
    skins: [],
    eternals: [],
    tft: [],
    misc: [],
  }

  const abilityParts = getAbilityEntryIdParts(championId)

  for (const entryId of entryIds) {
    const entryIdParts = entryId.split('_')

    // abilities, eternals and tft use entryId string itself unlike other stuff
    let countedAsAbilityId = false
    for (const ability of abilities) {
      if (entryId.includes(abilityParts[ability])) {
        organized[ability].push(entryId)
        countedAsAbilityId = true
      }
    }
    if (countedAsAbilityId) continue

    if (entryId.includes(eternalsEntryIdPart)) {
      organized.eternals.push(entryId)
    } else if (entryIdParts.includes(skinEntryIdPart)) {
      organized.skins.push(entryId)
    } else if (
      (
        entryId.includes('tft') ||
        entryId.includes('companion') ||
        entryId.includes('chibi')
      ) && (
        !entryId.includes('yuumipcompanionshipbuff') // exception
      )
    ) {
      organized.tft.push(entryId)
    } else {
      organized.misc.push(entryId)
    }
  }

  return organized
}

export interface ChampionEntryIds {
  P: string[]
  Q: string[]
  W: string[]
  E: string[]
  R: string[]
  skins: string[]
  eternals: string[]
  tft: string[]
  misc: string[]
}
