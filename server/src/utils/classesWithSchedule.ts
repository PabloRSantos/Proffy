import { IClasses, IScheduleItems, IScheduleWeekDays } from "./interfaces"
import convertMinutesToHour from "./convertMinutosToHour"

export default function classesWithSchedule(classes: IClasses[], schedule: IScheduleItems[]){
    const classesWithSchedule = classes.map((classItem) => {

        const filteredSchedule = schedule.filter(scheduleItem => scheduleItem.class_id === classItem.id)
        let cont = 0

        while(cont < 5){
                const filteredScheduleInWhile = filteredSchedule
                    .filter(scheduleItem => scheduleItem.week_day === cont)

                if(filteredScheduleInWhile.length === 0){
                   filteredSchedule.push({
                        from: `-`, to: '-', week_day: cont
                    })
                }

                cont++
        }

        filteredSchedule.sort((a, b) => {
            return a.week_day < b.week_day ? -1 : a.week_day > b.week_day ? 1 : 0;
        })

            let calendar: Array<IScheduleWeekDays> = []

            calendar = filteredSchedule.map(scheduleItem => {
                
                if(scheduleItem.from === '-'){
                   return {
                       day: scheduleItem.week_day,
                       hour: '-'
                   }
                }

                const to = convertMinutesToHour(Number(scheduleItem.to))
                const from = convertMinutesToHour(Number(scheduleItem.from))

                return {
                    day: scheduleItem.week_day,
                    hour: `${from} - ${to}`
                }
             })

                 return {
                    classItem,
                    scheduleItem: calendar
                 }
        })

        return classesWithSchedule
        }