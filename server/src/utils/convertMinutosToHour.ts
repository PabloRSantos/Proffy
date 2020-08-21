 export default function convertMinutesToHour(time: number){

     const minute = time % 60
     const hours = Math.trunc(time / 60);

     if(minute == 0){
         return `${hours}h`
     }

     if(minute < 10) {
        const timeInHours = `${hours}h${minute}`

        return timeInHours
     }

     const timeInHours = `${hours}h${minute}`

     return timeInHours
 }