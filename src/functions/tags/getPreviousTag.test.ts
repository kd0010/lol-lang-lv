import { expect, test } from 'vitest'
import { getPreviousTag } from './getPreviousTag'

test('does the thing', () => {
  const proper1 = `_
<div>   <span>  <a></a>  </span>   </div>`
  const proper2 = `_
<div> <span class="super-duper" id='one'>!@#?</span>   <aside id="containts-something"> <td><aside id="2nd"></aside></td> <span></span> </aside>   </div>`
  
  const irregular1 = `_
<div> 1+1 > 0  <block class="super-duper" id='one'> 0 < 3 <aside></aside> this<->that </block>   </div>`
  const irregular2 = `_
<div> <p>one</p> <meow><p>oh, a fish! <><  and another!! ><>  <image>  brrrr <><><><><><<<<>>>>  </p></meow> </div>`
  const withoutParent = `_
<div></div> <span></span> <a></a>`

  const broken1 = `_
<div><span></div></span>`
  const broken2 = `_
<div> <li>hi <li>hey <li>hyd </div>`

  const league1 = `_
<b>*</b>  You can unlock the camera by pressing the Y key or by clicking the Lock button in the bottom right of your screen.<br><b>*</b>  When the camera is unlocked, you can pan by moving your mouse to the edge of the screen.<br><b>*</b>  Pressing the space bar will center the camera on your champion.`
  const league2 = `_
<li><scaleMS>%i:scaleMS% <attention>Movement Speed</attention>: %i:rangedActive% @f13@</scaleMS><li><scaleAS>%i:scaleAS% Attack Speed:  %i:rangedActive% @f14@%</scaleAS><li><scaleCooldown>%i:scaleCooldown% Ability Haste: %i:rangedActive% @f15@</scaleCooldown>`


  expect(getPreviousTag(proper1, 0)).toBe(null)
  expect(getPreviousTag(proper1, 6)).toBe('div')
  expect(getPreviousTag(proper1, 14)).toBe('div')  // just before
  expect(getPreviousTag(proper1, 15)).toBe('span') // exact
  expect(getPreviousTag(proper1, 16)).toBe('span') // just after
  expect(getPreviousTag(proper1, 24)).toBe('a')
  expect(getPreviousTag(proper1, proper1.length)).toBe('a')
  expect(getPreviousTag(proper1)).toBe('a')
  //
  expect(getPreviousTag(proper2)).toBe('span')
  expect(getPreviousTag(proper2, 44)).toBe('span')
  expect(getPreviousTag(proper2, 28)).toBe('div')
  expect(getPreviousTag(proper2, 88)).toBe('aside')
  expect(getPreviousTag(proper2, 100)).toBe('td')
  expect(getPreviousTag(proper2, 122)).toBe('aside')
  expect(getPreviousTag(proper2, 129)).toBe('span')

  expect(getPreviousTag(irregular1)).toBe('aside')
  expect(getPreviousTag(irregular1, 58)).toBe('block')
  expect(getPreviousTag(irregular1, 14)).toBe('div')
  //
  expect(getPreviousTag(irregular2)).toBe('image')
  expect(getPreviousTag(irregular2, 10)).toBe('p')
  expect(getPreviousTag(irregular2, 6)).toBe('div')
  expect(getPreviousTag(irregular2, 43)).toBe('p')
  expect(getPreviousTag(irregular2, 24)).toBe('meow')
  //
  expect(getPreviousTag(withoutParent)).toBe('a')
  expect(getPreviousTag(withoutParent, 24)).toBe('span')
  expect(getPreviousTag(withoutParent, 10)).toBe('div')

  expect(getPreviousTag(broken1)).toBe('span')
  expect(getPreviousTag(broken1, 6)).toBe('div')
  //
  expect(getPreviousTag(broken2, 6)).toBe('div')
  expect(getPreviousTag(broken2)).toBe('li')
  
  expect(getPreviousTag(league1)).toBe('b')
  expect(getPreviousTag(league1, 231)).toBe('br')
  expect(getPreviousTag(league1, 220)).toBe('b')
  //
  expect(getPreviousTag(league2)).toBe('scaleCooldown')
  expect(getPreviousTag(league2, 23)).toBe('scaleMS')
  expect(getPreviousTag(league2, 43)).toBe('attention')
  expect(getPreviousTag(league2, 37)).toBe('attention')
})
