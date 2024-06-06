import {css} from './utils'

const template=(params)=> `
  <div class="tooltip-title"> Информация:  </div>
  <ul class="tooltip-list">
       <li> Максимальная цена: ${params[0]}</li>
       <li> Минимальная цена: ${params[1]}</li>
       <li> Цена открытия: ${params[2]}</li>
       <li> Цена закрытия: ${params[3]} </li>
       <li> Дата и время: ${params[4]} </li>
    </ul>
    `

export function tooltip (el) {
    const clear = () => ( el.innerHTML = '' )
    return {
        show ( left,  top, params ) {
          const {height, width} = el.getBoundingClientRect()
          clear()
          css(el, {
            display : 'block' , 
            top: (top - height) + 'px',
            left : (left+width / 2) + 'px',
          })
          el.insertAdjacentHTML('afterbegin',template(params))
        },
        hide () {
            css(el, {display : 'none' })
        }
    }
}