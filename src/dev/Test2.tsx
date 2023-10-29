import { FunctionComponent, ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { getEntryIdsForChampions } from '../functions/meta-analysis/getEntryIdsForChampions'
import { getEntryIdsByChampion } from '../functions/getEntryIdsByChampion'
import { organizeChampionEntryIds } from '../functions/organizeChampionEntryIds'

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
  const entryIdsByChamp = getEntryIdsForChampions({ignoreTftIds: true})
  console.log(entryIdsByChamp) // TEMP


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
