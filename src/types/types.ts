export interface MainStringtable {
  RMAG: string
  version: string
  entries: MainStringtableEntries
}

export interface MainStringtableEntries {
  [entryId: string]: string
}
