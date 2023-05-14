/**
 * Receives the day, month, and year as strings and return a date
 * in the format "DD/MM/YY"
 * @author Perfect Nkosi [Github - PNkosi]{@link https://github.com/PNkosi}
 * @param day
 * @param month
 * @param year
 * @returns {String} a date string (DD/MM/YYYY)
 */
export const dateBuilder = (day:string, month:string, year:string): string | undefined => {
    //Check if the date values are integers
    const oneOrTwoDigitRegex = /^(0?[1-9]|[1-9][0-9]?)$/
    const yearRegex = /^\d{4}$/

    /*

     */
    if (!oneOrTwoDigitRegex.test(day) || !oneOrTwoDigitRegex.test(month) ||
        !yearRegex.test(year)) {
        return undefined
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
export const isDateValid = (userDateOfBirth: string | undefined): boolean => {
    if (!userDateOfBirth) return false
    const regex: RegExp = /^\d{2}\/\d{2}\/\d{4}$/
    if (userDateOfBirth.match(regex) === null) return false

    const [ day, month, year ] = userDateOfBirth.split('/')
    const isoFormatted = `${year}-${month}-${day}`
    const date = new Date(isoFormatted)

    const timestamp: number = date.getTime()
    if (Number.isNaN(timestamp)) {
        return false
    }
    return date.toISOString().startsWith(isoFormatted)
}