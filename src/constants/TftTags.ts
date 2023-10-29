export const TftTags = {
  'TFTBonus': 'TFTBonus',
  'TFTRadiantItemBonus': 'TFTRadiantItemBonus',
  'TFTKeyword': 'TFTKeyword',
  'tftitemrules': 'tftitemrules',
  'tftbold': 'tftbold',
  'TFTDebonairVIP': 'TFTDebonairVIP',
  'TFTShadowItemBonus': 'TFTShadowItemBonus',
  'tftstrong': 'tftstrong',
  'TFTShadowItemPenalty': 'TFTShadowItemPenalty',
  'TFTTrackerLabel': 'TFTTrackerLabel',
  'tftbonus': 'tftbonus',
  'TFTGuildActive': 'TFTGuildActive',
  'TFTHighlight': 'TFTHighlight',
  'tftActiveRank': 'tftActiveRank',
  'ShowIf.TFT9_ReaverKing_Frontline': 'ShowIf.TFT9_ReaverKing_Frontline',
  'ShowIfNot.TFT9_ReaverKing_Frontline': 'ShowIfNot.TFT9_ReaverKing_Frontline',
  'ShowIf.TFT9_Mistwalker_HealEnabled': 'ShowIf.TFT9_Mistwalker_HealEnabled',
  'ShowIf.TFT9_Mutant_Claws': 'ShowIf.TFT9_Mutant_Claws',
  'ShowIf.TFT9_Mutant_Spikes': 'ShowIf.TFT9_Mutant_Spikes',
  'ShowIf.TFT9_Mutant_Wings': 'ShowIf.TFT9_Mutant_Wings',
  'ShowIf.TFT9_Mutant_Carapace': 'ShowIf.TFT9_Mutant_Carapace',
} as const

export type TftTag = typeof TftTags[keyof typeof TftTags]

export function isTftTag(value: any): value is TftTag {
  return typeof value == 'string' && value in TftTags
}
