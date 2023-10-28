import { expect, test } from 'vitest'
import { lastIndexOfTag } from './lastIndexOfTag'
import { IndexOfTagOptions } from './indexOfTag'

test('does the thing', () => {
  const proper1 = `_
<div>   <span>  <a></a>  <span></span></span>  <div>heh</div>  </div>`
  const proper2 = `_
<div> <span></span>   <aside id="containts-something"> <td><aside id="2nd"></aside></td> <span></span> </aside>   </div>`
  
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


  expect(lastIndexOfTag(proper1, 'div')).toBe(49)
  expect(lastIndexOfTag(proper1, 'div', 10)).toBe(2)
  expect(lastIndexOfTag(proper1, 'span')).toBe(27)
  expect(lastIndexOfTag(proper1, 'span', 28)).toBe(27)  // just before
  expect(lastIndexOfTag(proper1, 'span', 27)).toBe(27)  // exact
  expect(lastIndexOfTag(proper1, 'span', 26)).toBe(10)  // just after
  expect(lastIndexOfTag(proper1, 'span', 9)).toBe(-1)
  expect(lastIndexOfTag(proper1, 'a')).toBe(18)
  expect(lastIndexOfTag(proper1, 'a', 17)).toBe(-1)
  //
  expect(lastIndexOfTag(proper2, 'aside')).toBe(61)
  expect(lastIndexOfTag(proper2, 'aside', 33)).toBe(24)
  expect(lastIndexOfTag(proper2, 'td')).toBe(57)
  expect(lastIndexOfTag(proper2, 'td', 57)).toBe(57)
  expect(lastIndexOfTag(proper2, 'td', 56)).toBe(-1)

  expect(lastIndexOfTag(irregular1, 'div')).toBe(17)
  expect(lastIndexOfTag(irregular1, 'div', 17)).toBe(17)
  expect(lastIndexOfTag(irregular1, 'div', 16)).toBe(2)
  expect(lastIndexOfTag(irregular1, 'div', 3)).toBe(2)
  //
  expect(lastIndexOfTag(irregular2, 'div')).toBe(2)
  expect(lastIndexOfTag(irregular2, 'p')).toBe(19)
  expect(lastIndexOfTag(irregular2, 'p', 15)).toBe(8)
  expect(lastIndexOfTag(irregular2, 'image')).toBe(58)
  //
  expect(lastIndexOfTag(withoutParent, 'span')).toBe(14)

  expect(lastIndexOfTag(broken1, 'span')).toBe(7)
  //
  expect(lastIndexOfTag(broken2, 'li')).toBe(23)
  expect(lastIndexOfTag(broken2, 'li', 10)).toBe(8)

  expect(lastIndexOfTag(league1, 'br')).toBe(228)
  expect(lastIndexOfTag(league1, 'br', 73)).toBe(-1)
  expect(lastIndexOfTag(league1, 'br', 155)).toBe(126)
  expect(lastIndexOfTag(league1, 'b', 73)).toBe(2)
  expect(lastIndexOfTag(league1, 'b', 186)).toBe(130)
  //
  expect(lastIndexOfTag(league2, 'scaleCooldown')).toBe(152)
  expect(lastIndexOfTag(league2, 'scaleAS')).toBe(79)
  expect(lastIndexOfTag(league2, 'scaleMS')).toBe(6)
})

test('findClosingTag', () => {
  const options: IndexOfTagOptions = {findClosingTag: true}


  const proper1 = `_
<div>   <span>  <a></a>  <span></span></span>  <div>heh</div>  </div>`
  const proper2 = `_
<div> <span></span>   <aside id="containts-something"> <td><aside id="2nd"></aside></td> <span></span> </aside>   </div>`
  
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


  expect(lastIndexOfTag(proper1, 'div', proper1.length, options)).toBe(65)
  expect(lastIndexOfTag(proper1, 'div', 10, options)).toBe(-1)
  expect(lastIndexOfTag(proper1, 'span', proper1.length, options)).toBe(40)
  expect(lastIndexOfTag(proper1, 'span', 34, options)).toBe(33) // just before
  expect(lastIndexOfTag(proper1, 'span', 33, options)).toBe(33) // exact
  expect(lastIndexOfTag(proper1, 'span', 32, options)).toBe(-1) // just after
  expect(lastIndexOfTag(proper1, 'span', 9, options)).toBe(-1)
  expect(lastIndexOfTag(proper1, 'a', proper1.length, options)).toBe(21)
  expect(lastIndexOfTag(proper1, 'a', 17, options)).toBe(-1)
  //
  expect(lastIndexOfTag(proper2, 'aside', proper2.length, options)).toBe(105)
  expect(lastIndexOfTag(proper2, 'aside', 87, options)).toBe(77)
  expect(lastIndexOfTag(proper2, 'td', proper2.length, options)).toBe(85)
  expect(lastIndexOfTag(proper2, 'td', 85, options)).toBe(85) // exact
  expect(lastIndexOfTag(proper2, 'td', 84, options)).toBe(-1)

  expect(lastIndexOfTag(irregular1, 'div', irregular1.length, options)).toBe(66)
  expect(lastIndexOfTag(irregular1, 'div', 57, options)).toBe(57)
  expect(lastIndexOfTag(irregular1, 'div', 56, options)).toBe(-1)
  expect(lastIndexOfTag(irregular1, 'div', 3, options)).toBe(-1)
  //
  expect(lastIndexOfTag(irregular2, 'div', irregular2.length, options)).toBe(98)
  expect(lastIndexOfTag(irregular2, 'div', 90, options)).toBe(-1)
  expect(lastIndexOfTag(irregular2, 'p', irregular2.length, options)).toBe(93)
  expect(lastIndexOfTag(irregular2, 'p', 90, options)).toBe(14)
  expect(lastIndexOfTag(irregular2, 'image', irregular2.length, options)).toBe(-1)
  //
  expect(lastIndexOfTag(withoutParent, 'span', withoutParent.length, options)).toBe(20)

  expect(lastIndexOfTag(broken1, 'span', broken1.length, options)).toBe(19)
  //
  expect(lastIndexOfTag(broken2, 'div', broken2.length, options)).toBe(31)
  expect(lastIndexOfTag(broken2, 'li', 10, options)).toBe(-1)

  expect(lastIndexOfTag(league1, 'br', league1.length, options)).toBe(-1)
  expect(lastIndexOfTag(league1, 'br', 73, options)).toBe(-1)
  expect(lastIndexOfTag(league1, 'br', 155, options)).toBe(-1)
  expect(lastIndexOfTag(league1, 'b', 73, options)).toBe(6)
  expect(lastIndexOfTag(league1, 'b', 186, options)).toBe(134)
  //
  expect(lastIndexOfTag(league2, 'scaleCooldown', league2.length, options)).toBe(222)
  expect(lastIndexOfTag(league2, 'scaleAS', league2.length, options)).toBe(138)
  expect(lastIndexOfTag(league2, 'scaleMS', league2.length, options)).toBe(65)
})
