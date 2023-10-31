import { FunctionComponent, ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { getEntryIdsForAllChampions } from '../functions/meta-analysis/getEntryIdsForAllChampions'
import { entries } from '../constants/entries'
import { entryTexts } from '../constants/entryTexts'
import { ChampionIds } from 'lol-constants'
import { entryIds } from '../constants/entryIds'
import { getEntryIdsForAllChampionsArr } from '../functions/meta-analysis/getEntryIdsForAllChampionsArr'
import { getEntryIdsByChampion } from '../functions/getEntryIdsByChampion'
import { arrToObj } from 'rift-js-utils/array'
import { getMissingChampEntryIds } from '../functions/meta-analysis/getMissingChampEntryIds'
import { getChampionJson } from '../helpers/getChampionJson'
import { searchTexts } from '../functions/meta-analysis/searchTexts'
import { flipObj } from 'rift-js-utils/object'
import { getBasicChampTexts } from '../functions/getBasicChampTexts'
import { basicChampTextsToSheetValues } from '../functions/basicChampTextsToSheetValues'

const champIds = Object.values(ChampionIds)

interface Props {
  
}

export const Test2: FunctionComponent<Props> = ({
  
}) => {
  const [temp, setTemp] = useState<ComponentChildren>()
  useEffect(() => {(async () => {
  //
  //
  //

  
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
