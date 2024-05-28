import data1 from "./fl-data-test.json"

const WIDTH = 1400 
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
      
   const [yMin, yMax] =  findMinMax(data1)
   const yKof = ((yMax - yMin) / VIEW_HEIGHT).toFixed(2)

   const xStep = DPI_WIDTH / data1.data.o.length 
   const paddingCandle = DPI_WIDTH / data1.data.o.length / 4 

   const yStep = ((yMax - yMin) / ROWS_COUNT).toFixed()

   draw(data1)
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
    for (let i = 0 ; i < data1.data.t.length; i++){
        ctx.beginPath()
        ctx.font = 'normal 20px Helvetica, sans-serif'
        ctx.fillStyle = '#96a2aa'
        ctx.moveTo(xStep * i + paddingCandle, DPI_HEIGHT - PADDING)
        const time = new Date(data1.data.t[i] * 1000)
        ctx.fillText( toDate(time), xStep * i + paddingCandle, DPI_HEIGHT - PADDING)
        ctx.stroke()
        ctx.closePath()
    }
   }

   function draw(data1){
    for (let i = 0 ; i < data1.data.o.length; i++){
        if(data1.data.o[i] <= data1.data.c[i]) {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle= "green"
        ctx.moveTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - ((data1.data.l[i] - yMin)/yKof))
        ctx.lineTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - ((data1.data.o[i] - yMin)/yKof))
        
        
        ctx.rect(xStep*(i) + paddingCandle, VIEW_HEIGHT - ((data1.data.c[i] - yMin)/yKof), paddingCandle * 2, 
        (data1.data.c[i] - data1.data.o[i]) / yKof)
        ctx.fillStyle = 'green'
        ctx.fill()
        
        
        ctx.moveTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - ((data1.data.c[i] - yMin)/yKof))
        ctx.lineTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - ((data1.data.h[i] - yMin)/yKof))
         
        ctx.stroke()
        ctx.closePath()
        
        }
        else if(data1.data.o[i] > data1.data.c[i]){
            
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.strokeStyle= "red" 
          ctx.moveTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - ((data1.data.l[i] - yMin)/yKof))
          ctx.lineTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - ((data1.data.c[i] - yMin)/yKof))

          ctx.rect(xStep*(i)+ paddingCandle,  VIEW_HEIGHT - ((data1.data.o[i] - yMin)/yKof), paddingCandle * 2, 
          (data1.data.o[i] - data1.data.c[i]) / yKof)
          ctx.fillStyle = 'red'
          ctx.fill()

          ctx.moveTo(xStep * i + paddingCandle * 2, VIEW_HEIGHT - ((data1.data.o[i] - yMin)/yKof))
          ctx.lineTo(xStep * i + paddingCandle  * 2, VIEW_HEIGHT - ((data1.data.h[i] - yMin)/yKof))

          ctx.stroke()
          ctx.closePath()
          
        }
   }
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
}