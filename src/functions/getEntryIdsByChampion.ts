import { isTftEntryIdPart } from '../constants/TftEntryIdParts'
import { entries } from '../constants/entries'
import { ChampionId, getChampionNameById } from 'lol-constants'
import { Champion } from 'lol-constants/assets'

export function getEntryIdsByChampion(
  championId: ChampionId,
  {
    ignoreTftIds=false,
    includeGeneratedTipIds=false,
  }: GetEntryIdsByChampionOptions={},
) {
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
  const abilities = {
    p1: `${lowercaseChampionId}passive`,
    p2: `${lowercaseChampionId}p`,
    q: `${lowercaseChampionId}q`,
    w: `${lowercaseChampionId}w`,
    e: `${lowercaseChampionId}e`,
    r: `${lowercaseChampionId}r`,
  }

  for (let entryId in entries) {
    if (!entryId.includes(lowercaseChampionId)) continue
    if (!includeGeneratedTipIds && entryId.includes('generatedtip_')) continue

    const entryText: string = entries[entryId]
    entryId = entryId.toLowerCase()
    const entryIdsParts = entryId.split('_')
    const champ = Champion.data[championId]
    Champion.data['Aatrox'].title

    // tft stuff
    if (entryIdsParts.some(isTftEntryIdPart)) {
      if (ignoreTftIds) continue
      
      if (
        (
          entryId.includes('tft') ||
          entryId.includes('companion') ||
          entryId.includes('chibi')
        ) && (
          !entryId.includes('yuumipcompanionshipbuff') // exception
        )
      ) {
        entryIds.tft.push(entryId)
      }

      continue // if tft done, then entry done
    }

    if (entryText == getChampionNameById(championId)) {
      entryIds.name.push(entryId)
    } else if (entryText == champ.title) {
      entryIds.title.push(entryId)
    } else if (entryIdsParts.some(part => part == 'spell')) {
      if (entryId.includes(abilities.p1) || entryId.includes(abilities.p2)) {
        entryIds.p.push(entryId)
      } else if (entryId.includes(abilities.q)) {
        entryIds.q.push(entryId)
      } else if (entryId.includes(abilities.w)) {
        entryIds.w.push(entryId)
      } else if (entryId.includes(abilities.e)) {
        entryIds.e.push(entryId)
      } else if (entryId.includes(abilities.r)) {
        entryIds.r.push(entryId)
      } else {
        entryIds.otherAbilityIds.push(entryId)
      }
    } else if (entryId.includes('skin')) {
      entryIds.skins.push(entryId)
    } else if (entryId.includes('stat_stone')) {
      entryIds.eternals.push(entryId)
    } else {
      entryIds.misc.push(entryId)
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
