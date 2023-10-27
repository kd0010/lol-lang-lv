import { expect, test } from 'vitest'
import { getClosingTagIndex } from './getClosingTagIndex'

test('does the thing', () => {
  //                    |0123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789
  const proper1 =       '<div>   <div>  <div></div>  </div>   </div>'
  const proper2 =       '<div> <div></div>   <div id="containts-something"> <div></div> <span></span> </div>   </div>'
  
  //                    |0123456789-123456789-123456789-123456789-123456789-123456789-123456789
  const irregular1 =    '<div> 1+1 > 0  <div> 0 < 3 <div></div> this<->that </div>   </div>'
  const withoutParent = '<div></div> <div></div> <div></div>'

  //                    |0123456789-123456789-123456789-123456789-123456789-123456789-123456789
  const broken1 =       '<div><span></div></span>'
  const broken2 =       '<div> <li>hi <li>hey <li>hyd </div>'
  const broken3 =       '<div> <li>hi</li> <li>hey <li>hyd </div>'

  const leagueSimple = `<titleLeft>[@Hotkey@]&nbsp;Lamb's Respite</titleLeft><titleRight>@Cooldown@s %i:cooldown%</titleRight><subtitleLeft>@SpellTags@</subtitleLeft><subtitleRight>@Cost@ @AbilityResourceName@</subtitleRight><mainText>Kindred blesses the ground for @Effect2Amount@ seconds, allowing no unit, ally, enemy, or neutral to die while inside. Upon reaching 10% Health, units can't be damaged or healed while still inside the zone.<br><br>When the blessing ends, all units inside heal for <healing>@Effect1Amount@ Health</healing>.@SpellModifierDescriptionAppend@</mainText><postScriptTitle>Click or press [@LevelUpHotkey@] to level up</postScriptTitle><postScriptLeft>Healing<br>Cooldown</postScriptLeft><postScriptRight>@Effect1Amount@ -> @Effect1AmountNL@<br>@Cooldown@ -> @CooldownNL@</postScriptRight>`
  //                       |0123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789
  //                       |                                                                            76                                                                    146              163                           193
  const leagueThreeBTags = `<font color='#D4AF37'><b>%s</b></font><font color='#ffffff'> is a Team Pass </font><font color='#D4AF37'><b>SUPERFAN</b><font color='#ffffff'> of </font><b>%s!</b></font> <font color='#ffffff'></font>`
  const leagueFiveFontTags = leagueThreeBTags
  

  expect(getClosingTagIndex(proper1, 'div')).toBe(37)
  expect(getClosingTagIndex(proper1, 'div', 6)).toBe(28) // little early
  expect(getClosingTagIndex(proper1, 'div', 8)).toBe(28) // exact
  expect(getClosingTagIndex(proper1, 'div', 10)).toBe(20) // little late (takes next)
  expect(getClosingTagIndex(proper2, 'span')).toBe(69)
  expect(getClosingTagIndex(proper2, 'div', 6)).toBe(11)
  expect(getClosingTagIndex(proper2, 'div', 19)).toBe(77)

  expect(getClosingTagIndex(irregular1, 'div', 10)).toBe(51) // tageting second div
  expect(getClosingTagIndex(withoutParent, 'div', 0)).toBe(5)
  expect(getClosingTagIndex(withoutParent, 'div', 12)).toBe(17)
  expect(getClosingTagIndex(withoutParent, 'div', 13)).toBe(29) // very next one (index 13 jumps exactly 1)

  expect(getClosingTagIndex(broken1, 'div')).toBe(11)
  expect(getClosingTagIndex(broken1, 'span')).toBe(17)
  expect(getClosingTagIndex(broken2, 'li')).toBe(null)
  expect(getClosingTagIndex(broken2, 'li', 10)).toBe(null)
  expect(getClosingTagIndex(broken2, 'li', 20)).toBe(null)
  expect(getClosingTagIndex(broken3, 'li')).toBe(12)
  expect(getClosingTagIndex(broken3, 'li', 15)).toBe(null)
  expect(getClosingTagIndex(broken3, 'li', 25)).toBe(null)

  expect(getClosingTagIndex(leagueSimple, 'mainText')).toBe(549)
  expect(getClosingTagIndex(leagueThreeBTags, 'b')).toBe(27)
  expect(getClosingTagIndex(leagueThreeBTags, 'b', 27)).toBe(116)
  expect(getClosingTagIndex(leagueThreeBTags, 'b', 116)).toBe(159)
  expect(getClosingTagIndex(leagueFiveFontTags, 'font')).toBe(31)
  expect(getClosingTagIndex(leagueFiveFontTags, 'font', 31)).toBe(76)
  expect(getClosingTagIndex(leagueFiveFontTags, 'font', 76)).toBe(163)
  expect(getClosingTagIndex(leagueFiveFontTags, 'font', 115)).toBe(146)
  expect(getClosingTagIndex(leagueFiveFontTags, 'font', 163)).toBe(193)
})
