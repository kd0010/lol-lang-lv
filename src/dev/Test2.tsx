import { FunctionComponent, ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { getEntryIdsForChampions } from '../functions/meta-analysis/getEntryIdsForChampions'
import { getEntryIdsByChampion } from '../functions/getEntryIdsByChampion'
import { organizeChampionEntryIds } from '../functions/organizeChampionEntryIds'
import { getTftEntryIdParts } from '../functions/meta-analysis/getTftEntryIdParts'
import { entries } from '../constants/entries'

interface Props {
  
}

export const Test2: FunctionComponent<Props> = ({
  
}) => {
  const [temp, setTemp] = useState<ComponentChildren>()
  useEffect(() => {(async () => {
  //
  //
  //

  // TEMP
  // for (const entryId in entries) {
  //   if (
  //     entryId.includes('companion') && !entryId.includes('chibi') ||
  //     !entryId.includes('companion') && entryId.includes('chibi')
  //   ) {
  //     console.log('entryId', entryId) // TEMP
  //   }
  // }
  // if ((() => true)()) return // TEMP

  // TEMP
  // const tft = getTftEntryIdParts()
  // console.log('tft', tft) // TEMP
  // if ((() => true)()) return // TEMP

  // TEMP
  const yo = getEntryIdsForChampions({ignoreTftIds: true})
  console.log(yo) // TEMP

  const aatroxEntryIds = getEntryIdsByChampion('Aatrox', {ignoreTftIds: false})
  const organized = organizeChampionEntryIds('Aatrox', aatroxEntryIds)
  console.log('organized', organized) // TEMP

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
