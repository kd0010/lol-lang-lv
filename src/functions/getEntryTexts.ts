import { entries } from '../constants/entries'
import { main_en_gb } from '../constants/main_en_gb'

const local: {
  entryTexts: string[] | undefined
  entryTextsWithTags: string[] | undefined
  entryTextsWithoutTags: string[] | undefined
  entriesWithTags: {[entryId: string]: string} | undefined
} = {
  entryTexts: undefined,
  entryTextsWithTags: undefined,
  entryTextsWithoutTags: undefined,
  entriesWithTags: undefined,
}

export function getEntryTexts(): string[] {
  return local.entryTexts ?? (local.entryTexts = Object.values(main_en_gb.entries))
}

export function getEntryTextsWithTags(): string[] {
  return local.entryTextsWithTags ?? (local.entryTextsWithTags = Object.values(main_en_gb.entries).filter(text => text.indexOf('<') != -1 && text.indexOf('>') != -1))
}

export function getEntryTextsWithoutTags(): string[] {
  return local.entryTextsWithoutTags ?? (local.entryTextsWithoutTags = Object.values(main_en_gb.entries).filter(text => text.indexOf('<') == -1 || text.indexOf('>') == -1))
}

export function getEntriesWithTags(): {[entryId: string]: string} {
  return local.entriesWithTags ?? (local.entriesWithTags = Object.fromEntries(Object.entries(entries).filter(([_, text]) => text.indexOf('<') != -1 && text.indexOf('>') != -1)))
}
