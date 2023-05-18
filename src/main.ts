import {dateBuilder, getDateResult, isDateValid} from "./utils/dates.ts";
import {invalidInputs, emptyFields, clearErrorWarning} from "./utils/error-handling.ts";

// User Input DOM Elements
const inputs:NodeListOf<HTMLInputElement> = document.querySelectorAll('.input')
const day = document.querySelector('#day') as HTMLInputElement
const month = document.querySelector('#month') as HTMLInputElement
const year = document.querySelector('#year') as HTMLInputElement
const calculateBtn = document.querySelector('#calcBtn') as HTMLButtonElement

// Results DOM Elements
const dayResult = document.getElementById('day-result') as HTMLElement
const monthResult = document.getElementById('month-result') as HTMLElement
const yearResult = document.getElementById('year-result') as HTMLElement

calculateBtn.addEventListener('click', () => {
    const dateOfBirth: string = dateBuilder(day.value, month.value, year.value)
    //Checking there are no empty input fields
    if (emptyFields(inputs)) return
    if(invalidInputs(inputs)) return


    if (!isDateValid(dateOfBirth)) {
        const error = document.getElementById('invalid-date-error') as HTMLParagraphElement
        for (const input of inputs) {
            const parent = input.parentElement as HTMLElement
            parent.classList.add('error')
            input.classList.add('error-border')
            error.textContent = 'Must be a valid date'
        }
        return
    }

    const {days, months, years} = getDateResult(dateOfBirth)
    dayResult.textContent = days.toString()
    monthResult.textContent = months.toString()
    yearResult.textContent = years.toString()
})

inputs.forEach(input => {
    input.addEventListener('focus', (e) => clearErrorWarning(e))
})


