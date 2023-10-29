import { ChampionId } from 'lol-constants'

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

  let lowercaseChampId = championId.toLowerCase()

  const abilities = ['P', 'Q', 'W', 'E', 'R'] as const
  const abilityParts: {[ability: string]: string} = {
    P: `_${lowercaseChampId}passive`,
    Q: `_${lowercaseChampId}q`,
    W: `_${lowercaseChampId}e`,
    E: `_${lowercaseChampId}w`,
    R: `_${lowercaseChampId}r`,
  }
  const skinPart = 'skin'
  const eternalsPart = 'stat_stone'

  for (const entryId of entryIds) {
    const entryIdParts = entryId.split('_')

    // abilities, eternals and tft use entryId string itself unlike other stuff
    let countedAsAbilityId = false
    let ability: typeof abilities[keyof typeof abilities]
    for (ability of abilities) {
      if (entryId.includes(abilityParts[ability]!)) {
        organized[ability].push(entryId)
        countedAsAbilityId = true
      }
    }
    if (countedAsAbilityId) continue

    if (entryId.includes(eternalsPart)) {
      organized.eternals.push(entryId)
    } else if (entryIdParts.includes(skinPart)) {
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
