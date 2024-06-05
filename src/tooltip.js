import {css} from './utils'

const template=()=> `
  <div class="tooltip-title"> 1 </div>
  hhhhhhhhhhhhhhhhhhhhhhhhh
  <ul class="tooltip-list">
      
    </ul>
    `

export function tooltip (el){
    const clear = () => ( el.innerHTML = '' )
    return {
        show ( left,  top ){
          const {height, width} = el.getBoundingClientRect()
          console.log(width.height)
          clear()
          css(el,{
            display : 'block' , 
            top: (top - height) + 'px',
            left : (left+width / 2) + 'px'
          })
          el.insertAdjacentHTML('afterbegin',template())
        },
        hide (){
            css(el, {display : 'none' })
        }
    }
}