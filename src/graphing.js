import { findMinMax, toDate } from "./utils"
//import data1 from "./fl-data-test3.json" //1 свечa
//import data1 from "./fl-data-test2.json" //2 свечи
import data1 from "./fl-data-test.json" // 10 свечей
//import data1 from "./fl-data-test1.json" //30 свечей
//import data1 from "./fl-data-test4.json" //50 свечей
//import data1 from "./fl-data.json"  // 1001 свеча

const WIDTH = 1300 
const HEIGHT = 450
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const PADDING = 40
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const ROWS_COUNT = 10


export function graphing (canvas){
    const ctx = canvas.getContext('2d')
    canvas.style.width = WIDTH + 'px'
    canvas.style.height = HEIGHT + 'px'
     canvas.width = DPI_WIDTH
     canvas.height = DPI_HEIGHT
     const paddingY = 80
     const xWidth = DPI_WIDTH - paddingY
     let LENGTH = data1.data.o.length 
     let curPos = 0  
     
     let step = Math.round((xWidth/LENGTH))
     let padding = Math.round((step / 4))
     let widthCandle = 2 * padding
     
   let raf
   
   
  const proxy = new Proxy({}, {
    set(...arg){
       const result= Reflect.set(...arg)
       raf = requestAnimationFrame(paint)
       return result
    },
  })
 
 
   
  proxy.scroll = 0
  proxy.pr = 10
  
 
    document.addEventListener("wheel",function(e){
    e.preventDefault();
    if(e.deltaY < 0) {
       proxy.scroll +=10
      }
    else{
      proxy.scroll-=10
    } 
    },{passive: false})
   
       
   document.getElementById("canvas").addEventListener("mousemove", function (event) {
    const x = event.clientX; // получаем координату X мыши
    curPos = x 
    })
    
    function filterDate(datad,index1,index2){  
      datad.data.o = datad.data.o.slice(index1,index2)
      datad.data.h = datad.data.h.slice(index1,index2)
      datad.data.l = datad.data.l.slice(index1,index2)
      datad.data.c = datad.data.c.slice(index1,index2)
      datad.data.t = datad.data.t.slice(index1,index2)
      
      return datad
    }
        
    function compareDate(datad,index, length ,pr ){  //verno
      if(pr => 0 && pr <= 100){
  
          let len1 = index  
          let len2 = length - index -1
        
          let len1_1 = Math.round(len1 - (pr * len1)/100)
          let len2_1 = Math.round(len2 - (pr * len2)/100)
        
          let index1 = index - len1_1 
          let index2 = index + len2_1 
          
          if(index2 === index1+1){
             const res = filterDate(datad,index1,index2+1)
          }
          else if (index2===index1){
            const res = filterDate(datad,index1,index2+1)
          }
          else if (index2 < index1){
              const res = filterDate(datad,index2,index1+1)
          }
          else {
              const res = filterDate(datad,index1,index2+1)
          }
          
       }
    }
    
  function clear(){
      ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT)
  }
  
  function paint(){
    clear()
    if(proxy.scroll > 100 ) proxy.scroll = 100
    if (proxy.scroll < 0) proxy.scroll = 0

    
    const pos = Math.trunc(((curPos * 2 - paddingY)/step))

    const copiedData = structuredClone(data1)
    compareDate(copiedData, pos, LENGTH, proxy.scroll)
    //console.log(copiedData.data)
    console.log(proxy.scroll)
  
    const newLength = copiedData.data.o.length

    step = Math.round((xWidth/newLength))
    padding = Math.round((step / 4))
    widthCandle = 2 * padding

    const [yMin, yMax] =  findMinMax(copiedData)
    const yKof = ((yMax - yMin) / VIEW_HEIGHT)
    const yStep = Math.round(((yMax - yMin) / ROWS_COUNT))
    
    
    drawX(copiedData, newLength )
    drawY(yMin, yStep)
    draw(copiedData, newLength,yKof, yMin)
    }
   

   function drawY(yMin, yStep){
      const step = VIEW_HEIGHT / ROWS_COUNT
      ctx.beginPath()
      ctx.lineWidth = 2
      for (let i = 0 ; i < ROWS_COUNT; i++){
        ctx.strokeStyle = '#bbb'              
        ctx.font = 'normal 20px Helvetica, sans-serif'
        ctx.fillStyle = '#96a2aa'
        ctx.moveTo(0, VIEW_HEIGHT - step * i )
        ctx.fillText( yMin + i * yStep , 0  , VIEW_HEIGHT - step * i)
        } 
      ctx.stroke()
      ctx.closePath()
    }
   
   function drawX(copiedData, newLength){
    let stepValue = (newLength / ROWS_COUNT).toFixed() 
    if(stepValue == 0) stepValue = 1
    ctx.beginPath()
    ctx.font = 'normal 20px Helvetica, sans-serif'
    ctx.fillStyle = '#96a2aa'
    for (let i = 0, j = 1; i < newLength; i++, j += 2){
       if((i-1) % stepValue === 0){
        ctx.moveTo( paddingY +  widthCandle * j  - padding, DPI_HEIGHT - PADDING)
        const time = new Date(copiedData.data.t[i] * 1000)
        ctx.fillText( toDate(time), paddingY + j * widthCandle , DPI_HEIGHT - PADDING)
       }
    }
    ctx.stroke()
    ctx.closePath()
   }

    function draw(copiedData,newLength,yKof, yMin){
      for (let i = 0, j=1 ; i < newLength; i++ , j+=2){
        if(copiedData.data.o[i] <= copiedData.data.c[i]) {
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.strokeStyle= "green"
          ctx.moveTo( paddingY + j * widthCandle , VIEW_HEIGHT - ((copiedData.data.l[i] - yMin)/yKof))
          ctx.lineTo( paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.o[i] - yMin)/yKof))
          
          ctx.rect(paddingY + j * widthCandle - padding, VIEW_HEIGHT - ((copiedData.data.c[i] - yMin)/yKof), padding * 2, 
          (copiedData.data.c[i] - copiedData.data.o[i]) / yKof)
          ctx.fillStyle = 'green'
          ctx.fill()
          
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.c[i] - yMin)/yKof))
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.h[i] - yMin)/yKof))
           
          ctx.stroke()
          ctx.closePath()
          
        }
        else if(copiedData.data.o[i] > copiedData.data.c[i]){    
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.strokeStyle= "red" 
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.l[i] - yMin)/yKof))
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.c[i] - yMin)/yKof))

          ctx.rect(paddingY + j * widthCandle - padding,  VIEW_HEIGHT - ((copiedData.data.o[i] - yMin)/yKof), padding * 2, 
          (copiedData.data.o[i] - copiedData.data.c[i]) / yKof)
          ctx.fillStyle = 'red'
          ctx.fill()

          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.o[i] - yMin)/yKof))
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.h[i] - yMin)/yKof))

          ctx.stroke()
          ctx.closePath()
        }
      }
    }

    //paint()
}