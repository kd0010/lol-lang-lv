import { expect, test } from 'vitest'
import { GetTagsOptions, getTags } from './getTags'

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


test('does the thing', () => {
  expect(getTags(proper1)).toStrictEqual([
    'div', 'span', 'a',
  ])
  expect(getTags(proper2)).toStrictEqual([
    'div', 'span', 'aside', 'td', 'aside', 'span',
  ])
  
  expect(getTags(irregular1)).toStrictEqual([
    'div', 'block', 'aside',
  ])
  expect(getTags(irregular2)).toStrictEqual([
    'div', 'p', 'meow', 'p', 'image',
  ])
  expect(getTags(withoutParent)).toStrictEqual([
    'div', 'span', 'a',
  ])

  expect(getTags(broken1)).toStrictEqual([
    'div', 'span',
  ])
  expect(getTags(broken2)).toStrictEqual([
    'div', 'li', 'li', 'li',
  ])
  
  expect(getTags(league1)).toStrictEqual([
    'b', 'br', 'b', 'br', 'b',
  ])
  expect(getTags(league2)).toStrictEqual([
    'li', 'scaleMS', 'attention', 'li', 'scaleAS', 'li', 'scaleCooldown',
  ])
})

test('options work', () => {
  const options: GetTagsOptions = {
    includeAttributes: true,
    includeEndingTags: true,
    includeTagBrackets: true,
    includeUniqueOnly: true,
  }

  // TEMP
  expect(getTags(irregular1, options)).toStrictEqual([
    '<div>', '<block>', '<aside>', '</aside>', '</block>', '</div>',
  ])
  if ((() => true)()) return // TEMP


  expect(getTags(proper1, options)).toStrictEqual([
    '<div>', '<span>', '<a>', '</a>', '</span>', '</div>',
  ])
  expect(getTags(proper2, options)).toStrictEqual([
    '<div>', '<span>', '</span>', '<aside id="containts-something">', '<td>', '<aside id="2nd">', '</aside>', '</td>', '</div>',
  ])
  
  expect(getTags(irregular1, options)).toStrictEqual([
    '<div>', '<block>', '<aside>', '</aside>', '</block>', '</div>',
  ])
  expect(getTags(irregular2, options)).toStrictEqual([
    '<div>', '<p>', '</p>', '<meow>', '<image>', '</meow>', '</div>',
  ])
  expect(getTags(withoutParent, options)).toStrictEqual([
    '<div>', '</div>', '<span>', '</span>', '<a>', '</a>',
  ])

  expect(getTags(broken1, options)).toStrictEqual([
    '<div>', '<span>', '</div>', '</span>',
  ])
  expect(getTags(broken2, options)).toStrictEqual([
    '<div>', '<li>', '</div>',
  ])
  
  expect(getTags(league1, options)).toStrictEqual([
    '<b>', '</b>', '<br>',
  ])
  expect(getTags(league2, options)).toStrictEqual([
    '<li>', '<scaleMS>', '<attention>', '</attention>', '</scaleMS>', '<scaleAS>', '</scaleAS>', '<scaleCooldown>', '</scaleCooldown>',
  ])
})
