import data1 from "./fl-data-test.json"
//import data1 from "./fl-data-test1.json"
//import data1 from "./fl-data.json"

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
  
  const LENGTH = data1.data.o.length   
   const [yMin, yMax] =  findMinMax(data1)
   const yKof = ((yMax - yMin) / VIEW_HEIGHT).toFixed(2)
   const yStep = ((yMax - yMin) / ROWS_COUNT).toFixed()
   
   const paddingY = 80
   const xWidth = DPI_WIDTH - paddingY
   const step = (xWidth/LENGTH).toFixed()
   const padding = (step / 4).toFixed()
   const widthCandle = 2 * padding
   
   draw()
   drawX()
   drawY()
   

   function drawY(){
      const step = VIEW_HEIGHT / ROWS_COUNT
      for (let i = 0 ; i < ROWS_COUNT; i++){
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle = '#bbb'              
        ctx.font = 'normal 20px Helvetica, sans-serif'
        ctx.fillStyle = '#96a2aa'
        ctx.moveTo(0, VIEW_HEIGHT - step * i )
        ctx.fillText( yMin + i * yStep , 0  , VIEW_HEIGHT - step * i)
        ctx.stroke()
        ctx.closePath()
        } 
    }
   
   function drawX(){
    const stepValue = (LENGTH / ROWS_COUNT).toFixed()
    ctx.beginPath()
    ctx.font = 'normal 20px Helvetica, sans-serif'
    ctx.fillStyle = '#96a2aa'
    for (let i = 0, j = 1; i < LENGTH; i++, j += 2){
       if((i-1) % stepValue === 0){
        ctx.moveTo( paddingY +  widthCandle * j  - padding, DPI_HEIGHT - PADDING)
        const time = new Date(data1.data.t[i] * 1000)
        ctx.fillText( toDate(time), paddingY + j * widthCandle - padding , DPI_HEIGHT - PADDING)
       }
    }
    ctx.stroke()
    ctx.closePath()
   }
   
    function findMinMax(data){
       
        let min = Math.min(...data.data.l)
        let max = Math.max(...data.data.h)
        
        return [ min , max]
    }
     
    function toDate(timestamp){
        const shortMonth=[
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      
        const date = new Date (timestamp)
        return `${shortMonth[date.getMonth()]} ${date.getDate()} ${date.getHours() + ":" + date.getMinutes() + "0"} `
      }

      function draw(){
        for (let i = 0, j=1 ; i < LENGTH; i++ , j+=2){
          if(data1.data.o[i] <= data1.data.c[i]) {
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.strokeStyle= "green"
          ctx.moveTo( paddingY + j * widthCandle , VIEW_HEIGHT - ((data1.data.l[i] - yMin)/yKof))
          ctx.lineTo( paddingY + j * widthCandle, VIEW_HEIGHT - ((data1.data.o[i] - yMin)/yKof))
          
          
          ctx.rect(paddingY + j * widthCandle - padding, VIEW_HEIGHT - ((data1.data.c[i] - yMin)/yKof), padding * 2, 
          (data1.data.c[i] - data1.data.o[i]) / yKof)
          ctx.fillStyle = 'green'
          ctx.fill()
          
          
          
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((data1.data.c[i] - yMin)/yKof))
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((data1.data.h[i] - yMin)/yKof))
           
          ctx.stroke()
          ctx.closePath()
          
          }
          else if(data1.data.o[i] > data1.data.c[i]){    
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.strokeStyle= "red" 
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((data1.data.l[i] - yMin)/yKof))
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((data1.data.c[i] - yMin)/yKof))

          ctx.rect(paddingY + j * widthCandle - padding,  VIEW_HEIGHT - ((data1.data.o[i] - yMin)/yKof), padding * 2, 
          (data1.data.o[i] - data1.data.c[i]) / yKof)
          ctx.fillStyle = 'red'
          ctx.fill()

          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((data1.data.o[i] - yMin)/yKof))
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((data1.data.h[i] - yMin)/yKof))

          ctx.stroke()
          ctx.closePath()
          }
        
        }
      }
}