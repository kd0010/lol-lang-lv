import { main_en_gb } from './main_en_gb'

export const entries = main_en_gb.entries
export const entryTexts = Object.values(main_en_gb.entries)
export const entryTextsWithTags = entryTexts.filter(text => text.indexOf('<') != -1 && text.indexOf('>') != -1)
