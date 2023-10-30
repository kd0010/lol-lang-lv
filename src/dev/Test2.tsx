import { FunctionComponent, ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { getEntryIdsForChampions } from '../functions/meta-analysis/getEntryIdsForChampions'
import { EntryIdAnalyzer, analyzeEntryIds } from '../functions/meta-analysis/EntryIdAnalyzer'

interface Props {
  
}

export const Test2: FunctionComponent<Props> = ({
  
}) => {
  const [temp, setTemp] = useState<ComponentChildren>()
  useEffect(() => {(async () => {
  //
  //
  //
  if ((() => true)()) return // TEMP

  const entryIdsByChamp = getEntryIdsForChampions({ignoreTftIds: false})
  console.log(entryIdsByChamp) // TEMP
  if ((() => true)()) return // TEMP

  // const formats = EntryIdAnalyzer.getAllPossibleChampionAbilityEntryIdFormats()
  // console.log('foramts', formats) // TEMP
  // if ((() => true)()) return // TEMP

  // analyzeEntryIds()
  // if ((() => true)()) return // TEMP





  // for (const entryId in entries) {
  //   const entryText: string = entries[entryId]!
  //   if (entryText.toLowerCase().indexOf('naafiri') != -1) {
  //     console.log(entryId) // TEMP
  //   }
  // }
  // for (const entryId in entries) {
  //   const entryText: string = entries[entryId]!
  //   if (entryText.indexOf('naafiri') != -1) {
  //     console.log(entryId) // TEMP
  //   }
  // }
  // if ((() => true)()) return // TEMP

  // analyzeEntryIds()
  



  
  // const aatroxEntryIds = getEntryIdsByChampion('Aatrox', {ignoreTftIds: false})
  // const organized = organizeChampionEntryIds('Aatrox', aatroxEntryIds)
  // console.log('organized', organized) // TEMP

  //
  //
  //
  })()}, [])

  return (
    <div>
      {temp}
    </div>
  )
}
