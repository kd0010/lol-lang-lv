import { ComponentChildren, FunctionComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { repeatingTexts1 } from './repeatingTexts1'
import { repeatingTexts2 } from './repeatingTexts2'
import { repeatingTexts3 } from './repeatingTexts3'
import { filterTranslateableTexts } from '../functions/the-real-guns/filterTranslateableTexts'
import { analyzedTextsToEntries } from '../functions/analyzedTextToEntries'
import { getRepeatingTextsThroughTags } from '../functions/the-real-guns/getRepeatingTextsThroughTags'
import { entriesWithTags } from '../constants/entriesWithTags'
import { replaceAccountedForTexts } from '../functions/meta-analysis/replaceAccountedForTexts'
import { flipStringObject } from '../helpers/flipStringObject'
import { repeatingTexts4 } from './repeatingTexts4'
import { getEntryUniqueTags } from '../functions/meta-analysis/getEntryUniqueTags'
import { getUniqueTextsThroughTags } from '../functions/the-real-guns/getUniqueTextsThroughTags'
import { uniqueTexts1 } from './uniqueTexts1'

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
  // const repeatingTexts2 = getRepeatingTextsThroughTags(analyzedTextsToEntries(repeatingTexts1))

  // console.log('repeatingTexts1', repeatingTexts1) // TEMP
  // console.log('repeatingTexts2', repeatingTexts2) // TEMP
  // console.log('repeatingTexts3', repeatingTexts3) // TEMP
  // console.log('repeatingTexts4', repeatingTexts4) // TEMP


  const [tltableRepeatingTexts1] = filterTranslateableTexts(repeatingTexts1, {filterTftTexts: true})
  const [tltableRepeatingTexts2] = filterTranslateableTexts(repeatingTexts2, {filterTftTexts: true})

  console.log({
    tlatableRepeatingTexts1: Object.keys(tltableRepeatingTexts1).length,
    tlatableRepeatingTexts2: Object.keys(tltableRepeatingTexts2).length,
  }) // TEMP

  console.log('tlatableRepeatingTexts1', tltableRepeatingTexts1) // TEMP
  console.log('tlatableRepeatingTexts2', tltableRepeatingTexts2) // TEMP




  // const uniqueTexts1 = getUniqueTextsThroughTags(entriesWithTags, 1)

  // console.log('uniqueTexts1', uniqueTexts1) // TEMP


  const [tltableUniqueTexts1] = filterTranslateableTexts(uniqueTexts1, {filterTftTexts: true})

  console.log({
    tlatableUniqueTexts1: Object.keys(tltableUniqueTexts1).length,
  }) // TEMP

  console.log('tltableUniqueTexts1', tltableUniqueTexts1) // TEMP


  const modifiedTltableUniqueTexts1 = Object.fromEntries(Object.entries(tltableUniqueTexts1).filter(([text, {occurances}]) => !(text in tltableRepeatingTexts1) && !(text in tltableRepeatingTexts2) && occurances > 1))

  console.log({
    modifiedTltableUniqueTexts1: Object.keys(modifiedTltableUniqueTexts1).length,
  }) // TEMP

  console.log('modifiedTltableUniqueTexts1', modifiedTltableUniqueTexts1) // TEMP



  let occurancesArrays = [
    Object.values(tltableRepeatingTexts1).map(({occurances}) => occurances),
    Object.values(tltableRepeatingTexts2).map(({occurances}) => occurances),
    Object.values(modifiedTltableUniqueTexts1).map(({occurances}) => occurances),
  ]
  occurancesArrays.forEach(arr => arr.sort((a, b) => b - a))
  occurancesArrays = occurancesArrays.map(arr => [...new Set(arr)])
  console.log('occurancesArrays', occurancesArrays) // TEMP






  // const modifiedEntries = replaceAccountedForTexts(
  //   cleanUniqueTexts1,
  //   cleanUniqueTexts2,
  //   cleanUniqueTexts3,
  // )
  // console.log('modifiedEntries', modifiedEntries) // TEMP

  // const flipped = flipStringObject(modifiedEntries)
  // console.log('flipped', flipped) // TEMP

  // const [modifiedEntries2] = filterUniqueTexts(flipped)
  // console.log('modifiedEntries2', modifiedEntries2) // TEMP


  // const unaccountedTexts = getUnaccountedTexts(
  //   Object.keys(uniqueTextsLevel1),
  //   Object.keys(uniqueTextsLevel2),
  //   Object.keys(uniqueTextsLevel3),
  // )
  // console.log('unaccountedTexts', unaccountedTexts) // TEMP

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
