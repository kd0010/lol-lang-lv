export const literatureCharsRegex =     /[a-zA-Z\s\d'\.\-–—]+?/
export const nonLiteratureCharsRegex = /[^a-zA-Z\s\d'\.\-–—]+?/
export const letterCharsRegex =     /[a-zA-Z]+?/
export const nonLetterCharsRegex = /[^a-zA-Z]+?/
export const wordsRegex =           /[a-zA-Z]{2,}?/

export const htmlCharacterEntityRegex = /&[\w]+?;/
export const textInSquareBracketsRegex = /\[[\w\s\+\-]+?\]/

export const atVariableRegex = /@[\w\W]+?@/
export const percentIVariableRegex = /%i:[\w\W]+?%/
export const variableInDoubleCurlyBracketsRegex = /\{\{[\w\W]+?\}\}/
export const dollarSignVariableRegex = /\$[\w\W]+?\$/
export const calcTagWithContentsRegex = /<calc>[\w\W]+?<\/calc>/

export const getOpeningTagRegex = (tagName: string) => new RegExp(`<${tagName}[ >]{1}`)
