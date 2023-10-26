import { FunctionComponent } from 'preact'
import { useEffect } from 'preact/hooks'
import { repeatingTexts1 } from './repeatingTexts1'
import { repeatingTexts2 } from './repeatingTexts2'
import { repeatingTexts3 } from './repeatingTexts3'
import { uniqueTextsLevel1 } from './uniqueTextsLevel1'
import { uniqueTextsLevel2 } from './uniqueTextsLevel2'
import { uniqueTextsLevel3 } from './uniqueTextsLevel3'
import { filterUniqueTexts } from '../functions/the-real-guns/filterUniqueTexts'
import { analyzedTextsToEntries } from '../functions/analyzedTextToEntries'
import { getRepeatingTextsThroughTags } from '../functions/the-real-guns/getRepeatingTextsThroughTags'
import { entriesWithTags } from '../constants/entriesWithTags'
import { replaceAccountedForTexts } from '../functions/meta-analysis/replaceAccountedForTexts'
import { flipStringObject } from '../helpers/flipStringObject'

interface Props {
  
}

export const Test3: FunctionComponent<Props> = ({
  
}) => {
  useEffect(() => {(async () => {
  //
  //
  //

  // const repeatingTexts1 = getRepeatingTextsThroughTags(entriesWithTags)

  // const repeatingTexts2 = getRepeatingTextsThroughTags(analyzedTextsToEntries(repeatingTexts1))

  // const repeatingTexts3 = getRepeatingTextsThroughTags(analyzedTextsToEntries(repeatingTexts2))

  // const repeatingTexts4 = getRepeatingTextsThroughTags(analyzedTextsToEntries(repeatingTexts3))


  // console.log('repeatingTexts', repeatingTexts) // TEMP
  // console.log('repeatingTexts2', repeatingTexts2) // TEMP
  // console.log('repeatingTexts3', repeatingTexts3) // TEMP
  // console.log('repeatingTexts4', repeatingTexts4) // TEMP


  // console.log([
  //   Object.keys(repeatingTexts1).length,
  //   Object.keys(repeatingTexts2).length,
  //   Object.keys(repeatingTexts3).length,
  // ]) // TEMP

  // console.log([
  //   Object.keys(uniqueTextsLevel1).length,
  //   Object.keys(uniqueTextsLevel2).length,
  //   Object.keys(uniqueTextsLevel3).length,
  // ]) // TEMP

  // console.log('---') // TEMP

  // console.log([
  //   Object.keys(filterUniqueTexts(repeatingTexts1)).length,
  //   Object.keys(filterUniqueTexts(repeatingTexts2)).length,
  //   Object.keys(filterUniqueTexts(repeatingTexts3)).length,
  // ]) // TEMP

  // console.log([
  //   Object.keys(filterUniqueTexts(uniqueTextsLevel1)).length,
  //   Object.keys(filterUniqueTexts(uniqueTextsLevel2)).length,
  //   Object.keys(filterUniqueTexts(uniqueTextsLevel3)).length,
  // ]) // TEMP

  // console.log({
  //   repeatingTexts1: filterUniqueTexts(repeatingTexts1),
  //   repeatingTexts2: filterUniqueTexts(repeatingTexts2),
  //   repeatingTexts3: filterUniqueTexts(repeatingTexts3),
  // }) // TEMP





  // const uniqueTextsLevel1 = getUniqueTextsThroughTags(entryTextsWithTags, 1)
  // const uniqueTextsLevel2 = getUniqueTextsThroughTags(entryTextsWithTags, 2)
  // const uniqueTextsLevel3 = getUniqueTextsThroughTags(entryTextsWithTags, 3)

  // console.log('uniqueTextsLevel1', uniqueTextsLevel1) // TEMP
  // console.log('uniqueTextsLevel2', uniqueTextsLevel2) // TEMP
  // console.log('uniqueTextsLevel3', uniqueTextsLevel3) // TEMP


  // const one = filterUniqueTexts(uniqueTextsLevel1)
  // const two = filterUniqueTexts(uniqueTextsLevel2)
  // const thr = filterUniqueTexts(uniqueTextsLevel3)

  // console.log([
  //   one,
  //   two,
  //   thr,
  // ]) // TEMP

  // console.log([
  //   Object.keys(one).length,
  //   Object.keys(two).length,
  //   Object.keys(thr).length,
  // ]) // TEMP





  const [cleanUniqueTexts1] = filterUniqueTexts(repeatingTexts1)
  const [cleanUniqueTexts2] = filterUniqueTexts(repeatingTexts2)
  const [cleanUniqueTexts3] = filterUniqueTexts(repeatingTexts3)

  console.log([
    Object.keys(repeatingTexts1).length,
    Object.keys(cleanUniqueTexts1).length,
  ]) // TEMP

  const modifiedEntries = replaceAccountedForTexts(
    cleanUniqueTexts1,
    cleanUniqueTexts2,
    cleanUniqueTexts3,
  )
  console.log('modifiedEntries', modifiedEntries) // TEMP

  const flipped = flipStringObject(modifiedEntries)
  console.log('flipped', flipped) // TEMP

  const [modifiedEntries2] = filterUniqueTexts(flipped)
  console.log('modifiedEntries2', modifiedEntries2) // TEMP


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
    </div>
  )
}
