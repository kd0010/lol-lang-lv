import { ChampionIds } from 'lol-constants'
import { AbilityTexts, getBasicChampTexts } from '../getBasicChampTexts'
import { isTftEntryId } from '../../constants/TftEntryIdParts'
import { stripEntryText } from '../stripEntryText'
import { entries } from '../../constants/entries'

/**
 * Analyzes basic champ text presence in main stringtable.
 */
export async function analyzeBasicChampTexts() {
  let includeTftEntryIds = false
  let champKey: keyof typeof ChampionIds
  for (champKey in ChampionIds) {
    const champId = ChampionIds[champKey]
    const basicChampTexts = await getBasicChampTexts(champId)
    
    const analyzeAbilityTexts = (abilityTexts: AbilityTexts) => {
      let isNameIncluded = false
      let isDescIncluded = false
      for (const entryId in entries) {
        const entryText = entries[entryId]!
        if (!includeTftEntryIds && isTftEntryId(entryId)) continue

        if (stripEntryText(entryText).includes(stripEntryText(abilityTexts.name))) isNameIncluded = true
        if (stripEntryText(entryText).includes(stripEntryText(abilityTexts.desc))) isDescIncluded = true
      }
      if (!isNameIncluded) throw `name not found, ${champId}--basicChampText--${abilityTexts.name}`
      if (!isDescIncluded) throw `desc not found, ${champId}--basicChampText--${abilityTexts.desc}`
    }

    analyzeAbilityTexts(basicChampTexts.p)
    analyzeAbilityTexts(basicChampTexts.q)
    analyzeAbilityTexts(basicChampTexts.w)
    analyzeAbilityTexts(basicChampTexts.e)
    analyzeAbilityTexts(basicChampTexts.r)
  }

  console.log('done')
}
