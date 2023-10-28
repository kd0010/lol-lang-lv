import { expect, test } from 'vitest'
import { getNextTag } from './getNextTag'

test('does the thing', () => {
  const proper1 = `_
<div>   <span>  <a></a>  </span>   </div>`
  const proper2 = `_
<div> <span></span>   <aside id="containts-something"> <div></div> <span></span> </aside>   </div>`
  
  const irregular1 = `_
<div> 1+1 > 0  <div> 0 < 3 <aside></aside> this<->that </div>   </div>`
  const irregular2 = `_
<div> <p>one</p> <p>oh, a fish! <><  and another!! ><>  <image>  brrrr <><><><><><<<<>>>>  </p> </div>`
  const withoutParent = `_
<div></div> <span></span> <a></a>`

  const broken1 = `_
<div><span></div></span>`
  const broken2 = `_
<div> <li>hi <li>hey <li>hyd </div>`

  const league1 = `_
<b>*</b>  You can unlock the camera by pressing the Y key or by clicking the Lock button in the bottom right of your screen.<br><b>*</b>  When the camera is unlocked, you can pan by moving your mouse to the edge of the screen.<br><b>*</b>  Pressing the space bar will center the camera on your champion.`
  const league2 = `_
<li><scaleMS>%i:scaleMS% Movement Speed: %i:rangedActive% @f13@</scaleMS><li><scaleAS>%i:scaleAS% Attack Speed:  %i:rangedActive% @f14@%</scaleAS><li><scaleCooldown>%i:scaleCooldown% Ability Haste: %i:rangedActive% @f15@</scaleCooldown>`


  expect(getNextTag(proper1, 1)).toBe('div') // just before
  expect(getNextTag(proper1, 2)).toBe('div') // exact
  expect(getNextTag(proper1, 3)).toBe('span') // just after
  //
  expect(getNextTag(proper1, 10)).toBe('span')
  expect(getNextTag(proper1, 11)).toBe('a')
  //
  expect(getNextTag(proper1, 18)).toBe('a')
  expect(getNextTag(proper1, 19)).toBe(null)

  expect(getNextTag(proper2, 8)).toBe('span')
  expect(getNextTag(proper2, 9)).toBe('aside')
  expect(getNextTag(proper2, 21)).toBe('aside')
  expect(getNextTag(proper2, 24)).toBe('aside')
  expect(getNextTag(proper2, 69)).toBe('span')
  expect(getNextTag(proper2, 70)).toBe(null)

  expect(getNextTag(irregular1)).toBe('div')
  expect(getNextTag(irregular1, 17)).toBe('div')
  expect(getNextTag(irregular1, 18)).toBe('aside')
  expect(getNextTag(irregular1, 29)).toBe('aside')
  expect(getNextTag(irregular1, 30)).toBe(null)
  //
  expect(getNextTag(irregular2, 7)).toBe('p')
  expect(getNextTag(irregular2, 21)).toBe('image')
  //
  expect(getNextTag(withoutParent, 0)).toBe('div')
  expect(getNextTag(withoutParent, 2)).toBe('div')
  expect(getNextTag(withoutParent, 3)).toBe('span')
  expect(getNextTag(withoutParent, 14)).toBe('span')
  expect(getNextTag(withoutParent, 15)).toBe('a')
  expect(getNextTag(withoutParent, 28)).toBe('a')
  expect(getNextTag(withoutParent, 29)).toBe(null)

  expect(getNextTag(broken1, 2)).toBe('div')
  expect(getNextTag(broken1, 3)).toBe('span')
  expect(getNextTag(broken1, 7)).toBe('span')
  expect(getNextTag(broken1, 8)).toBe(null)
  //
  expect(getNextTag(broken2, 2)).toBe('div')
  expect(getNextTag(broken2, 3)).toBe('li')
  expect(getNextTag(broken2, 23)).toBe('li')
  expect(getNextTag(broken2, 24)).toBe(null)

  expect(getNextTag(league1, 45)).toBe('br')
  expect(getNextTag(league1, 136)).toBe('br')
  expect(getNextTag(league1, 229)).toBe('b')
  //
  expect(getNextTag(league2, 36)).toBe('li')
  expect(getNextTag(league2, 114)).toBe('li')
  expect(getNextTag(league2, 149)).toBe('scaleCooldown')
})
