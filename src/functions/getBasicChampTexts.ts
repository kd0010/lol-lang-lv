import { ChampionId } from 'lol-constants'
import { getChampionJson } from '../helpers/getChampionJson'

/**
 * Does not return all texts that could ever be for a champion,
 * but returns the main ones: name, title, ability, skins.
 */
export async function getBasicChampTexts(
  championId: ChampionId,
): Promise<BasicChampTexts> {
  const champ = await getChampionJson(championId)
  
  if (
    champ.spells[0] == null ||
    champ.spells[1] == null ||
    champ.spells[2] == null ||
    champ.spells[3] == null
  ) throw 'undefined spell ?!'

  return {
    name: champ.name,
    title: champ.title,
    p: {
      name: champ.passive.name,
      desc: champ.passive.description,
    },
    q: {
      name: champ.spells[0]!.name,
      desc: champ.spells[0]!.tooltip,
    },
    w: {
      name: champ.spells[1]!.name,
      desc: champ.spells[1]!.tooltip,
    },
    e: {
      name: champ.spells[2]!.name,
      desc: champ.spells[2]!.tooltip,
    },
    r: {
      name: champ.spells[3]!.name,
      desc: champ.spells[3]!.tooltip,
    },
    skins: champ.skins.map(({ name }) => name),
  }
}

export interface BasicChampTexts {
  name: string
  title: string
  p: AbilityTexts
  q: AbilityTexts
  w: AbilityTexts
  e: AbilityTexts
  r: AbilityTexts
  skins: string[]
}

export interface AbilityTexts {
  name: string
  desc: string
}
