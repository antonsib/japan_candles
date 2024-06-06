export function findMinMax(data){
   let min = 1000000
   let max = -1

   for(let i = 0 ; i< data.data.h.length; i++) {
    if(data.data.l[i]!== 0){
      if (max < data.data.h[i]) max = data.data.h[i] 
      if (min > data.data.l[i]) min = data.data.l[i]
    }
  }
    
  return [ min , max]
}

export function toDate(timestamp) {
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

export function deleteLast(datad) {
  datad.data.o.pop()
  datad.data.h.pop()
  datad.data.l.pop()
  datad.data.c.pop()
  datad.data.t.pop()
}

export function deleteFirst(datad) {
  datad.data.o.shift()
  datad.data.h.shift()
  datad.data.l.shift()
  datad.data.c.shift()
  datad.data.t.shift()
}

export  function addLast(data1, datad, index, isNum) {
  if(isNum === true) {
    datad.data.o.push(data1.data.o[index])
    datad.data.h.push(data1.data.h[index])
    datad.data.l.push(data1.data.l[index])
    datad.data.c.push(data1.data.c[index])
    datad.data.t.push(data1.data.t[index])
  } else if (isNum === false) {
    datad.data.o.push(0)
    datad.data.h.push(0)
    datad.data.l.push(0)
    datad.data.c.push(0)
    datad.data.t.push(0)
  }
}

export function addFirst(data1,datad, index, isNum) {
  if(isNum === true) {
    datad.data.o.unshift(data1.data.o[index])
    datad.data.h.unshift(data1.data.h[index])
    datad.data.l.unshift(data1.data.l[index])
    datad.data.c.unshift(data1.data.c[index])
    datad.data.t.unshift(data1.data.t[index])
  } else if (isNum === false) {
    datad.data.o.unshift(0)
    datad.data.h.unshift(0)
    datad.data.l.unshift(0)
    datad.data.c.unshift(0)
    datad.data.t.unshift(0)
  } 
}

export function css(el, styles = {}){
  Object.assign(el.style, styles)
}