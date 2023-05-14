import { dateBuilder, isDateValid } from "./utils/dates.ts";
import { highlightEmptyField } from "./utils/error-handling.ts";

const inputs:NodeListOf<HTMLInputElement> = document.querySelectorAll('.input')
const day = document.querySelector('#day') as HTMLInputElement
const month = document.querySelector('#month') as HTMLInputElement
const year = document.querySelector('#year') as HTMLInputElement
const calculateBtn = document.querySelector('#calcBtn') as HTMLButtonElement

calculateBtn.addEventListener('click', () => {
    const dateOfBirth = dateBuilder(day.value, month.value, year.value)
    const dateInputsValid: boolean = isDateValid(dateOfBirth)

    //Checking there are no empty input fields
    for (const input of inputs) {
        if (input.value.trim() === "") {
            const collection = input?.parentElement?.children as HTMLCollection
            const children: HTMLElement[] = Array.from(collection)

            // children.forEach(child => {
            //     highlightEmptyField(child)
            // })

            for (let i = 0; i < children.length; i++) {
                highlightEmptyField(children[i])
            }
            return
        }
    }

    if (dateInputsValid) {
        console.log(`${dateOfBirth} is valid`)
    } else {
        console.log('Date is not valid')
    }
})


