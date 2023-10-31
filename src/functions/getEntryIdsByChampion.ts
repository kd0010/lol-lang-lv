import { isTftEntryId, isTftEntryIdPart } from '../constants/TftEntryIdParts'
import { entries } from '../constants/entries'
import { ChampionId, getChampionNameById } from 'lol-constants'
import { getChampionJson } from '../helpers/getChampionJson'

export async function getEntryIdsByChampion(
  championId: ChampionId,
  {
    ignoreTftIds=false,
    includeGeneratedTipIds=false,
  }: GetEntryIdsByChampionOptions={},
) {
  throw 'fuck trying to organize by entry ids 💀💀☠️☠️☠️☠️☠️☠️'

  const entryIds: ChampionEntryIds = {
    name: [],
    title: [],
    p: [],
    q: [],
    w: [],
    e: [],
    r: [],
    otherAbilityIds: [],
    skins: [],
    eternals: [],
    tft: [],
    misc: [],
  }
  const lowercaseChampionId = championId.toLowerCase()
  const abilitiesBySlot = ['q', 'w', 'e', 'r'] as const

  for (let entryId in entries) {
    const entryText = entries[entryId]!

    const includesChampId = entryId.includes(lowercaseChampionId)

    if (false) {
      if (!entryId.includes(lowercaseChampionId)) continue
      if (!(
        entryId.includes(lowercaseChampionId) ||
        entryId.includes('bushwhack-type-stuff')
      )) continue
    }

    // ignore generated
    if (!includeGeneratedTipIds && entryId.includes('generatedtip_')) continue

    entryId = entryId.toLowerCase()
    const entryIdsParts = entryId.split('_')
    const champ = await getChampionJson(championId)

    // tft stuff
    if (entryIdsParts.some(isTftEntryIdPart)) {
      if (ignoreTftIds) continue
      
      if (isTftEntryId(entryId)) entryIds.tft.push(entryId)

      continue // if tft done, then entry done
    }

    if (entryText == getChampionNameById(championId)) {
      entryIds.name.push(entryId)
    } else if (entryText == champ.title) {
      entryIds.title.push(entryId)
    } else if (includesChampId && entryId.includes('skin')) {
      entryIds.skins.push(entryId)
    } else if (includesChampId && entryId.includes('stat_stone')) {
      entryIds.eternals.push(entryId)
    } else if (entryIdsParts.some(part => part == 'spell')) {
      // q, w, e, r
      let qwerAdded = false
      for (let spellSlot = 0; spellSlot < 4; spellSlot++) {
        const spellLetter = abilitiesBySlot[spellSlot]!
        const spell = champ.spells[spellSlot]
        if (spell == null) throw 'spell undefined ?!'

        const spellSt = 'spell_' + spell!.id.toLowerCase()
        if (entryId.includes(spellSt)) {
          entryIds[spellLetter].push(entryId)
          qwerAdded = true
          break
        }
      }
      if (qwerAdded) continue

      // passive
      if (
        entryId.includes(lowercaseChampionId + 'passive') ||
        entryId.includes(lowercaseChampionId + 'p')
      ) {
        entryIds.p.push(entryId)
      } else {
        if (false) entryIds.otherAbilityIds.push(entryId)
      }

      if (false) {
        const abilities = {
          p1: `${lowercaseChampionId}passive`,
          p2: `${lowercaseChampionId}p`,
          q: `${lowercaseChampionId}q`,
          w: `${lowercaseChampionId}w`,
          e: `${lowercaseChampionId}e`,
          r: `${lowercaseChampionId}r`,
        }
        if (entryId.includes(abilities.q)) {
          entryIds.q.push(entryId)
        } else if (entryId.includes(abilities.w)) {
          entryIds.w.push(entryId)
        } else if (entryId.includes(abilities.e)) {
          entryIds.e.push(entryId)
        } else if (entryId.includes(abilities.r)) {
          entryIds.r.push(entryId)
        } else {
          // TEMP
          // entryIds.otherAbilityIds.push(entryId)
        }
      }
    } else {
      if (false) entryIds.misc.push(entryId)
    }
  }

  return entryIds
}

export interface GetEntryIdsByChampionOptions {
  ignoreTftIds?: boolean
  includeGeneratedTipIds?: boolean
}

export interface ChampionEntryIds {
  name: string[]
  title: string[]
  p: string[]
  q: string[]
  w: string[]
  e: string[]
  r: string[]
  otherAbilityIds: string[]
  skins: string[]
  eternals: string[]
  tft: string[]
  misc: string[]
}
