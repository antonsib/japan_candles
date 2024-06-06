import { findMinMax, toDate, deleteFirst, deleteLast, addFirst, addLast, css } from "./utils"
import { tooltip } from './tooltip'
//import data1 from "../data/fl-data-test3.json" //1 свечa
//import data1 from "../data/fl-data-test2.json" //2 свечи
//import data1 from "../data/fl-data-test.json" // 10 свечей
import data1 from "../data/fl-data-test1.json" //30 свечей
//import data1 from "../data/fl-data-test4.json" //50 свечей
//import data1 from "../data/fl-data-test5.json" //2 свечи и одна пустая
//import data1 from "../data/fl-data-test6.json" //3
//import data1 from "../data/fl-data.json"  // 1001 свеча0

const WIDTH = 1300 
const HEIGHT = 450
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const PADDING = 40
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const ROWS_COUNT = 10


export function graphing (canvas) {
   const tip = tooltip( document.getElementById('tg-chart-tooltip'))
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
  const copiedData = structuredClone(data1)
  let raf
  let action 
  let xPrev, xPos
   
  const proxy = new Proxy({}, {
    set(...arg) {
      const result= Reflect.set(...arg)
      raf = requestAnimationFrame(paint)
      return result
    },
  })
  
  proxy.scroll = 0
   
  document.addEventListener("wheel", function(e) {
    e.preventDefault()
    if(e.deltaY < 0) {
      proxy.scroll = 10
      action = "scroll"
    } else {
      proxy.scroll = -10
      action = "scroll"
    } 
  },{passive: false})
   
  document.getElementById("canvas").addEventListener("mousemove", function (event) {
    curPos = event.clientX
    tip.hide()
  })

 document.getElementById("canvas").addEventListener("click", function (event) {
  const {left , top } = canvas.getBoundingClientRect() // текущие координаты
  let toolLeft = event.clientX - left
  let toolTop = event.clientY - top
  const pos = Math.trunc(((curPos * 2 - paddingY)/step))
  const preTime = new Date(copiedData.data.t[pos] * 1000)
  const time = toDate(preTime) 
  let params = []

  params.push(copiedData.data.h[pos])
  params.push(copiedData.data.l[pos])
  params.push(copiedData.data.o[pos])
  params.push(copiedData.data.c[pos])
  params.push(time)
  tip.show(toolLeft, toolTop, params)
  })

  document.getElementById("canvas").addEventListener("mousedown", function (event) {
    xPrev = event.clientX; 
  })

  document.getElementById("canvas").addEventListener("mouseup", function (event) {
    xPos = event.clientX; 
    if(xPos - xPrev >= 0){ 
      action = "mouseLeft"
      proxy.action = "mouseLeft"
    } else{
      action = "mouseRight"
      proxy.action = "mouseRight"
    }
  })

  document.getElementById("zoomUp").addEventListener("click", function (e) {
    curPos = DPI_HEIGHT / 2 
    proxy.scroll = 10
    action = "scroll"
  })
    
  document.getElementById("zoomDown").addEventListener("click", function (e) {
    curPos = DPI_HEIGHT / 2 
    action = "scroll"
    proxy.scroll = -10
  })

  document.getElementById("buttonRight").addEventListener("click", function (e) {
    curPos = DPI_HEIGHT / 2 
    action = "right"
    proxy.action = "right"
  })

  document.getElementById("buttonLeft").addEventListener("click", function (e) {
    curPos = DPI_HEIGHT / 2 
    action = "left"
    proxy.action = "left"
  })
       
  function clear() {
    ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT)
  }
  
  function moveToLeft(datad) {
  let indexd2 = data1.data.o.indexOf(datad.data.o[0])

  if(data1.data.o.indexOf(datad.data.o[datad.data.o.length -1 ])  === 0) return
    deleteLast(datad)
    if (indexd2 !== -1) {
      if (data1.data.o[indexd2 - 1 ] !== undefined) {
        addFirst(data1, datad, indexd2 -1, true )
      } else if (data1.data.o[indexd2 - 1 ] === undefined) {
        addFirst(data1, datad, indexd2 -1, false )
      }
    } else if (indexd2 === -1 ) addFirst(data1, datad, indexd2 - 1, false )
  }

  function moveToRight(datad) {
  let indexd1 = data1.data.o.indexOf(datad.data.o[datad.data.o.length - 1])

  if(data1.data.o.indexOf(datad.data.o[0])  === data1.data.o.length -1) return
    deleteFirst(datad)
    if (indexd1 !== -1) {
      if (data1.data.o[indexd1 +1 ] !== undefined) {
        addLast(data1, datad, indexd1 +1, true )
      } else if (data1.data.o[indexd1 +1 ] === undefined) {
        addLast(data1, datad, indexd1 +1, false )
      }
    } else if (indexd1 === -1 ) addLast(data1, datad, indexd1 +1, false )
  }

  function getNewDate(datad, scroll, index) {
  let indexd1 = data1.data.o.indexOf(datad.data.o[datad.data.o.length - 1]) 
  let indexd2 = data1.data.o.indexOf(datad.data.o[0])

  if(action === "scroll" ) {
    if (scroll === 10 ) {
      if (datad.data.o[index +1] !== undefined) {
        deleteLast(datad)
      }
      if (datad.data.o[index -1 ]!== undefined) {
        deleteFirst(datad)
      }
    }
    else if (scroll === -10 ) {
      if ( data1.data.o[indexd1+1]  !== undefined && indexd1!== -1) {
        addLast(data1, datad, indexd1+1 , true )
      }
      if ( data1.data.o[indexd2-1] !== undefined && indexd2!== -1) {
        addFirst(data1, datad, indexd2-1, true )
      }
    }
  } else if(action === "right") {
    moveToRight(datad)
  } else if (action === "left") {
    moveToLeft(datad)
  } else if (action === "mouseRight") {
    const pos1 = Math.trunc(((xPrev * 2 - paddingY)/step))
    const pos2 = Math.trunc(((xPos * 2 - paddingY)/step))

    for(let i =0 ; i< pos1-pos2;i++) moveToRight(datad)
  } else if (action === "mouseLeft") {
    const pos1 = Math.trunc(((xPrev * 2 - paddingY)/step))
    const pos2 = Math.trunc(((xPos * 2 - paddingY)/step))

    for(let i =0 ; i< pos2-pos1;i++) moveToLeft(datad)
  }
  }

  function paint(){
    clear()    
    const pos = Math.trunc(((curPos * 2 - paddingY)/step))
    getNewDate(copiedData, proxy.scroll, pos)
    const newLength = copiedData.data.o.length
    step = Math.round((xWidth/newLength))
    padding = Math.round((step / 4))
    widthCandle = 2 * padding
    const [yMin, yMax] =  findMinMax(copiedData)
    const yKof = ((yMax - yMin) / VIEW_HEIGHT)
    const yStep = Math.round(((yMax - yMin) / ROWS_COUNT))
    

    drawX(copiedData, newLength)
    drawY(yMin, yStep)
    draw(copiedData, newLength, yKof, yMin)
  }
   
  function drawY(yMin, yStep){
  const step = VIEW_HEIGHT / ROWS_COUNT

  ctx.beginPath()
  ctx.lineWidth = 2
  for (let i = 0 ; i < ROWS_COUNT; i++) {
    ctx.strokeStyle = '#bbb'              
    ctx.font = 'normal 20px Helvetica, sans-serif'
    ctx.fillStyle = '#96a2aa'
    ctx.moveTo(0, VIEW_HEIGHT - step * i)
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
  for (let i = 0, j = 1; i < newLength; i++, j += 2) {
    if((i-1) % stepValue === 0 && copiedData.data.t[i] !== 0 ) {
      ctx.moveTo( paddingY +  widthCandle * j  - padding, DPI_HEIGHT - PADDING)
      const time = new Date(copiedData.data.t[i] * 1000)
      ctx.fillText( toDate(time), paddingY + j * widthCandle , DPI_HEIGHT - PADDING)
    }
  }
  ctx.stroke()
  ctx.closePath()
  }

  function draw(copiedData,newLength,yKof, yMin){
    for (let i = 0, j=1 ; i < newLength; i++ , j+=2) {
      if(copiedData.data.o[i] !== 0) {
        if(copiedData.data.o[i] <= copiedData.data.c[i]) {
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.strokeStyle= "green"
          ctx.moveTo( paddingY + j * widthCandle , VIEW_HEIGHT - ((copiedData.data.l[i] - yMin) / yKof))
          ctx.lineTo( paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.o[i] - yMin) / yKof))
          ctx.rect(paddingY + j * widthCandle - padding, VIEW_HEIGHT - ((copiedData.data.c[i] - yMin) / yKof), padding * 2, 
          (copiedData.data.c[i] - copiedData.data.o[i]) / yKof)
          ctx.fillStyle = 'green'
          ctx.fill()
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.c[i] - yMin) / yKof))
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.h[i] - yMin) / yKof))
          ctx.stroke()
          ctx.closePath()
        } else if(copiedData.data.o[i] > copiedData.data.c[i]) {    
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.strokeStyle= "red" 
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.l[i] - yMin) / yKof))
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.c[i] - yMin) / yKof))
          ctx.rect(paddingY + j * widthCandle - padding,  VIEW_HEIGHT - ((copiedData.data.o[i] - yMin) / yKof), padding * 2, 
          (copiedData.data.o[i] - copiedData.data.c[i]) / yKof)
          ctx.fillStyle = 'red'
          ctx.fill()
          ctx.moveTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.o[i] - yMin) / yKof))
          ctx.lineTo(paddingY + j * widthCandle, VIEW_HEIGHT - ((copiedData.data.h[i] - yMin) / yKof))
          ctx.stroke()
          ctx.closePath()
        }
      }
    }
  }

}