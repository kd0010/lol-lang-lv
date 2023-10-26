export interface Stringtable {
  RMAG: string
  version: string
  entries: StringtableEntries
}

export interface StringtableEntries {
  [entryId: string]: string
}

export interface AnalyzedText {
  text: string
  occurances: number
  occursInIds: string[]
}

export interface AnalyzedTexts {
  [text: string]: AnalyzedText
}
