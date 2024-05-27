import data from "./data.json"

const WIDTH = 1400 
const HEIGHT = 450
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const PADDING = 40
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const ROWS_COUNT = 5

export function graphing (canvas){
    const ctx = canvas.getContext('2d')
    canvas.style.width = WIDTH + 'px'
    canvas.style.height = HEIGHT + 'px'
     canvas.width = DPI_WIDTH
     canvas.height = DPI_HEIGHT
      
   const [yMin, yMax] =  findMinMax(data)
   const yKof = VIEW_HEIGHT / (yMax - yMin)

   const xStep = DPI_WIDTH / data.length 
   const paddingCandle = DPI_WIDTH / data.length / 4 

   const yStep = VIEW_HEIGHT / ROWS_COUNT
   const yStepValue = (yMax - yMin) / (ROWS_COUNT)

   
   draw(data)
   drawX()
   drawY()

   function drawY(){
    for (let i = 1 ; i < data.length; i++){
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = '#bbb'
        ctx.font = 'normal 20px Helvetica, sans-serif'
        ctx.fillStyle = '#96a2aa'
        ctx.moveTo(0, DPI_HEIGHT - yStep * i )
        ctx.fillText( yStepValue * i , 0, DPI_HEIGHT - yStep*i )
        ctx.stroke()
        ctx.closePath()
    }
   }
   
   function drawX(){
    for (let i = 0 ; i < data.length; i++){
        ctx.beginPath()
        ctx.font = 'normal 20px Helvetica, sans-serif'
        ctx.fillStyle = '#96a2aa'
        ctx.moveTo(xStep * i + paddingCandle/2, DPI_HEIGHT - PADDING)
        ctx.fillText(data[i].time, xStep * i + paddingCandle/2, DPI_HEIGHT - PADDING)
        ctx.stroke()
        ctx.closePath()
    }
   }

   function draw(data){
    for (let i = 0 ; i < data.length; i++){
        if(data[i].start <= data[i].end) {
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.strokeStyle= "green"
        ctx.moveTo(xStep * i + paddingCandle + paddingCandle/2, DPI_HEIGHT - (yKof * data[i].min))
        ctx.lineTo(xStep * i + paddingCandle + paddingCandle/2, DPI_HEIGHT - (yKof * data[i].start))
          
        ctx.rect(xStep*(i) + paddingCandle/2, DPI_HEIGHT - (yKof * data[i].end), paddingCandle * 2, 
        (data[i].end - data[i].start) * yKof)
        ctx.fillStyle = 'green';
        ctx.fill()

        ctx.moveTo(xStep * i + paddingCandle + paddingCandle/2, DPI_HEIGHT - (yKof * data[i].end))
        ctx.lineTo(xStep * i + paddingCandle + paddingCandle/2, DPI_HEIGHT - (yKof * data[i].max))
        ctx.stroke()
        ctx.closePath()
        }
        else if(data[i].start > data[i].end){
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.strokeStyle= "red" 
          ctx.moveTo(xStep * i + paddingCandle + paddingCandle/2, DPI_HEIGHT - (yKof * data[i].min))
          ctx.lineTo(xStep * i + paddingCandle + paddingCandle/2, DPI_HEIGHT - (yKof * data[i].end))

          ctx.rect(xStep*(i)+ paddingCandle/2,  DPI_HEIGHT - (yKof * data[i].start), paddingCandle * 2, 
        (data[i].start - data[i].end) * yKof)
          ctx.fillStyle = 'red';
          ctx.fill()

          ctx.moveTo(xStep * i + paddingCandle + paddingCandle/2, DPI_HEIGHT - (yKof * data[i].start))
          ctx.lineTo(xStep * i + paddingCandle  + paddingCandle/2, DPI_HEIGHT - (yKof * data[i].max))

          ctx.stroke()
          ctx.closePath()
        }
   }
   }

    function findMinMax(data){
        let min = data[0].min 
        let max = data[0].max

        for (let i = 1; i < data.length; i++){
            if (data[i].min < min) min = data[i].min
            if (data[i].max > max) max = data[i].max
        }
        
        return [ min , max]
    }

}