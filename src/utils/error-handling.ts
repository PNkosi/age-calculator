/**
 * Highlights the label, input and display error message for 2 seconds
 * @param element - Represents the parent div of the label, input, and error message
 */
const highlightEmptyField = (element: HTMLElement) => {
    if (element instanceof HTMLParagraphElement)
        element.textContent = 'This field is required'

    if (element instanceof HTMLInputElement)
        element.classList.add('error-border')

    element.classList.add('error')
}

export const emptyFields = (inputs: NodeListOf<HTMLInputElement>): boolean => {
    let isEmpty: boolean = false
    for (const input of inputs) {
        if (input.value.trim() === "") {
            isEmpty = true
            const parent = input.parentElement as HTMLElement
            parent.classList.add('error')
            const collection = parent.children as HTMLCollection
            const children: HTMLElement[] = Array.from(collection)

            for (const childElement of children) {
                highlightEmptyField(childElement)
            }
        }
    }
    return isEmpty
}

export const invalidInputs = (inputs: NodeListOf<HTMLInputElement>) => {
    let isInvalid: boolean = false

    for (const input of inputs) {
        const parent = input.parentElement as HTMLElement
        const collection = parent.children as HTMLCollection
        const children: HTMLElement[] = Array.from(collection)
        let inputValue = parseInt(input.value)

        // Common style for any invalid input

        if (input.id === 'day' && (inputValue < 1 || inputValue > 31)) {
            isInvalid = true
            parent.classList.add('error')
            for (const childElement of children) {
                if (childElement instanceof HTMLParagraphElement)
                    childElement.textContent = 'Must be a valid day'

                childElement.classList.add('error')
            }
            input.classList.add('error-border')

        }

        if (input.id === 'month' && (inputValue < 0 || inputValue > 12)) {
            isInvalid = true
            parent.classList.add('error')
            for (const childElement of children) {
                if (childElement instanceof HTMLParagraphElement)
                    childElement.textContent = 'Must be a valid month'
                childElement.classList.add('error')
            }
            input.classList.add('error-border')
        }

        const currentYear = new Date().getFullYear()
        if (input.id === 'year' && inputValue > currentYear) {
            isInvalid = true
            parent.classList.add('error')
            for (const childElement of children) {
                if (childElement instanceof HTMLParagraphElement)
                    childElement.textContent = 'Must be in the past'
                childElement.classList.add('error')
            }
            input.classList.add('error-border')
        }
    }
    return isInvalid
}


export const removeHighlight = (element: HTMLElement) => {
    if (element instanceof HTMLParagraphElement) console.log('p tag')
    if (element instanceof HTMLInputElement) console.log('input tag')
    element.classList.remove('error')
}

export const clearErrorWarning = (e: FocusEvent) => {
    const inputId: string = e.target?.id
    const inputOnFocus = document.getElementById(inputId) as HTMLInputElement

    const parent = inputOnFocus.parentElement as HTMLElement
    if (!parent.classList.contains('error')) return // Stop execution if the parent div has no error class
    else parent.classList.remove('error')

    // Resetting the result displays
    document.getElementById('day-result').textContent = '--'
    document.getElementById('month-result').textContent = '--'
    document.getElementById('year-result').textContent = '--'

    // Getting all the sibling (including input) elements of the currently focused input element
    const siblingElements = Array.from(parent.children)

    for (const element of siblingElements) {
        element.classList.remove('error')
        if (element instanceof HTMLParagraphElement)
            element.textContent = ''
        if (element instanceof HTMLLabelElement)
            element.classList.remove('error')
        inputOnFocus.classList.remove('error-border')
    }
}