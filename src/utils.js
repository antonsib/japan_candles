export function findMinMax(data){
       
    let min = Math.min(...data.data.l)
    let max = Math.max(...data.data.h)
    
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