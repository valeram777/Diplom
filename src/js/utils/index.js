import { months, daysOfWeek } from '../constants'

export const formatJSDate = (jsDate, withSeconds) =>
  !withSeconds
    ? jsDate.toISOString().slice(0, 10)
    : jsDate.toISOString().slice(0, -5).replace('T', ' ')

export const getDate = (jsDate, daysAgo = 0) =>
  new Date(jsDate.getTime() - 1000 * 60 * 60 * 24 * daysAgo)

export const formatText = (text) => text && text.slice(0, text.lastIndexOf('['))

export const getMonth = (number) => months[number]

export const formatDateToDiagram = (date) => {
  const jsDate = new Date(date)

  return `${jsDate.getDate()}, ${daysOfWeek[jsDate.getDay()]}`
}

export const htmlEncode = (string) => {
  var element = document.createElement("div")
  element.innerText = element.textContent = string
  return element.innerHTML
}