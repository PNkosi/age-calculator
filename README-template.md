# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted


- Solution URL: [Add solution URL here](https://github.com/PNkosi/age-calculator)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Typescript](https://www.typescriptlang.org/)

### What I learned
- Types in Typescript
- Creating a Vanilla TS project with Vite
- Modularising code

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```ts
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
```

### Continued development
- Dive deeper into typescript as it makes catching error easy while in development

## Author
- Github - [Perfect Nkosi](https://github.com/PNkosi/)
