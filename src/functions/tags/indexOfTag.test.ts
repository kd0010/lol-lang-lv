import { expect, test } from 'vitest'
import { IndexOfTagOptions, indexOfTag } from './indexOfTag'

test('does the thing', () => {
  const proper1 = `_
<div>   <span>  <a></a>  </span>   </div>`
  const proper2 = `_
<div> <span></span>   <aside id="containts-something"> <td><aside id="2nd"></aside></td> <span></span> </aside>   </div>`
  
  const irregular1 = `_
<div> 1+1 > 0  <div> 0 < 3 <aside></aside> this<->that </div>   </div>`
  const irregular2 = `_
<div> <p>one</p> <p>oh, a fish! <><  and another!! ><>  brrrr <><><><><><<<<>>>> <image>  </p> </div>`
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


  expect(indexOfTag(proper1, 'div')).toBe(2)
  expect(indexOfTag(proper1, 'div', 0)).toBe(2)
  expect(indexOfTag(proper1, 'span')).toBe(10)
  expect(indexOfTag(proper1, 'span', 9)).toBe(10)    // just before
  expect(indexOfTag(proper1, 'span', 10)).toBe(10)   // exact
  expect(indexOfTag(proper1, 'span', 11)).toBe(-1) // just after
  expect(indexOfTag(proper1, 'a')).toBe(18)
  expect(indexOfTag(proper1, 'a', 19)).toBe(-1)
  //
  expect(indexOfTag(proper2, 'aside')).toBe(24)
  expect(indexOfTag(proper2, 'aside', 33)).toBe(61)
  expect(indexOfTag(proper2, 'td')).toBe(57)

  expect(indexOfTag(irregular1, 'aside')).toBe(29)
  expect(indexOfTag(irregular1, 'div', 3)).toBe(17)
  //
  expect(indexOfTag(irregular2, 'p', 3)).toBe(8)
  expect(indexOfTag(irregular2, 'p', 9)).toBe(19)
  expect(indexOfTag(irregular2, 'image')).toBe(83)
  //
  expect(indexOfTag(withoutParent, 'span')).toBe(14)
  
  expect(indexOfTag(broken1, 'span')).toBe(7)
  //
  expect(indexOfTag(broken2, 'li', 10)).toBe(15)

  expect(indexOfTag(league1, 'br', 73)).toBe(126)
  expect(indexOfTag(league1, 'b', 73)).toBe(130)
  expect(indexOfTag(league1, 'b', 186)).toBe(232)
  //
  expect(indexOfTag(league2, 'scaleCooldown')).toBe(152)
  expect(indexOfTag(league2, 'scaleAS')).toBe(79)
  expect(indexOfTag(league2, 'scaleMS')).toBe(6)
})

test('findClosingTag', () => {
  const options: IndexOfTagOptions = {findClosingTag: true}
  

  const proper1 = `_
<div>   <span>  <a></a>  </span>   </div>`
  const proper2 = `_
<div> <span></span>   <aside id="containts-something"> <td><aside id="2nd"></aside></td> <span></span> </aside>   </div>`
  
  const irregular1 = `_
<div> 1+1 > 0  <div> 0 < 3 <aside></aside> this<->that </div>   </div>`
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


  expect(indexOfTag(proper1, 'div', 0, options)).toBe(37)
  expect(indexOfTag(proper1, 'span', 0, options)).toBe(27)
  expect(indexOfTag(proper1, 'span', 9, options)).toBe(27)
  expect(indexOfTag(proper1, 'span', 10, options)).toBe(27)
  expect(indexOfTag(proper1, 'span', 11, options)).toBe(27)
  expect(indexOfTag(proper1, 'a', 0, options)).toBe(21)
  expect(indexOfTag(proper1, 'a', 19, options)).toBe(21)
  //
  expect(indexOfTag(proper2, 'aside', 0, options)).toBe(77)
  expect(indexOfTag(proper2, 'aside', 33, options)).toBe(77)
  expect(indexOfTag(proper2, 'td', 0, options)).toBe(85)

  expect(indexOfTag(irregular1, 'aside', 0, options)).toBe(36)
  expect(indexOfTag(irregular1, 'div', 3, options)).toBe(57)
  //
  expect(indexOfTag(withoutParent, 'span', 0, options)).toBe(20)

  expect(indexOfTag(broken1, 'span', 0, options)).toBe(19)
  //
  expect(indexOfTag(broken2, 'li', 10, options)).toBe(-1)

  expect(indexOfTag(league1, 'br', 73, options)).toBe(-1)
  expect(indexOfTag(league1, 'b', 73, options)).toBe(134)
  expect(indexOfTag(league1, 'b', 186, options)).toBe(236)
  //
  expect(indexOfTag(league2, 'scaleCooldown', 0, options)).toBe(222)
  expect(indexOfTag(league2, 'scaleAS', 0, options)).toBe(138)
  expect(indexOfTag(league2, 'scaleMS', 0, options)).toBe(65)
})
