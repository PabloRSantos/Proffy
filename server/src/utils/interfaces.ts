

export interface reqBodyUpdateInfos {
    user: IUsers
    classes: IClasses
    scheduleItems: [IScheduleItems]
}

export interface IScheduleItems {
    week_day: number;
    from: string;
    to: string;
    class_id?: number;
    id?: number;
}

export interface IClasses {
    subject: string,
    cost: string,
    id: number,
    user_id: number,
    schedule?: [IScheduleWeekDays]
}

export interface IScheduleWeekDays {
    hour: string,
    day: number,
}


export interface IUsers {
    id: number,
    name: string,
    sobrenome: string,
    password: string,
    email: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    resetPassword: string,
    resetPasswordTime: Date
}

