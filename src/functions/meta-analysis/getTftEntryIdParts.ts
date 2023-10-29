import { entries } from '../../constants/entries'

export function getTftEntryIdParts(): string[] {
  let tftEntryIdParts: string[] = []
  const exceptions = {
    'yuumipcompanionshipbuff': 'yuumipcompanionshipbuff',
  }

  for (const entryId in entries) {
    const entryIdParts = entryId.split('_')
    if (entryIdParts.some(part => part in exceptions)) continue

    const tftParts = entryIdParts.filter(part => part.includes('tft') || part.includes('companion') || part.includes('chibi'))
    tftEntryIdParts.push(...tftParts)
  }

  tftEntryIdParts = [...new Set(tftEntryIdParts)]
  return tftEntryIdParts
}
