export const SelfClosingTags = {
  'area': 'area',
  'base': 'base',
  'br': 'br',
  'col': 'col',
  'embed': 'embed',
  'hr': 'hr',
  'img': 'img',
  'input': 'input',
  'link': 'link',
  'meta': 'meta',
  'param': 'param',
  'source': 'source',
  'track': 'track',
  'wbr': 'wbr',
  'command': 'command',
  'keygen': 'keygen',
  'menuitem': 'menuitem',
  'frame': 'frame',
} as const

export type SelfClosingTag = typeof SelfClosingTags[keyof typeof SelfClosingTags]

export function isSelfClosingTag(value: any): value is SelfClosingTag {
  return typeof value == 'string' && value in SelfClosingTags
}
