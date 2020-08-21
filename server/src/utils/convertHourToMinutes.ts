export default function convertHourToMinutes(time:string){

   const [hour, minutes] = time.split("h").map(Number) // transforma um array de numero

    const timeInMinute = (hour * 60) + minutes

    return timeInMinute
}