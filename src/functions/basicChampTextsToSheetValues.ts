import { BasicChampTexts } from './getBasicChampTexts'

export function basicChampTextsToSheetValues(
  basicChampTexts: BasicChampTexts,
): string[][] {
  const values: string[][] = []

  values.push(['', ''])
  values.push([basicChampTexts.name, ''])
  values.push([basicChampTexts.title, ''])
  values.push(['', ''])
  values.push([basicChampTexts.p.name, ''])
  values.push([basicChampTexts.p.desc, ''])
  values.push(['', ''])
  values.push([basicChampTexts.q.name, ''])
  values.push([basicChampTexts.q.desc, ''])
  values.push(['', ''])
  values.push([basicChampTexts.w.name, ''])
  values.push([basicChampTexts.w.desc, ''])
  values.push(['', ''])
  values.push([basicChampTexts.e.name, ''])
  values.push([basicChampTexts.e.desc, ''])
  values.push(['', ''])
  values.push([basicChampTexts.r.name, ''])
  values.push([basicChampTexts.r.desc, ''])
  values.push(['', ''])
  basicChampTexts.skins.forEach(skinName => values.push([skinName, '']))

  return values
}
