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
import { getRepeatingPhrases } from '../functions/the-real-guns/getRepeatingPhrases'

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

  const repeatingPhrases = getRepeatingPhrases()
  console.log('repeatingPhrases', repeatingPhrases) // TEMP
  
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
