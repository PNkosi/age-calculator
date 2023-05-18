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

export const getDateResult = (userDateOfBirth: string) => {
    const { date } = ISOFormat(userDateOfBirth)
    const today = new Date()

    // Calculate years
    let years: number
    if (today.getMonth() > date.getMonth() ||
        (today.getMonth() == date.getMonth() && today.getDate() >= date.getDate())) {
        years = today.getFullYear() - date.getFullYear()
    }
    else years = today.getFullYear() - date.getFullYear() - 1

    // Calculate months
    let months: number|undefined
    if (today.getDate() >= date.getDate())
        months = today.getMonth()
    else if (today.getDate() < date.getDate())
        months = today.getMonth() - date.getMonth() - 1
    // Make months positive
    if (months) {
        months = months < 0 ? months + 12 : months
    }

    // Calculate days
    let days: number
    const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (today.getDate() >= date.getDate())
        days = today.getDate() - date.getDate()
    else days = today.getDate() - date.getDate() + monthDays[date.getMonth()]

    return { days, months, years}
}