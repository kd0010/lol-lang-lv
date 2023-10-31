import { ComponentChildren, FunctionComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { repeatingTexts1 } from './repeatingTexts1'
import { repeatingTexts2 } from './old_repeatingTexts2'
import { repeatingTexts3 } from './old_repeatingTexts3'
import { filterTranslateableTexts } from '../functions/the-real-guns/filterTranslateableTexts'
import { analyzedTextsToEntries } from '../functions/analyzedTextToEntries'
import { getRepeatingTextsThroughTags } from '../functions/the-real-guns/getRepeatingTextsThroughTags'
import { entriesWithTags } from '../constants/entriesWithTags'
import { replaceAccountedForTexts } from '../functions/meta-analysis/replaceAccountedForTexts'
import { repeatingTexts4 } from './old_repeatingTexts4'
import { getEntryUniqueTags } from '../functions/meta-analysis/getEntryUniqueTags'
import { getUniqueTextsThroughTags } from '../functions/the-real-guns/getUniqueTextsThroughTags'
import { uniqueTexts1 } from './uniqueTexts1'
import { getEntryIdsForAllChampions } from '../functions/meta-analysis/getEntryIdsForAllChampions'
import { arrToObj } from 'rift-js-utils/array'
import { organizeChampionEntryIds } from '../functions/organizeChampionEntryIds'
import { getEntryIdsByChampion } from '../functions/getEntryIdsByChampion'
import { Item } from 'lol-constants/assets'

interface Props {
  
}

export const Test3: FunctionComponent<Props> = ({
  
}) => {
  const [temp, setTemp] = useState<ComponentChildren>()
  useEffect(() => {(async () => {
  //
  //
  //

  // const repeatingTexts1 = getRepeatingTextsThroughTags(entriesWithTags)
  // console.log('repeatingTexts1', repeatingTexts1) // TEMP


  const [tltableRepeatingTexts1] = filterTranslateableTexts(repeatingTexts1, {filterTftTexts: true})
  // const [tltableRepeatingTexts2] = filterTranslateableTexts(repeatingTexts2, {filterTftTexts: true})

  // console.log({
  //   tlatableRepeatingTexts1: Object.keys(tltableRepeatingTexts1).length,
  //   // tlatableRepeatingTexts2: Object.keys(tltableRepeatingTexts2).length,
  // }) // TEMP

  // console.log('tlatableRepeatingTexts1', tltableRepeatingTexts1) // TEMP
  // console.log('tlatableRepeatingTexts2', tltableRepeatingTexts2) // TEMP




  // const uniqueTexts1 = getUniqueTextsThroughTags(entriesWithTags, 1)
  // console.log('uniqueTexts1', uniqueTexts1) // TEMP


  const [tltableUniqueTexts1] = filterTranslateableTexts(uniqueTexts1, {filterTftTexts: true})

  console.log({
    tlatableUniqueTexts1: Object.keys(tltableUniqueTexts1).length,
  }) // TEMP

  console.log('tltableUniqueTexts1', tltableUniqueTexts1) // TEMP


  const adjustedTltableUniqueTexts1 = Object.fromEntries(Object.entries(tltableUniqueTexts1).filter(([text, {occurances}]) => !(text in tltableRepeatingTexts1) && occurances > 1))

  console.log({
    adjustedTltableUniqueTexts1: Object.keys(adjustedTltableUniqueTexts1).length,
  }) // TEMP

  console.log('adjustedTltableUniqueTexts1', adjustedTltableUniqueTexts1) // TEMP


  const allRepeatingTexts = {
    ...tltableRepeatingTexts1,
    ...adjustedTltableUniqueTexts1,
  }

  console.log('allRepeatingTexts', Object.keys(allRepeatingTexts).length, allRepeatingTexts) // TEMP
  const allRepeatingTextsSortedByOccurances = Object.values(allRepeatingTexts).sort(({occurances: a}, {occurances: b}) => b - a)
  console.log('allRepeatingTextsSortedByOccurances', allRepeatingTextsSortedByOccurances) // TEMP
  



  
  // TEMP
  // let occurancesArrays = [
  //   Object.values(tltableRepeatingTexts1).map(({occurances}) => occurances),
  //   Object.values(tltableRepeatingTexts2).map(({occurances}) => occurances),
  //   Object.values(modifiedTltableUniqueTexts1).map(({occurances}) => occurances),
  // ]
  // occurancesArrays.forEach(arr => arr.sort((a, b) => b - a))
  // occurancesArrays = occurancesArrays.map(arr => [...new Set(arr)])
  // console.log('occurancesArrays', occurancesArrays) // TEMP
  




  
  // const entryIdsByChamp = getEntryIdsForChampions({ignoreTftIds: true})
  // const championEntryIds = arrToObj(Object.values(entryIdsByChamp).flat())
  // console.log('championEntryIds', championEntryIds) // TEMP
  
  
  // const unaccountedForTexts = replaceAccountedForTexts(
  //   tltableRepeatingTexts1,
  //   adjustedTltableUniqueTexts1,
  // )
  // console.log('unaccountedForTexts', unaccountedForTexts) // TEMP


  // const unaccountedForChampionTexts = Object.fromEntries(Object.entries(unaccountedForTexts).filter(([entryId]) => entryId in championEntryIds))
  // console.log('unaccountedForChampionTexts', unaccountedForChampionTexts) // TEMP

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
