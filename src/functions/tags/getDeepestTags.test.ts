import { expect, test } from 'vitest'
import { DeepestTag, getDeepestTags } from './getDeepestTags'

test('does the thing', () => {
  //                    |0123456789-123456789-123456789-123456789-123456789-123456789-123456789
  const proper1 =       '<div>   <div>  <div></div>  </div>   </div>'
  const proper2 =       '<div> <li>hi</li> <li>hey</li> <li>hyd</li> </div>'
  
  //                    |0123456789-123456789-123456789-123456789-123456789-123456789-123456789
  const irregular1 =    '<div> 1+1 > 0  <div> 0 < 3 <div></div> this<->that </div>   </div>'
  const withoutParent = '<div></div> <div></div> <div></div>'

  //                    |0123456789-123456789-123456789-123456789-123456789-123456789-123456789
  const broken1 =       '<div><span></div></span>'
  const broken2 =       '<div> <li>hi <li>hey <li>hyd </div>'
  const broken3 =       '<div> <li>hi</li> <li>hey <li>hyd </div>'

  //                       |0123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789
  const leagueSimple =     `<titleLeft>[@Hotkey@]&nbsp;Lamb's Respite</titleLeft><titleRight>@Cooldown@s %i:cooldown%</titleRight><subtitleLeft>@SpellTags@</subtitleLeft><subtitleRight>@Cost@ @AbilityResourceName@</subtitleRight><mainText>Kindred blesses the ground for @Effect2Amount@ seconds, allowing no unit, ally, enemy, or neutral to die while inside. Upon reaching 10% Health, units can't be damaged or healed while still inside the zone.<br><br>When the blessing ends, all units inside heal for <healing>@Effect1Amount@ Health</healing>.@SpellModifierDescriptionAppend@</mainText><postScriptTitle>Click or press [@LevelUpHotkey@] to level up</postScriptTitle><postScriptLeft>Healing<br>Cooldown</postScriptLeft><postScriptRight>@Effect1Amount@ -> @Effect1AmountNL@<br>@Cooldown@ -> @CooldownNL@</postScriptRight>`
  //                       |0123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789
  //                       |                                                                            76                                                                    146              163                           193
  const leagueThreeBTags = `<font color='#D4AF37'><b>%s</b></font><font color='#ffffff'> is a Team Pass </font><font color='#D4AF37'><b>SUPERFAN</b><font color='#ffffff'> of </font><b>%s!</b></font> <font color='#ffffff'></font>`


  expect(getDeepestTags(proper1)).toStrictEqual([
    {tagName: 'div', openingTagIndex: 15, closingTagIndex: 20},
  ] satisfies DeepestTag[])
  expect(getDeepestTags(proper2)).toStrictEqual([
    {tagName: 'li', openingTagIndex: 6, closingTagIndex: 12},
    {tagName: 'li', openingTagIndex: 18, closingTagIndex: 25},
    {tagName: 'li', openingTagIndex: 31, closingTagIndex: 38},
  ] satisfies DeepestTag[])

  expect(getDeepestTags(irregular1)).toStrictEqual([
    {tagName: 'div', openingTagIndex: 27, closingTagIndex: 32},
  ] satisfies DeepestTag[])
  expect(getDeepestTags(withoutParent)).toStrictEqual([
    {tagName: 'div', openingTagIndex: 0, closingTagIndex: 5},
    {tagName: 'div', openingTagIndex: 12, closingTagIndex: 17},
    {tagName: 'div', openingTagIndex: 24, closingTagIndex: 29},
  ] satisfies DeepestTag[])
  
  expect(getDeepestTags(broken1)).toStrictEqual([
  ] satisfies DeepestTag[])
  expect(getDeepestTags(broken2)).toStrictEqual([
    {tagName: 'div', openingTagIndex: 0, closingTagIndex: 29},
  ] satisfies DeepestTag[])
  expect(getDeepestTags(broken3)).toStrictEqual([
    {tagName: 'li', openingTagIndex: 6, closingTagIndex: 12},
  ] satisfies DeepestTag[])

  expect(getDeepestTags(leagueSimple)).toStrictEqual([
    {tagName: 'titleLeft', openingTagIndex: 0, closingTagIndex: 41},
    {tagName: 'titleRight', openingTagIndex: 53, closingTagIndex: 89},
    {tagName: 'subtitleLeft', openingTagIndex: 102, closingTagIndex: 127},
    {tagName: 'subtitleRight', openingTagIndex: 142, closingTagIndex: 185},
    {tagName: 'healing', openingTagIndex: 475, closingTagIndex: 506},
    {tagName: 'postScriptTitle', openingTagIndex: 560, closingTagIndex: 621},
    {tagName: 'postScriptLeft', openingTagIndex: 639, closingTagIndex: 674},
    {tagName: 'postScriptRight', openingTagIndex: 691, closingTagIndex: 774},
  ] satisfies DeepestTag[])
  expect(getDeepestTags(leagueThreeBTags)).toStrictEqual([
    {tagName: 'font', openingTagIndex: 38, closingTagIndex: 76},
    {tagName: 'font', openingTagIndex: 120, closingTagIndex: 146},
    {tagName: 'font', openingTagIndex: 171, closingTagIndex: 193},
    {tagName: 'b', openingTagIndex: 22, closingTagIndex: 27},
    {tagName: 'b', openingTagIndex: 105, closingTagIndex: 116},
    {tagName: 'b', openingTagIndex: 153, closingTagIndex: 159},
  ] satisfies DeepestTag[])
})
