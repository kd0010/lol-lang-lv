import { ComponentChildren, FunctionComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { filterTranslateableTexts } from '../functions/the-real-guns/filterTranslateableTexts'
import { entriesWithTags } from '../constants/entriesWithTags'
import { getRepeatingTextsThroughTags } from '../functions/the-real-guns/getRepeatingTextsThroughTags'
import { getUniqueTextsThroughTags } from '../functions/the-real-guns/getUniqueTextsThroughTags'

interface Props {
  
}

export const Test1: FunctionComponent<Props> = ({
  
}) => {
  const [temp, setTemp] = useState<ComponentChildren>()
  useEffect(() => {(async () => {
  //
  //
  //

  const minOccurancesRepeatingTexts = 'TEMP'

  // 1.1. Repeating texts
  const repeatingTexts = getRepeatingTextsThroughTags(entriesWithTags)
  const [tltableRepeatingTexts] = filterTranslateableTexts(repeatingTexts, {filterTftTexts: true})

  // 1.2. Unique texts
  const htmlDepthLevel = 1
  const oneTagTexts = getUniqueTextsThroughTags(entriesWithTags, htmlDepthLevel)
  const [tltableOneTagTexts] = filterTranslateableTexts(oneTagTexts, {filterTftTexts: true})

  // remove gotten repeating texts in 1st step (remove duplicates)
  const adjustedTltableOneTagTexts = Object.fromEntries(Object.entries(tltableOneTagTexts).filter(([text, {occurances}]) => !(text in tltableRepeatingTexts) && occurances > 1))

  // 2.   The remaining texts

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
