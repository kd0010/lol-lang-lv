export const TftEntryIdParts = {
  'spelltft': 'spelltft',
  'tft8': 'tft8',
  'tft9': 'tft9',
  'tft': 'tft',
  'tfttutorial': 'tfttutorial',
  'tft7': 'tft7',
  'tft2': 'tft2',
  'tft6': 'tft6',
  'companion': 'companion',
  'tftcoins': 'tftcoins',
  'tft3': 'tft3',
  'tft4': 'tft4',
  'tftavatar': 'tftavatar',
  'tft5': 'tft5',
  'tftmapskins': 'tftmapskins',
  'tft7b': 'tft7b',
  'tftm': 'tftm',
  'tftdebug': 'tftdebug',
  'chibikaisa': 'chibikaisa',
  'chibized': 'chibized',
  'chibiaatrox': 'chibiaatrox',
  'tftbattlepass': 'tftbattlepass',
  'tftteamplanner': 'tftteamplanner',
  'tft2samirawbasica': 'tft2samirawbasica',
  'tft4b': 'tft4b',
  'tftevent': 'tftevent',
  'chibiyasuo': 'chibiyasuo',
  'chibiteemo': 'chibiteemo',
  'chibileesin': 'chibileesin',
  'chibijinx': 'chibijinx',
  'chibilnyannie': 'chibilnyannie',
  'tft6b': 'tft6b',
  'tftmapskin': 'tftmapskin',
  'tft anniversary minigolem': 'tft anniversary minigolem',
  'chibilux': 'chibilux',
  'tft3sylashilt': 'tft3sylashilt',
  'chibigwen': 'chibigwen',
  'tft8b': 'tft8b',
  'tftturbo': 'tftturbo',
  'tft4shenfrontprong': 'tft4shenfrontprong',
  'chibipandaannie': 'chibipandaannie',
  'chibiahri': 'chibiahri',
  'chibivi': 'chibivi',
  'tftcoinsrefund': 'tftcoinsrefund',
  'tft3volibearqarmory': 'tft3volibearqarmory',
  'tftivernwdroprate': 'tftivernwdroprate',
  'tftpairs': 'tftpairs',
  'tft4xayahqstatechange': 'tft4xayahqstatechange',
  'chibiekko': 'chibiekko',
  'tft3gangplankwscalefrombottom': 'tft3gangplankwscalefrombottom',
  'chibiannie': 'chibiannie',
  'tft4luxeannouncement15': 'tft4luxeannouncement15',
  'tftcoinsspecialoffer': 'tftcoinsspecialoffer',
  'chibimalphite': 'chibimalphite',
  'tftchampion': 'tftchampion',
  'tft6961': 'tft6961',
  'tft5leonarcockpitglow': 'tft5leonarcockpitglow',
  'chibiashe': 'chibiashe',
  'tftfiorawprofileicon4234': 'tftfiorawprofileicon4234',
  'chibi': 'chibi',
  'tft4sionrcrackbase': 'tft4sionrcrackbase',
  'tftcoinsrefundmodal': 'tftcoinsrefundmodal',
  'tft2blitzcrankw1021': 'tft2blitzcrankw1021',
  'tft2evelynnqflashpillar': 'tft2evelynnqflashpillar',
  'chibistarguardianlux': 'chibistarguardianlux',
  'mapskintftractive': 'mapskintftractive',
  'tftjinxwbottomscan': 'tftjinxwbottomscan',
  'chibisglux': 'chibisglux',
  'tft4lissandrardis': 'tft4lissandrardis',
} as const

export type TftEntryIdPart = typeof TftEntryIdParts[keyof typeof TftEntryIdParts]

export function isTftEntryIdPart(value: any): value is TftEntryIdPart {
  return typeof value == 'string' && value in TftEntryIdParts
}

export function isTftEntryId(entryId: string): boolean {
  return (
    (
      entryId.includes('tft') ||
      entryId.includes('companion') ||
      entryId.includes('chibi')
    ) && (
      !entryId.includes('yuumipcompanionshipbuff') // exception
    )
  )
}
