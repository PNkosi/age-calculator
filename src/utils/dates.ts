import * as moment from "moment/moment";
/**
 * Receives the day, month, and year as strings and return a date
 * in the format "DD/MM/YY"
 * @author Perfect Nkosi [Github - PNkosi]{@link https://github.com/PNkosi}
 * @param day
 * @param month
 * @param year
 * @returns {String} a date string (DD/MM/YYYY)
 */
export const dateBuilder = (day:string, month:string, year:string): string => {
    const oneOrTwoDigitRegex = /^(0?[1-9]|[1-9][0-9]?)$/
    const yearRegex = /^\d{4}$/

    if (!oneOrTwoDigitRegex.test(day) || !oneOrTwoDigitRegex.test(month) ||
        !yearRegex.test(year)) {
        return ''
    }
    if (day.length === 1) day = `0${day}`
    if (month.length === 1) month = `0${month}`

    return `${day}/${month}/${year}`
}

/**
 * @param userDateOfBirth - Date received from the user in the
 * format "DD/MM/YYYY"
 * @returns {boolean} - True if the date is valid, otherwise returns
 * false
 */
export const isDateValid = (userDateOfBirth: string): boolean => {
    if (!userDateOfBirth) return false
    const regex: RegExp = /^\d{2}\/\d{2}\/\d{4}$/
    if (userDateOfBirth.match(regex) === null) return false

    const { date, timestamp, isoFormatted } = ISOFormat(userDateOfBirth)
    if (Number.isNaN(timestamp)) {
        return false
    }
    return date.toISOString().startsWith(isoFormatted)
}

const ISOFormat = (userDateOfBirth: string) => {
    const [ day, month, year ] = userDateOfBirth.split('/')
    const isoFormatted = `${year}-${month}-${day}`
    const date = new Date(isoFormatted)
    const timestamp: number = date.getTime()
    return {
        timestamp,
        date,
        isoFormatted
    }
}

type result = {
    days: string,
    months: string,
    years: string
}
export const getDateResult = (userDateOfBirth: string): result => {
    const { isoFormatted} = ISOFormat(userDateOfBirth)
    const userDOB = moment(isoFormatted, 'YYYY-MM-DD')

    const todayDate = moment()
    let months = todayDate.diff(userDOB, 'months')
    let years = Math.floor(months / 12)
    let balanceMonths = months % 12
    let days: number
    if (!balanceMonths) {
        months = 0
        const dob_date = userDOB.date()
        const todayMonth = userDOB.month()
        const constructDate = moment().month(todayMonth).date(dob_date)
        days = todayDate.diff(constructDate, 'days')
    }
    else {
        months = balanceMonths;
        const dob_date = userDOB.date();
        const todayMonth = todayDate.month();
        const construct_date = moment().month(todayMonth).date(dob_date);
        days = todayDate.diff(construct_date, 'days');
        if(days < 0){
            days = 30 + days;
        }
    }

    return {
        days: days.toString(),
        months: months.toString(),
        years: years.toString()
    }
}