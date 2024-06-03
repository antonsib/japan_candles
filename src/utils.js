export function findMinMax(data){
       
    //let min = Math.min(...data.data.l)
   // let max = Math.max(...data.data.h)
   
   let min = 1000000
   let max = -1
   for(let i = 0 ; i< data.data.h.length; i++){
    if(data.data.l[i]!== 0){
      if (max < data.data.h[i]) max = data.data.h[i] 
      if (min > data.data.l[i]) min = data.data.l[i]
    }
   }
    
    return [ min , max]
}

export function toDate(timestamp){
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