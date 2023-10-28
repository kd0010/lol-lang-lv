import { expect, test } from 'vitest'
import { getParentTag } from './getParentTag'

test('does the thing', () => {
  const proper1 = `_
<div>   <span>  <a></a>  </span>   </div>`
  const proper2 = `_
<div> <span></span>   <aside id="containts-something"> <td><aside id="2nd"></aside></td> <span></span> </aside>   </div>`
  
  const irregular1 = `_
<div> 1+1 > 0  <block> 0 < 3 <aside></aside> this<->that </block>   </div>`
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


  expect(getParentTag(proper1, 'div')).toBe(null)
  expect(getParentTag(proper1, 'span')).toBe('div')
  expect(getParentTag(proper1, 'span', 12)).toBe(null)
  expect(getParentTag(proper1, 'a')).toBe('span')
  expect(getParentTag(proper1, 'a', 19)).toBe(null)
  expect(getParentTag(proper1, 'LOL')).toBe(null)
  //
  expect(getParentTag(proper2, 'span')).toBe('div')
  expect(getParentTag(proper2, 'aside')).toBe('div')
  expect(getParentTag(proper2, 'aside', 25)).toBe('td')
  expect(getParentTag(proper2, 'td')).toBe('aside')
  expect(getParentTag(proper2, 'span', 25)).toBe('aside')

  expect(getParentTag(irregular1, 'div')).toBe(null)
  expect(getParentTag(irregular1, 'block', 10)).toBe('div')
  expect(getParentTag(irregular1, 'aside')).toBe('block')
  //
  expect(getParentTag(irregular2, 'p')).toBe('div')
  expect(getParentTag(irregular2, 'p', 17)).toBe('meow')
  expect(getParentTag(irregular2, 'image')).toBe('p')
  expect(getParentTag(irregular2, 'meow')).toBe('div')
  //
  expect(getParentTag(withoutParent, 'div')).toBe(null)
  expect(getParentTag(withoutParent, 'span')).toBe(null)
  expect(getParentTag(withoutParent, 'a')).toBe(null)

  expect(getParentTag(broken1, 'div')).toBe(null)
  expect(getParentTag(broken1, 'span')).toBe(null)
  //
  expect(getParentTag(broken2, 'li')).toBe('div')
  expect(getParentTag(broken2, 'div')).toBe(null)

  expect(getParentTag(league1, 'b')).toBe(null)
  expect(getParentTag(league1, 'b', 102)).toBe(null)
  expect(getParentTag(league1, 'b', 220)).toBe(null)
  expect(getParentTag(league1, 'br')).toBe(null)
  //
  expect(getParentTag(league2, 'scaleMS')).toBe(null)
  expect(getParentTag(league2, 'scaleCooldown')).toBe(null)
  expect(getParentTag(league2, 'attention')).toBe('scaleMS')
  expect(getParentTag(league2, 'scaleAS')).toBe(null)
  expect(getParentTag(league2, 'li')).toBe(null)
})
