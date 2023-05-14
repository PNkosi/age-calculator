/**
 * Highlights the label, input and display error message for 2 seconds
 * @param inputGroup - Represents the parent div of the label, input, and error message
 */
export const highlightEmptyField = (inputGroup: HTMLElement) => {
    if (inputGroup instanceof HTMLParagraphElement)
        inputGroup.textContent = 'This field is required'

    if (inputGroup instanceof HTMLInputElement)
        inputGroup.classList.add('error-border')

    inputGroup.classList.add('error')

    setTimeout(() => {
        if (inputGroup instanceof HTMLParagraphElement) inputGroup.textContent = ''
        if (inputGroup instanceof HTMLInputElement) inputGroup.classList.remove('error-border')
        inputGroup.classList.remove('error')
    }, 2000)
}