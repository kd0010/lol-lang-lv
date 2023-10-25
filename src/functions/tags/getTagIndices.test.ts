import { expect, test } from 'vitest'
import { getTagIndices } from './getTagIndices'

test('does the thing', () => {
  //                    |0123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789-123456789
  //                    |0   4                                                                                                                           128 132                                                                                               230 234
  const threeBs =       `<b>*</b>  You can unlock the camera by pressing the Y key or by clicking the Lock button in the bottom right of your screen.<br><b>*</b>  When the camera is unlocked, you can pan by moving your mouse to the edge of the screen.<br><b>*</b>  Pressing the space bar will center the camera on your champion.`
  //                    |0                                                                        73                                                                       146
  const threeLis =      `<li><scaleMS>%i:scaleMS% Movement Speed: %i:rangedActive% @f13@</scaleMS><li><scaleAS>%i:scaleAS% Attack Speed:  %i:rangedActive% @f14@%</scaleAS><li><scaleCooldown>%i:scaleCooldown% Ability Haste: %i:rangedActive% @f15@</scaleCooldown>`


  expect(getTagIndices(threeBs, 'b')).toStrictEqual([[0, 4], [128, 132], [230, 234]])
  expect(getTagIndices(threeLis, 'li')).toStrictEqual([[0, null], [73, null], [146, null]])
})

test('ignores unintented use', () => {
  const empty = ''
  const text = 'blah blah blah'

  
  expect(getTagIndices(empty, 'div')).toStrictEqual([])
  expect(getTagIndices(text, 'div')).toStrictEqual([])
})
